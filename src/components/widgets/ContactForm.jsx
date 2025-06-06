import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

/**
 * Name attribute must be present in each input field
 */

const ContactForm = () => {
  const [state, handleSubmit] = useForm('xpwzybyo'); // Replace with your Formspree form ID

  // If submission is successful, show success message
  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form
      onSubmit={handleSubmit} // Use Formspree's handleSubmit directly
      action="https://formspree.io/f/xpwzybyo" // Set the Formspree URL
      method="POST" // Ensure the method is POST
      className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 mx-auto"
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
          name="name" // Ensure name attribute is present
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email" // Ensure name attribute is present
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="elton@john.com"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="phone">
          Phone
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="07123456789 or 0712 3456789"
          pattern="^07\d{3}\s?\d{6}$" // Matches both formats (with and without a space)
          title="Enter a valid UK mobile number (e.g. 07123456789 or 0712 3456789)"
          required
        />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} />
      </div>

      {/* Postcode */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="postcode">
          Postcode
        </label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="BS1 1AA"
          pattern="^BS\d{1,2}\s\d[A-Z]{2}$"
          title="Enter a valid Bristol postcode (e.g., BS1 1AA or BS10 1AB)"
          required
        />
        <ValidationError prefix="Postcode" field="postcode" errors={state.errors} />
      </div>

      {/* Instruments Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Instruments</label>
        <div className="space-y-2">
          {/* Vocals */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vocals"
              value="Vocals"
              name="instruments[]" // Ensure name attribute is present
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="vocals" className="ml-2 text-sm">
              Vocals
            </label>
          </div>
          {/* Keys/Piano */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="keys"
              value="Keys/Piano"
              name="instruments[]" // Ensure name attribute is present
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="keys" className="ml-2 text-sm">
              Keys/Piano
            </label>
          </div>
          {/* Guitar */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="guitar"
              value="Guitar"
              name="instruments[]" // Ensure name attribute is present
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
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
        <label className="block text-sm font-medium mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message" // Ensure name attribute is present
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="How can we help? Please include age, level, musical interests, and goals..."
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      {/* reCAPTCHA */}
      <div className="g-recaptcha" data-sitekey="6LeU7dUqAAAAANcKolkeZ7e43tVB5gLqQizDT-S0"></div>
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={state.submitting}
          className={`w-full py-2 rounded-md ${
            state.submitting ? 'bg-gray-400' : 'bg-sky-900 hover:bg-sky-700 text-white'
          }`}
        >
          {state.submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
