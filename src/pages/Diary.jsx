import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Ensure you import default styles

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entry, setEntry] = useState('');
  const [viewMode, setViewMode] = useState('write'); // 'write' or 'view'
  const [showProfile, setShowProfile] = useState(false); // For profile settings modal

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSaveEntry = () => {
    // Implement save functionality here
    alert('Entry saved!');
  };

  const handleEditEntry = () => {
    // Implement edit functionality here
    alert('Entry edited!');
  };

  const handleProfileClick = () => {
    setShowProfile(true); // Show profile settings modal
  };

  const handleProfileClose = () => {
    setShowProfile(false); // Close profile settings modal
  };

  // Determine max date for view mode
  const maxDate = viewMode === 'view' ? new Date() : null;

  // Determine min date for write mode
  const minDate = viewMode === 'write' ? new Date() : null;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col w-full max-w-6xl mx-auto mt-10">
        {/* Header */}
        <header className="bg-blue-900 text-white p-4 rounded-t-3xl shadow-lg flex justify-between items-center flex-wrap">
          <h1 className="text-2xl sm:text-4xl font-bold">2day</h1>
          <button 
            onClick={handleProfileClick}
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 mt-2 sm:mt-0"
          >
            Profile
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 flex flex-col sm:flex-row">
          {/* Left Div - Calendar */}
          <div className="w-full sm:w-1/3 p-4 sm:p-6 bg-gray-50 border-b sm:border-r border-gray-200">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">Calendar</h2>
              <div className="p-2 border border-gray-300 rounded-lg shadow-md bg-white">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="react-calendar shadow-sm rounded-lg"
                  tileDisabled={({ date, view }) => {
                    if (view === 'month') {
                      if (viewMode === 'view' && date > maxDate) {
                        return true;
                      }
                      if (viewMode === 'write' && date < minDate) {
                        return true;
                      }
                    }
                    return false;
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </div>
            </motion.div>
          </div>

          {/* Right Div - Write/View Notes */}
          <div className="w-full sm:w-2/3 p-4 sm:p-6">
            <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mb-8">
              <button
                onClick={() => setViewMode('write')}
                className={`py-2 px-4 rounded-full ${viewMode === 'write' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-blue-800'}`}
              >
                Write
              </button>
              <button
                onClick={() => setViewMode('view')}
                className={`py-2 px-4 rounded-full ${viewMode === 'view' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-blue-800'}`}
              >
                View
              </button>
            </div>

            {viewMode === 'write' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-6">Write a Note</h2>
                <p className="mb-4 text-gray-600">{selectedDate.toDateString()}</p>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ height: '300px' }}
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder="Write your thoughts here..."
                ></textarea>
                <div className="mt-6 flex flex-wrap justify-center space-x-4">
                  <button
                    onClick={handleSaveEntry}
                    className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700"
                  >
                    Save Entry
                  </button>
                  <button
                    onClick={handleEditEntry}
                    className="bg-yellow-600 text-white py-2 px-4 rounded-full hover:bg-yellow-700"
                  >
                    Edit Entry
                  </button>
                </div>
              </motion.div>
            )}

            {viewMode === 'view' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-6">View Notes</h2>
                <p className="mb-4 text-gray-600">{selectedDate.toDateString()}</p>
                {/* Example of viewing notes for the selected date */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <p className="text-gray-800">This is an example note for the selected date.</p>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Profile Settings Modal */}
      {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Profile Settings</h2>
            <button
              onClick={handleProfileClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            {/* Profile settings content here */}
            <p>Your profile settings content goes here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diary;
