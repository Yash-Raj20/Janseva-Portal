import React, { useState } from 'react';
import { submitProof } from '../../api/communityApi';

const SubmitProof = () => {
  const [assignedIssueId, setAssignedIssueId] = useState('');
  const [proofImage, setProofImage] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitProof({ assignedIssueId, proofImage, remarks });
    alert('Proof submitted successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-darkBlue mb-6 font-bold">Submit Your Proof</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Assigned Task ID"
          className="w-full border p-3 rounded-lg"
          value={assignedIssueId}
          onChange={(e) => setAssignedIssueId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Proof Image URL"
          className="w-full border p-3 rounded-lg"
          value={proofImage}
          onChange={(e) => setProofImage(e.target.value)}
          required
        />
        <textarea
          placeholder="Remarks about task"
          className="w-full border p-3 rounded-lg"
          rows="4"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-primary hover:bg-green-700 text-white py-2 px-6 rounded-lg"
        >
          Submit Proof
        </button>
      </form>
    </div>
  );
};

export default SubmitProof;
