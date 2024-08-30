import React from 'react';

const DatePicker = ({ currentDate }) => {
  return (
    <div className="my-4">
      <label className="text-gray-700">Selected Date:</label>
      <input
        type="text"
        value={currentDate}
        readOnly
        className="border border-gray-300 p-2 rounded-md w-full"
      />
    </div>
  );
};

export default DatePicker;
