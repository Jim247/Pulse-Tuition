import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

export const PhoneWidget = ({ className = '', variant = 'call', showText = true, reversed = false }) => {
  const phoneNumber = '07827335222';
  const formattedPhone = 'Call Us';

  const variants = {
    call: reversed 
      ? 'bg-white text-sky-900 py-2 px-4 rounded-full shadow-lg hover:shadow-xl' 
      : 'bg-sky-900 text-white py-2 px-4 rounded-full shadow-lg hover:shadow-xl',
    default: 'text-gray-600 hover:text-gray-800',
    header: 'text-white hover:text-sky-300 uppercase font-medium',
    primary: reversed ? 'text-white hover:text-gray-200' : 'text-sky-900 hover:text-sky-700',
    large: reversed ? 'text-white hover:text-gray-200' : 'text-sky-900 hover:text-sky-700 text-xl py-4',
  };

  const baseStyles = 'flex items-center gap-3 transition-colors duration-200';
  const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <div className="flex flex-col items-center">
      <a href={`tel:${phoneNumber}`} className={finalClassName}>
        <FaPhoneAlt className="w-5 h-5" />
        {variant !== 'header' && (
          <span className="font-poppins text-[18px] font-normal">{formattedPhone}</span>
        )}
      </a>
    </div>
  );
};

export default PhoneWidget;
