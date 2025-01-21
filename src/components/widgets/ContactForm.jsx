/* global grecaptcha:readonly */

import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm('xpwzybyo'); // Replace with your Formspree form ID
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  // Dynamically load the reCAPTCHA script when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/enterprise.js?render=6LeJUr4qAAAAAGipGf-IuSzHA0gCF-awE4WjvlHR';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('reCAPTCHA script loaded successfully');
      setRecaptchaLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script');
      setRecaptchaLoaded(false);
    };

    document.head.appendChild(script);

    // Clean up script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (recaptchaLoaded && typeof grecaptcha !== 'undefined') {
      try {
        console.log('Executing reCAPTCHA...');
        const token = await grecaptcha.enterprise.execute(
          '6LcsZL4qAAAAAK7jEN4cTeudsv2KPDtvMTbzxOAA', // Your site key
          { action: 'submit' }
        );
        setRecaptchaToken(token);
        console.log('reCAPTCHA token generated:', token);

        // Attach the token to a hidden input field in the form
        e.target.querySelector('#g-recaptcha-token').value = token;

        // Proceed with Formspree submission
        handleSubmit(e);
      } catch (error) {
        console.error('Error generating reCAPTCHA token:', error);
        alert('reCAPTCHA verification failed. Please try again.');
      }
    } else {
      console.error('reCAPTCHA is not available');
      alert('Failed to load reCAPTCHA. Please refresh the page and try again.');
    }
  };

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      action="https://formspree.io/f/xpwzybyo" // Replace with your Formspree endpoint
      method="POST"
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>

      {/* Name Field */}
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
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      {/* Email Field */}
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
          placeholder="elton@john.com"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="+44 7123 456 789"
        />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} />
      </div>

      {/* Instruments Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Instruments</label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vocals"
              value="Vocals"
              name="instruments[]"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              aria-label="Vocals"
            />
            <label htmlFor="vocals" className="ml-2 text-sm">
              Vocals
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="keys"
              value="Keys/Piano"
              name="instruments[]"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              aria-label="Keys/Piano"
            />
            <label htmlFor="keys" className="ml-2 text-sm">
              Keys/Piano
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="guitar"
              value="Guitar"
              name="instruments[]"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              aria-label="Guitar"
            />
            <label htmlFor="guitar" className="ml-2 text-sm">
              Guitar
            </label>
          </div>
        </div>
        <ValidationError prefix="Instruments" field="instruments" errors={state.errors} />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="How can we help? Please include age, level, musical interests, and goals..."
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      {/* Hidden reCAPTCHA token */}
      <input type="hidden" id="g-recaptcha-token" name="g-recaptcha-token" />

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={state.submitting || !recaptchaLoaded}
          className={`w-full py-2 rounded-md ${
            state.submitting ? 'bg-gray-400' : 'bg-sky-900 hover:bg-sky-700 text-white'
          }`}
        >
          {state.submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {/* Show warning if reCAPTCHA fails */}
      {!recaptchaLoaded && (
        <p className="text-red-500 text-sm text-center mt-2">
          reCAPTCHA failed to load. Please refresh the page.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
