import { Fragment, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useModal } from '../../context/ModalContext';
import './Wishlist.css';

type ItemType = 'explicit' | 'broad';

interface WishlistInterest {
  id: string;
  profile_id: string;
  name: string;
  created_at: string;
}

interface WishlistItem {
  id: string;
  title: string;
  description: string | null;
  type: ItemType;
  link: string | null;
  image_url: string | null;
  price: string | null;
  sort_order: number;
  interests: WishlistInterest[];
}

interface ItemDraft {
  title: string;
  description: string;
  type: ItemType;
  link: string;
  image_url: string;
  price: string;
}

interface Profile {
  id: string;
  name: string;
}

const emptyDraft: ItemDraft = { title: '', description: '', type: 'explicit', link: '', image_url: '', price: '' };
const formatPrice = (price: string) => {
  if (!price.trim()) return '';
  const numericPrice = Number(price.replace(/[^\d.]/g, ''));
  return Number.isFinite(numericPrice) ? numericPrice.toFixed(2) : '';
};
const sortItemsByType = (items: WishlistItem[]) =>
  [...items].sort((first, second) => {
    if (first.type !== second.type) return Number(first.type === 'broad') - Number(second.type === 'broad');
    return Number(second.interests.length > 0) - Number(first.interests.length > 0);
  });

const api = async <T,>(options: RequestInit = {}): Promise<T> => {
  const response = await fetch('/.netlify/functions/wishlist', options);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    const responseText = (await response.text()).trim();
    const isVitePage = responseText.includes('/@react-refresh') || responseText.includes('<!doctype html>');
    throw new Error(
      isVitePage
        ? 'Wishlist API is unavailable in plain Vite. Run `npm run dev:netlify` for local API access.'
        : response.status === 404
          ? 'Wishlist service is unavailable. Deploy the Netlify Functions before using this page.'
          : `Wishlist service returned an invalid response (${response.status}).${responseText ? ` ${responseText.slice(0, 180)}` : ''}`
    );
  }
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(body.error ?? 'Wishlist request failed.');
  return body;
};

interface OwnerEditorProps {
  items: WishlistItem[];
  ownerAuthenticated: boolean;
  onAuthenticate: (pin: string) => Promise<void>;
  onRequest: (body: Record<string, unknown>) => Promise<void>;
  onRefresh: () => Promise<WishlistItem[]>;
  onError: (message: string) => void;
  onOptimisticCreate: (item: WishlistItem) => void;
  onOptimisticDelete: (id: string) => void;
  onRestore: (items: WishlistItem[]) => void;
  closeModal: () => void;
}

