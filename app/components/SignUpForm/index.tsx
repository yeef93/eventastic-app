import React, { useState } from 'react';
import SignUpModal from '@/components/Signup';

function SignUpForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Sign Up
      </button>
      <SignUpModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default SignUpForm;
