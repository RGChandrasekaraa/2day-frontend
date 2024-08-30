import React from 'react';

const DiaryEntry = ({ entry, setEntry }) => {
  return (
    <div className="my-4">
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full h-48 border border-gray-300 p-2 rounded-md"
      />
    </div>
  );
};

export default DiaryEntry;
