import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_BACKEND_URL;


const RegistrationModal = ({ isOpen, onClose }) => {
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const SERVER_URL = apiUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const dob = formData.get('dob');

    try {
      // 1. Get challenge from server
      const initResponse = await fetch(
        `${SERVER_URL}/init-register?email=${email}&firstName=${firstName}&lastName=${lastName}&dob=${dob}`,
        { credentials: "include" }
      );
      const options = await initResponse.json();
      if (!initResponse.ok) {
        throw new Error(options.error || 'Failed to initialize registration');
      }

      // 2. Create passkey
      const registrationJSON = await startRegistration(options);

      // 3. Save passkey in DB
      const verifyResponse = await fetch(`${SERVER_URL}/verify-register`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationJSON),
      });

      const verifyData = await verifyResponse.json();
      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || 'Failed to verify registration');
      }

      if (verifyData.verified) {
        toast.success(`Successfully registered ${email}`);
      } else {
        toast.error('Failed to register. Please try again.');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white rounded-lg p-8 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-blue-900 hover:text-blue-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold text-blue-900 mb-6">Get Started</h2>
            {modalContent && (
              <motion.p
                className="text-blue-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {modalContent}
              </motion.p>
            )}
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 mb-4 border border-blue-300 rounded-md text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                required
                className="w-full p-3 mb-4 border border-blue-300 rounded-md text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
                className="w-full p-3 mb-4 border border-blue-300 rounded-md text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="dob"
                type="date"
                required
                className="w-full p-3 mb-6 border border-blue-300 rounded-md text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md text-lg transition-transform transform hover:scale-105 shadow-lg"
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
      <ToastContainer />
    </AnimatePresence>
  );
};

export default RegistrationModal;
