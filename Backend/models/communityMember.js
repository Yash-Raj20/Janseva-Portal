import mongoose from 'mongoose';

const communityMemberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isVerified: { type: Boolean, default: false },
  skills: { type: [String], default: [] },
  joinedAt: { type: Date, default: Date.now }
});

export default mongoose.model('CommunityMember', communityMemberSchema);