const OwnerEditor = ({
  items,
  ownerAuthenticated: initialOwnerAuthenticated,
  onAuthenticate,
  onRequest,
  onRefresh,
  onError,
  onOptimisticCreate,
  onOptimisticDelete,
  onRestore,
  closeModal,
}: OwnerEditorProps) => {
  const [localItems, setLocalItems] = useState(items);
  const [ownerAuthenticated, setOwnerAuthenticated] = useState(initialOwnerAuthenticated);
  const [pin, setPin] = useState('');
  const [draft, setDraft] = useState<ItemDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  const submitItem = async (event: FormEvent) => {
    event.preventDefault();
    const optimisticItem: WishlistItem = {
      id: `optimistic-${crypto.randomUUID()}`,
      title: draft.title.trim(),
      description: draft.description.trim() || null,
      type: draft.type,
      link: draft.link.trim() || null,
      image_url: draft.image_url.trim() || null,
      price: draft.price.trim() || null,
      sort_order: localItems.length,
      interests: [],
    };
    const previousItems = localItems;
    try {
      if (!editingId) {
        onOptimisticCreate(optimisticItem);
        setLocalItems((currentItems) => [...currentItems, optimisticItem]);
      }
      await onRequest({
        action: editingId ? 'update' : 'create',
        id: editingId,
        ...draft,
        price: formatPrice(draft.price),
      });
      setDraft(emptyDraft);
      setEditingId(null);
      setLocalItems(await onRefresh());
    } catch (requestError) {
      if (!editingId) {
        setLocalItems(previousItems);
        onRestore(previousItems);
      }
      onError(requestError instanceof Error ? requestError.message : 'Could not update wishlist.');
    }
  };

  const removeItem = async (id: string) => {
    if (!window.confirm('Delete this wishlist item and its interests?')) return;
    const previousItems = localItems;
    try {
      onOptimisticDelete(id);
      setLocalItems((currentItems) => currentItems.filter((item) => item.id !== id));
      await onRequest({ action: 'delete', id });
      setLocalItems(await onRefresh());
    } catch (requestError) {
      setLocalItems(previousItems);
      onRestore(previousItems);
      onError(requestError instanceof Error ? requestError.message : 'Could not delete item.');
    }
  };

  return (
    <div className="wishlist-owner-modal">
      {!ownerAuthenticated ? (
        <form
          className="wishlist-owner-login"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await onAuthenticate(pin);
              setOwnerAuthenticated(true);
              setPin('');
            } catch (requestError) {
              onError(requestError instanceof Error ? requestError.message : 'Could not authenticate owner.');
            }
          }}
        >
          <div className="wishlist-admin-heading">
            <div>
              <p className="eyebrow">Private controls</p>
              <h2>Owner sign-in</h2>
            </div>
            <button type="button" className="wishlist-subtle-button" onClick={closeModal}>
              Close
            </button>
          </div>
          <p>Enter the owner PIN to view wishlist editing settings.</p>
          <label>
            Owner PIN
            <input
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              autoComplete="current-password"
              autoFocus
            />
          </label>
          <button type="submit">Unlock editor</button>
        </form>
      ) : (
        <>
          <div className="wishlist-admin-heading">
            <div>
              <h2>Owner editor</h2>
            </div>
            <button type="button" className="wishlist-subtle-button" onClick={closeModal}>
              Close
            </button>
          </div>
          <form className="wishlist-form" onSubmit={submitItem}>
            <label>
              Title
              <input
                required
                value={draft.title}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              />
            </label>
            <label>
              Type
              <select
                value={draft.type}
                onChange={(event) => setDraft({ ...draft, type: event.target.value as ItemType })}
              >
                <option value="explicit">Present (1 claim)</option>
                <option value="broad">{'Theme/Idea (>1 claim)'}</option>
              </select>
            </label>
            <label>
              Description
              <textarea
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              />
            </label>
            <label>
              Link
              <input
                type="url"
                value={draft.link}
                onChange={(event) => setDraft({ ...draft, link: event.target.value })}
              />
            </label>
            <label>
              Image URL
              <input
                type="url"
                value={draft.image_url}
                onChange={(event) => setDraft({ ...draft, image_url: event.target.value })}
              />
            </label>
            <label>
              Approximate price
              <span className="wishlist-price-input">
                <span aria-hidden="true">€</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={draft.price}
                  onChange={(event) => setDraft({ ...draft, price: event.target.value })}
                  onBlur={() => setDraft({ ...draft, price: formatPrice(draft.price) })}
                />
              </span>
            </label>
            <button type="submit">{editingId ? 'Save changes' : 'Add present'}</button>
            {editingId && (
              <button
                type="button"
                className="wishlist-subtle-button"
                onClick={() => {
                  setEditingId(null);
                  setDraft(emptyDraft);
                }}
              >
                Cancel edit
              </button>
            )}
          </form>
          <div className="wishlist-owner-items">
            <h3>Existing presents</h3>
            {localItems.length === 0 ? (
              <p>No presents listed yet.</p>
            ) : (
              sortItemsByType(localItems).map((item, index, sortedItems) => (
                <Fragment key={item.id}>
                  {(index === 0 || sortedItems[index - 1].type !== item.type) && (
                    <h4>{item.type === 'explicit' ? 'Explicit gifts' : 'Ideas and themes'}</h4>
                  )}
                  <div className="wishlist-owner-item">
                    <strong>{item.title}</strong>
                    <button
                      type="button"
                      className="wishlist-subtle-button"
                      onClick={() => {
                        setEditingId(item.id);
                        setDraft({
                          title: item.title,
                          description: item.description ?? '',
                          type: item.type,
                          link: item.link ?? '',
                          image_url: item.image_url ?? '',
                          price: formatPrice(item.price ?? ''),
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button type="button" className="wishlist-subtle-button" onClick={() => void removeItem(item.id)}>
                      Delete
                    </button>
                  </div>
                </Fragment>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Wishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [interestItem, setInterestItem] = useState<WishlistItem | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileName, setProfileName] = useState('');
  const [profilePin, setProfilePin] = useState('');
  const [profileMode, setProfileMode] = useState<'create' | 'login'>('create');

  useEffect(() => {
    if (!notice) return undefined;
    const timeoutId = window.setTimeout(() => setNotice(''), 10000);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);
  const [ownerAuthenticated, setOwnerAuthenticated] = useState(false);
  const { openModal, closeModal } = useModal();

  const loadItems = async (): Promise<WishlistItem[]> => {
    try {
      const response = await api<{ items: WishlistItem[]; profile: Profile | null; ownerAuthenticated: boolean }>();
      setItems(response.items);
      setProfile(response.profile);
      setOwnerAuthenticated(response.ownerAuthenticated);
      setError('');
      return response.items;
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not load wishlist.');
      return items;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      await loadItems();
    };
    void fetchItems();
  }, []);

  const submitInterest = async (event: FormEvent) => {
    event.preventDefault();
    if (!interestItem || !profile) return;
    try {
      await api({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'interest', itemId: interestItem.id }),
      });
      setNotice('Interest saved.');
      setInterestItem(null);
      await loadItems();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not save interest.');
    }
  };

  const submitProfile = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await api({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: `profile-${profileMode}`, name: profileName, pin: profilePin }),
      });
      setNotice(profileMode === 'create' ? 'Profile created.' : 'Signed in.');
      setProfileName('');
      setProfilePin('');
      await loadItems();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not authenticate profile.');
    }
  };

  const logoutProfile = async () => {
    try {
      await api({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      setProfile(null);
      setNotice('Signed out.');
      await loadItems();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not sign out.');
    }
  };

  const cancelInterest = async (itemId: string) => {
    try {
      await api({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel-interest', itemId }),
      });
      setNotice('Interest cancelled.');
      await loadItems();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not cancel interest.');
    }
  };

  const ownerAuthenticate = async (ownerPin: string) => {
    await api({
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-owner-pin': ownerPin },
      body: JSON.stringify({ action: 'owner-login' }),
    });
    setOwnerAuthenticated(true);
  };

  const ownerRequest = async (body: Record<string, unknown>) => {
    try {
      await api({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setNotice('Wishlist updated.');
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Wishlist update failed.';
      console.error('Wishlist owner update failed:', requestError);
      throw new Error(message, { cause: requestError });
    }
  };

  const openOwnerEditor = () =>
    openModal(
      <OwnerEditor
        items={items}
        ownerAuthenticated={ownerAuthenticated}
        onAuthenticate={ownerAuthenticate}
        onRequest={ownerRequest}
        onRefresh={loadItems}
        onError={setError}
        onOptimisticCreate={(item) => setItems((currentItems) => [...currentItems, item])}
        onOptimisticDelete={(id) => setItems((currentItems) => currentItems.filter((item) => item.id !== id))}
        onRestore={setItems}
        closeModal={closeModal}
      />
    );

  return (
    <section className="wishlist">
      <div className="wishlist-heading">
        <div>
          <h1>Wishlist</h1>
          <p>
            Here's a few ideas for presents I would love (pretty please). Express interest so others know what is
            already covered.
          </p>
        </div>
        <button type="button" className="wishlist-owner-edit-button" onClick={openOwnerEditor}>
          Owner edit
        </button>
      </div>

      {error && <p className="wishlist-message wishlist-error">{error}</p>}
      {notice && (
        <div className="wishlist-message wishlist-notice">
          <p>{notice}</p>
          <button
            type="button"
            className="wishlist-notice-close"
            onClick={() => setNotice('')}
            aria-label="Dismiss notice"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="wishlist-profile-section">
        <h2>Your profile</h2>
        <div className="wishlist-profile">
          {profile ? (
            <>
              <p>
                Signed in as <strong>{profile.name}</strong>.
              </p>
              <button
                type="button"
                className="wishlist-subtle-button wishlist-sign-out-button"
                onClick={() => void logoutProfile()}
              >
                Sign out
              </button>
            </>
          ) : (
            <form className="wishlist-profile-form" onSubmit={submitProfile}>
              <h2>{profileMode === 'create' ? 'Create your wishlist profile' : 'Sign in to your profile'}</h2>
              <p>Use a name and personal PIN.</p>
              <label>
                Name
                <input
                  required
                  minLength={2}
                  maxLength={100}
                  value={profileName}
                  onChange={(event) => setProfileName(event.target.value)}
                />
              </label>
              <label>
                Personal PIN
                <input
                  required
                  minLength={4}
                  maxLength={128}
                  type="password"
                  value={profilePin}
                  onChange={(event) => setProfilePin(event.target.value)}
                />
              </label>
              <button type="submit">{profileMode === 'create' ? 'Create profile' : 'Sign in'}</button>
              <button
                type="button"
                className="wishlist-subtle-button"
                onClick={() => setProfileMode(profileMode === 'create' ? 'login' : 'create')}
              >
                {profileMode === 'create' ? 'I already have a profile' : 'Create a new profile'}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="wishlist-presents-section">
        <h2>Presents</h2>
        {loading ? (
          <p>Loading presents...</p>
        ) : items.length === 0 ? (
          <p>No presents listed yet.</p>
        ) : (
          <div className="wishlist-grid">
            {(() => {
              const ownClaimedItems = profile
                ? items.filter((item) => item.interests.some((interest) => interest.profile_id === profile.id))
                : [];
              const otherItems = sortItemsByType(
                items.filter((item) => !ownClaimedItems.some((claimedItem) => claimedItem.id === item.id))
              );
              const displayItems = [...sortItemsByType(ownClaimedItems), ...otherItems];
              return displayItems.map((item, index) => {
              const claimed = item.type === 'explicit' && item.interests.length > 0;
              const hasInterest = item.interests.length > 0;
              const isOwnClaimed = index < ownClaimedItems.length;
              const previousItem = displayItems[index - 1];
              return (
                <Fragment key={item.id}>
                  {index === 0 && ownClaimedItems.length > 0 && (
                    <h3 className="wishlist-group-heading">Your claimed presents</h3>
                  )}
                  {!isOwnClaimed &&
                    (index === ownClaimedItems.length || previousItem.type !== item.type) && (
                    <h3 className="wishlist-group-heading">
                      {item.type === 'explicit' ? 'Explicit gifts' : 'Ideas and themes'}
                    </h3>
                  )}
                  <article
                    className={`wishlist-card${claimed ? ' wishlist-card-claimed' : ''}${hasInterest && !claimed ? ' wishlist-card-interest' : ''}`}
                  >
                    {item.image_url && <img src={item.image_url} alt="" loading="lazy" />}
                    <div className="wishlist-card-content">
                      <div className="wishlist-card-meta">
                        <span>{item.type === 'explicit' ? 'Explicit Gift' : 'Theme/Idea'}</span>
                        <span>
                          Price: {formatPrice(item.price ?? '') ? `~€${formatPrice(item.price ?? '')}` : 'N/A'}
                        </span>
                      </div>
                      <h2>{item.title}</h2>
                      {item.description && <p>{item.description}</p>}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noreferrer">
                          View item
                        </a>
                      )}
                      {profile && (
                        <>
                          <h3>{item.interests.length ? 'Interested' : 'No one has claimed this yet'}</h3>
                          {item.interests.length > 0 && (
                            <ul>
                              {item.interests.map((interest) => (
                                <li key={interest.id}>{interest.name}</li>
                              ))}
                            </ul>
                          )}
                          {claimed ? (
                            <p className="wishlist-locked">Already claimed</p>
                          ) : !item.interests.some((interest) => interest.profile_id === profile.id) ? (
                            <button type="button" onClick={() => setInterestItem(item)}>
                              I can get this
                            </button>
                          ) : (
                            <p className="wishlist-claimed-by-me">You expressed interest in this.</p>
                          )}
                          {item.interests.some((interest) => interest.profile_id === profile.id) && (
                            <button
                              type="button"
                              className="wishlist-subtle-button"
                              onClick={() => void cancelInterest(item.id)}
                            >
                              Remove my interest
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </article>
                </Fragment>
              );
              });
            })()}
          </div>
        )}
      </div>

      {interestItem && (
        <div className="wishlist-dialog-backdrop" role="presentation" onClick={() => setInterestItem(null)}>
          <form className="wishlist-dialog" onSubmit={submitInterest} onClick={(event) => event.stopPropagation()}>
            <h2>Express interest</h2>
            <p>Tell others that you are getting “{interestItem.title}”.</p>
            <button type="submit">Save interest</button>
            <button type="button" className="wishlist-subtle-button" onClick={() => setInterestItem(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Wishlist;
