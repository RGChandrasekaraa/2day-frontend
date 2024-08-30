import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RegistrationModal from './RegistrationModal';
import LoginModal from './LoginModal';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const openRegistrationModal = () => {
    console.log('Opening Registration Modal');
    setIsLoginMode(false);
    setIsModalOpen(true);
  };

  const openLoginModal = () => {
    console.log('Opening Login Modal');
    setIsLoginMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex flex-1 flex-col items-center justify-center text-center p-4">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Welcome to 2day Diary
        </motion.h1>
        <motion.p
          className="text-xl md:text-3xl text-blue-700 mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          A secure and elegant way to capture your daily thoughts.
        </motion.p>
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <button
            onClick={openRegistrationModal}
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-md text-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
          <button
            onClick={openLoginModal}
            className="bg-white hover:bg-gray-100 text-blue-900 border border-blue-900 px-8 py-4 rounded-md text-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            Login
          </button>
        </motion.div>
      </main>
      <motion.footer
        className="pb-6 text-center text-blue-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
      >
        <p>© 2024 2day Diary. All rights reserved.</p>
      </motion.footer>

      {/* Conditionally render either RegistrationModal or LoginModal based on isLoginMode */}
      {isModalOpen && (
  isLoginMode ? (
    <LoginModal key="login-modal" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  ) : (
    <RegistrationModal key="registration-modal" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  )
)}
    </div>
  );
};

export default LandingPage;
