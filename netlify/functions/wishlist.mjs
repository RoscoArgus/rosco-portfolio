import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
const json = (statusCode, body, extraHeaders = {}) => ({ statusCode, headers: { ...headers, ...extraHeaders }, body: JSON.stringify(body) });
const hashPin = (pin, salt = randomBytes(16).toString('hex')) => `${salt}:${scryptSync(pin, salt, 64).toString('hex')}`;
const verifyPin = (pin, stored) => {
  const [salt, expected] = String(stored).split(':');
  if (!salt || !expected) return false;
  const received = scryptSync(pin, salt, 64);
  const expectedBuffer = Buffer.from(expected, 'hex');
  return received.length === expectedBuffer.length && timingSafeEqual(received, expectedBuffer);
};
const hashSession = (token) => scryptSync(token, process.env.SESSION_PEPPER ?? 'wishlist-session', 64).toString('hex');
const cookieValue = (event, name) => event.headers?.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);

const config = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !process.env.WISHLIST_PIN) throw new Error('Wishlist server configuration is incomplete.');
  return { url: url.replace(/\/$/, ''), key };
};

const request = async (path, options = {}) => {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(options.headers ?? {}) },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase ${response.status}: ${detail.slice(0, 500)}`);
  }
  if (response.status === 204) return null;
  const responseText = await response.text();
  return responseText.trim() ? JSON.parse(responseText) : null;
};

const ownerPinValid = (event) => {
  const expected = Buffer.from(process.env.WISHLIST_PIN ?? '');
  const received = Buffer.from(event.headers?.['x-owner-pin'] ?? '');
  return expected.length > 0 && expected.length === received.length && timingSafeEqual(expected, received);
};

const profileFromSession = async (event) => {
  const token = cookieValue(event, 'wishlist_session');
  if (!token) return null;
  const profiles = await request(`wishlist_sessions?session_hash=eq.${hashSession(token)}&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&select=profile_id`);
  if (!profiles[0]) return null;
  const profile = await request(`wishlist_profiles?id=eq.${encodeURIComponent(profiles[0].profile_id)}&select=id,name`);
  return profile[0] ?? null;
};

const sessionCookie = (token) => `wishlist_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
const ownerSessionCookie = (token) => `wishlist_owner_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
const validOwnerSession = async (event) => {
  const token = cookieValue(event, 'wishlist_owner_session');
  if (!token) return false;
  const sessions = await request(`wishlist_owner_sessions?session_hash=eq.${hashSession(token)}&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&select=id`);
  return Boolean(sessions[0]);
};

export const handler = async (event) => {
  try {
    if (event.httpMethod === 'GET') {
      const items = await request('wishlist_items?select=*&is_visible=eq.true&order=sort_order.asc,created_at.asc');
      const profile = await profileFromSession(event);
      const interests = profile
        ? await request('wishlist_interests?select=id,item_id,profile_id,created_at&order=created_at.asc')
        : [];
      const profiles = await request('wishlist_profiles?select=id,name');
      return json(200, {
        items: items.map((item) => ({
          ...item,
          interests: interests.filter((interest) => interest.item_id === item.id).map((interest) => ({
            id: interest.id, profile_id: interest.profile_id, name: profiles.find((profile) => profile.id === interest.profile_id)?.name ?? 'Unknown',
            created_at: interest.created_at,
          })),
        })),
        profile,
        ownerAuthenticated: await validOwnerSession(event),
      });
    }

    const body = JSON.parse(event.body ?? '{}');
    if (body.action === 'owner-login') {
      if (!ownerPinValid(event)) return json(401, { error: 'Owner PIN is incorrect.' });
      const token = randomBytes(32).toString('hex');
      await request('wishlist_owner_sessions', { method: 'POST', body: JSON.stringify({ session_hash: hashSession(token) }) });
      return json(200, { ownerAuthenticated: true }, { 'Set-Cookie': ownerSessionCookie(token) });
    }
    if (body.action === 'profile-create' || body.action === 'profile-login') {
      const name = String(body.name ?? '').trim();
      const pin = String(body.pin ?? '');
      if (!/^[\p{L}\p{N} _.-]{2,100}$/u.test(name) || pin.length < 4 || pin.length > 128) {
        return json(400, { error: 'Use a name with 2-100 characters and a PIN with 4-128 characters.' });
      }
      const existing = await request(`wishlist_profiles?name=eq.${encodeURIComponent(name)}&select=id,name,pin_hash`);
      if (body.action === 'profile-create') {
        if (existing[0]) return json(409, { error: 'That profile name is already in use.' });
        const profile = (await request('wishlist_profiles', {
          method: 'POST', headers: { Prefer: 'return=representation' },
          body: JSON.stringify({ name, pin_hash: hashPin(pin) }),
        }))[0];
        const token = randomBytes(32).toString('hex');
        await request('wishlist_sessions', { method: 'POST', body: JSON.stringify({ profile_id: profile.id, session_hash: hashSession(token) }) });
        return json(201, { profile: { id: profile.id, name: profile.name } }, { 'Set-Cookie': sessionCookie(token) });
      }
      if (!existing[0] || !verifyPin(pin, existing[0].pin_hash)) return json(401, { error: 'Profile name or PIN is incorrect.' });
      const token = randomBytes(32).toString('hex');
      await request('wishlist_sessions', { method: 'POST', body: JSON.stringify({ profile_id: existing[0].id, session_hash: hashSession(token) }) });
      return json(200, { profile: { id: existing[0].id, name: existing[0].name } }, { 'Set-Cookie': sessionCookie(token) });
    }

    if (body.action === 'logout') {
      const token = cookieValue(event, 'wishlist_session');
      if (token) await request(`wishlist_sessions?session_hash=eq.${hashSession(token)}`, { method: 'DELETE' });
      return json(200, { ok: true }, { 'Set-Cookie': 'wishlist_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0' });
    }

    if (body.action === 'interest' || body.action === 'cancel-interest') {
      const profile = await profileFromSession(event);
      if (!profile) return json(401, { error: 'Sign in with your wishlist profile first.' });
      if (body.action === 'interest') {
        const result = await request('rpc/claim_wishlist_interest', {
          method: 'POST',
          body: JSON.stringify({ p_item_id: body.itemId, p_profile_id: profile.id }),
        });
        return json(201, { interest: result });
      }
      await request(`wishlist_interests?profile_id=eq.${encodeURIComponent(profile.id)}&item_id=eq.${encodeURIComponent(body.itemId)}`, { method: 'DELETE' });
      return json(200, { ok: true });
    }

    if (!(await validOwnerSession(event))) return json(401, { error: 'Owner session expired. Enter the PIN again.' });
    if (body.action === 'create') {
      if (!String(body.title ?? '').trim() || !['explicit', 'broad'].includes(body.type)) {
        return json(400, { error: 'A title and valid present type are required.' });
      }
      await request('wishlist_items', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({
        title: body.title, description: body.description || null, type: body.type, link: body.link || null,
        image_url: body.image_url || null, price: body.price || null,
      }) });
    } else if (body.action === 'update') {
      await request(`wishlist_items?id=eq.${encodeURIComponent(body.id)}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({
        title: body.title, description: body.description || null, type: body.type, link: body.link || null,
        image_url: body.image_url || null, price: body.price || null,
      }) });
    } else if (body.action === 'delete') {
      await request(`wishlist_items?id=eq.${encodeURIComponent(body.id)}`, { method: 'DELETE' });
    } else {
      return json(400, { error: 'Unknown wishlist action.' });
    }
    return json(200, { ok: true });
  } catch (error) {
    console.error('Wishlist function error:', error);
    return json(500, { error: error instanceof Error ? error.message : 'Wishlist request failed.' });
  }
};
