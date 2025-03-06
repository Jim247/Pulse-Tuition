import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const JobApplicationForm = () => {
  const [state, handleSubmit] = useForm('your-form-id');

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="https://formspree.io/f/mzzdrpqn"
      method="POST"
      className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 mx-auto"
    >
      <h1 className="text-2xl font-bold text-center mb-4">Pulse Tuition Job Application Form</h1>
      <p className="text-center">Please complete the form below to apply for a position with us.</p>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Birth Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Birth Date</label>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="birthMonth"
            placeholder="Month"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="birthDay"
            placeholder="Day"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="birthYear"
            placeholder="Year"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Current Address */}
      <div>
        <label className="block text-sm font-medium mb-1">Current Address</label>
        <input
          type="text"
          name="addressLine1"
          placeholder="Street Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          type="text"
          name="addressLine2"
          placeholder="Street Address Line 2"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
        />
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="zip"
            placeholder="Postal / Zip Code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Email Address */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="example@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="+44 7123 456 789"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Areas of Bristol */}
      <div>
        <label className="block text-sm font-medium mb-1">Which area(s) of Bristol would you be able to cover?</label>
        <input type="text" name="areas" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>

      {/* Instruments */}
      <div>
        <label className="block text-sm font-medium mb-1">Which instrument(s) can you teach?</label>
        <input type="text" name="instruments" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>

      {/* Enhanced DBS */}
      <div>
        <label className="block text-sm font-medium mb-1">Do you have an Enhanced DBS Certificate?</label>
        <div className="mb-2">
          <input type="radio" id="dbsYes" name="enhancedDBS" value="Yes" className="mr-2" />
          <label htmlFor="dbsYes">Yes</label>
        </div>
        <div>
          <input type="radio" id="dbsNo" name="enhancedDBS" value="No" className="mr-2" />
          <label htmlFor="dbsNo">No, but I'm willing to secure one before starting</label>
        </div>
      </div>

      {/* Years experience */}
      <div>
        <label className="block text-sm font-medium mb-1">
          How many years of experience do you have teaching music?
        </label>
        <input type="text" name="yearsTeaching" rows={1} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Please let us know why you'd be a great fit for Pulse...
        </label>
        <textarea name="whyFit" rows={8} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>

      {/* reCAPTCHA */}
      <div id="recaptcha" className="g-recaptcha" data-sitekey="6LeU7dUqAAAAANcKolkeZ7e43tVB5gLqQizDT-S0"></div>
      
      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={state.submitting}
          className={`w-full py-2 rounded-md ${
            state.submitting ? 'bg-gray-400' : 'bg-sky-900 hover:bg-sky-700 text-white'
          }`}
        >
          {state.submitting ? 'Submitting...' : 'Apply'}
        </button>
      </div>
    </form>
  );
};

export default JobApplicationForm;
