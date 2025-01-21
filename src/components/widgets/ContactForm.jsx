import React, { useState } from 'react';

const ContactForm = () => {
  const [formState, setFormState] = useState({ submitting: false, succeeded: false, error: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ ...formState, submitting: true });

    try {
      const formData = new FormData(e.target);
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setFormState({ submitting: false, succeeded: true, error: false });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState({ submitting: false, succeeded: false, error: true });
    }
  };

  if (formState.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-recaptcha="true"
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
    >
      <input type="hidden" name="form-name" value="contact" />

      <h2 className="text-2xl font-bold text-center">Contact Us</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div data-netlify-recaptcha="true"></div>

      <div>
        <button
          type="submit"
          disabled={formState.submitting}
          className={`w-full py-2 rounded-md ${
            formState.submitting ? 'bg-gray-400' : 'bg-sky-900 hover:bg-sky-700 text-white'
          }`}
        >
          {formState.submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {formState.error && <p className="text-red-500 text-sm text-center mt-2">Submission failed. Please try again.</p>}
    </form>
  );
};

export default ContactForm;
