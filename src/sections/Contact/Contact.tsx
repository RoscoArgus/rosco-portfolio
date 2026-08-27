import './Contact.css';
import { useState } from 'react';
import { FaEnvelopeOpenText, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setResult('Sending...');
    const formData = new FormData(event?.target);
    formData.append('access_key', 'c4e8d3a0-da53-4aca-b6b6-e0a3d94cebac');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    setResult(data.success ? 'Message sent successfully!' : 'Failed to send message. Please try again.');
    event.target.reset();
  };

  return (
    <section className="contact" id="contact">
      <h1>Contact</h1>
      <p>Want to get in touch? Fill in the form below and I'll get back to you!</p>
      <div className="contact-container">
        <form className="contact-form" onSubmit={onSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required></textarea>
          <button type="submit">
            Send
            <FaPaperPlane className="send-icon" />
          </button>
          <p>{result}</p>
        </form>
        <FaEnvelopeOpenText className="contact-icon" />
      </div>
    </section>
  );
};

export default Contact;
