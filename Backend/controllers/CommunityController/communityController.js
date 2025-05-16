import CommunityMember from '../models/communityMember.js';
import AssignedIssue from '../models/assignedIssue.js';
import Issue from '../models/Problem.js';

// Register as a community member
export const registerCommunityMember = async (req, res) => {
  try {
    // Ensure that user is logged in and fetch the user ID
    const exists = await CommunityMember.findOne({ user: req.user._id });
    if (exists) {
      return res.status(400).json({ message: 'You are already registered as a community member.' });
    }

    const newMember = await CommunityMember.create({ user: req.user._id });
    res.status(201).json({ message: 'Registration successful. Await verification from admin.' });
  } catch (err) {
    console.error('Error registering community member:', err);
    res.status(500).json({ message: 'Internal server error during registration.', error: err.message });
  }
};

// Fetch available issues for community
export const getAvailableProblem = async (req, res) => {
  try {
    const issues = await Issue.find({ status: 'Minor', assigned: false });
    if (!issues.length) {
      return res.status(404).json({ message: 'No available issues at the moment.' });
    }
    res.json(issues);
  } catch (err) {
    console.error('Error fetching available problems:', err);
    res.status(500).json({ message: 'Internal server error fetching issues.', error: err.message });
  }
};

// Volunteer picks an issue
export const pickProblem = async (req, res) => {
  try {
    const { issueId } = req.body;

    // Ensure the user is a community member
    const communityMember = await CommunityMember.findOne({ user: req.user._id });
    if (!communityMember) {
      return res.status(400).json({ message: 'You must be a verified community member to pick an issue.' });
    }

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found.' });
    }

    // Create the assignment
    const assigned = await AssignedIssue.create({
      issue: issueId,
      assignedTo: communityMember._id,  // Correctly referencing the community member's ID
    });

    await Issue.findByIdAndUpdate(issueId, { assigned: true, status: 'In Progress' });

    res.status(201).json({ message: 'Issue assigned successfully. Keep up the good work!' });
  } catch (err) {
    console.error('Error picking problem:', err);
    res.status(500).json({ message: 'Internal server error while assigning issue.', error: err.message });
  }
};

// Submit proof after solving
export const submitProof = async (req, res) => {
  try {
    const { assignedIssueId, proofImage, remarks } = req.body;

    // Ensure proof submission contains valid information
    if (!proofImage || !remarks) {
      return res.status(400).json({ message: 'Proof image and remarks are required.' });
    }

    // Update the assigned issue with proof and status change
    await AssignedIssue.findByIdAndUpdate(assignedIssueId, {
      proofImage,
      remarks,
      status: 'Completed',
    });

    res.json({ message: 'Proof submitted successfully. Awaiting admin approval.' });
  } catch (err) {
    console.error('Error submitting proof:', err);
    res.status(500).json({ message: 'Internal server error during proof submission.', error: err.message });
  }
};
