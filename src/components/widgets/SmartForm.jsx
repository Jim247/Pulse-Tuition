import { useForm, ValidationError } from '@formspree/react';

const tutorsData = [
  {
    id: 1,
    name: 'John Doe',
    instruments: ['Piano/Keyboard', 'Acoustic Guitar'],
    mobileCoverage: ['BS1', 'BS2', 'BS3'],
    // ...other tutor info...
  },
  {
    id: 2,
    name: 'Sarah Smith',
    instruments: ['Singing', 'Piano/Keyboard'],
    mobileCoverage: ['BS4', 'BS5'],
    // ...other tutor info...
  },
  // ...more tutors...
];

const ContactForm = () => {
  const [state, handleSubmit] = useForm('YOUR_FORMSPREE_ID');

  // We’ll override the default submit to attach matched tutor data
  const handleCustomSubmit = async (e) => {
    e.preventDefault();

    // Grab the user’s selected instruments
    const formData = new FormData(e.target);
    const userInstruments = formData.getAll('instruments[]'); // e.g. checkboxes

    // Match tutors who teach any selected instrument
    const matchedTutors = tutorsData.filter((tutor) =>
      userInstruments.some((instrument) => tutor.instruments.includes(instrument))
    );

    // Convert matched tutors to string or set “no matches”
    const matchedString = matchedTutors.length ? JSON.stringify(matchedTutors) : 'no matches';

    // Update or create the hidden field so Formspree includes this in the request
    const hiddenFieldName = 'matchedTutors';
    let hiddenField = e.target.querySelector(`input[name="${hiddenFieldName}"]`);
    if (!hiddenField) {
      hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = hiddenFieldName;
      e.target.appendChild(hiddenField);
    }
    hiddenField.value = matchedString;

    // Now submit with the updated form data
    handleSubmit(e);
  };

  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form
      onSubmit={handleCustomSubmit}
      action="https://formspree.io/f/YOUR_FORMSPREE_ID"
      method="POST"
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
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      {/* Instruments Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Instruments</label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="piano"
              value="Piano/Keyboard"
              name="instruments[]"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="piano" className="ml-2 text-sm">
              Piano/Keyboard
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="guitar"
              value="Acoustic Guitar"
              name="instruments[]"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="guitar" className="ml-2 text-sm">
              Acoustic Guitar
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vocals"
              value="Singing"
              name="instruments[]"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="vocals" className="ml-2 text-sm">
              Singing
            </label>
          </div>
          {/* Add more instruments as needed */}
        </div>
        <ValidationError prefix="Instruments" field="instruments" errors={state.errors} />
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="message">
          Message
        </label>
        <textarea id="message" name="message" rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

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
