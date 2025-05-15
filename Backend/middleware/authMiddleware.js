import jwt from 'jsonwebtoken';
import CommunityMember from '../models/communityMember.js';

const authMiddleware = async (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token, access denied' });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database
    const user = await User.findById(decoded.user);

    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;

    // Call next middleware function
    next();
  } catch (err) {
    console.log('Invalid token:', err);

    // Specific error for expired token
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // General error for invalid token
    return res.status(401).json({ message: 'Token is not valid' });
  }
};


// const isCommunityVerified = async (req, res, next) => {
//   const communityMember = await CommunityMember.findOne({ user: req.user._id });
//   if (!communityMember || !communityMember.isVerified) {
//     return res.status(403).json({ message: 'Not a verified community member' });
//   }
//   req.user.communityMemberId = communityMember._id;
//   next();
// };

export default (authMiddleware );
