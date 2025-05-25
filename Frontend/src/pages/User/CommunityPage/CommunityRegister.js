import React from 'react';
import { registerCommunityMember } from '../../api/communityApi';

const CommunityRegister = () => {
  const handleRegister = async () => {
    try {
      await registerCommunityMember();
      alert('Registered Successfully! Wait for verification.');
    } catch (error) {
      console.error(error);
      alert('Already Registered or Error Occurred!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightGray">
      <h1 className="text-3xl font-bold mb-6 text-darkBlue">Join as Community Volunteer</h1>
      <button
        onClick={handleRegister}
        className="bg-primary hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
      >
        Register Now
      </button>
    </div>
  );
};

export default CommunityRegister;
