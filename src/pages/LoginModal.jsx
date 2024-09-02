import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { startAuthentication } from "@simplewebauthn/browser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const LoginModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const SERVER_URL = apiUrl;
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get('email');

    try {
      // 1. Get challenge from server
      const initResponse = await fetch(`${SERVER_URL}/init-auth?email=${email}`, {
        credentials: "include",
      });
      const options = await initResponse.json();
      if (!initResponse.ok) {
        throw new Error(options.error || 'Failed to initialize authentication');
      }

      // 2. Get passkey
      const authJSON = await startAuthentication(options);

      // 3. Verify passkey with DB
      const verifyResponse = await fetch(`${SERVER_URL}/verify-auth`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authJSON),
      });

      const verifyData = await verifyResponse.json();
      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || 'Failed to verify authentication');
      }

      if (verifyData.verified) {
        toast.success(`Successfully logged in as ${email}`);
        navigate('/diary'); // Redirect to diary page on successful login
      } else {
        toast.error('Failed to log in. Please try again.');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred during login');
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
            <h2 className="text-3xl font-extrabold text-blue-900 mb-6">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 mb-6 border border-blue-300 rounded-md text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md text-lg transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : <>Login <span className="ml-2">🔒</span></>}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
      <ToastContainer />
    </AnimatePresence>
  );
};

export default LoginModal;
