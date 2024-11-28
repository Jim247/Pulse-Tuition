import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xpwzybyo"); // Replace with your Formspree form ID
  const [loading, setLoading] = useState(false);

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default form behavior

    // Log the form data before submission
    const formData = new FormData(event.target);
    console.log('Submit triggered');
    const data = Object.fromEntries(formData.entries());
    console.log('Form submission data:', data);  // Log form data

    setLoading(true);
    try {
      await handleSubmit(event);
      console.log('Form submission successful');
    } catch (error) {
      console.error("Form submission error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit} // Use the custom onSubmit handler
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="phone">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="+44 7123 456 789"
        />
        <ValidationError
          prefix="Phone"
          field="phone"
          errors={state.errors}
        />
      </div>

      {/* Instruments Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Instruments</label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vocals"
              value="vocals"
              name="instruments"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="vocals" className="ml-2 text-sm">
              Vocals
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="keys"
              value="keys"
              name="instruments"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="keys" className="ml-2 text-sm">
              Keys/Piano
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="guitar"
              value="guitar"
              name="instruments"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="guitar" className="ml-2 text-sm">
              Guitar
            </label>
          </div>
        </div>
        <ValidationError
          prefix="Instruments"
          field="instruments"
          errors={state.errors}
        />
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="How can we help? Please include age, level, musical interests, and goals..."
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={state.submitting || loading}
          className={`w-full py-2 rounded-md ${state.submitting || loading ? 'bg-gray-400' : 'bg-blue-800 hover:bg-blue-900'}`}
        >
          {loading || state.submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
