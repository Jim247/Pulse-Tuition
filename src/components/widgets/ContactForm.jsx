import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+44\s?7\d{3}\s?\d{3}\s?\d{3}$/, "Invalid UK phone number")
    .required("Phone number is required"),
  instruments: Yup.array()
    .min(1, "Please select at least one instrument")
    .required("Instrument selection is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="e.g: elton@john.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="phone">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="+44 7123 456 789"
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
        )}
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
              {...register("instruments")}
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
              {...register("instruments")}
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
              {...register("instruments")}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="guitar" className="ml-2 text-sm">
              Guitar
            </label>
          </div>
        </div>
        {errors.instruments && (
          <p className="text-sm text-red-500 mt-1">
            {errors.instruments.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="How can we help? Please include age, level, musical interests and goals..."
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900"        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
