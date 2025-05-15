import Notification from '../models/Notification.js';
import mongoose from 'mongoose';

// Get all notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });

    // If no notifications found, return an empty array with a 200 status
    if (notifications.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Mark a notification as read
export const readNotification = async (req, res) => {
  try {
    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid notification ID' });
    }

    const notification = await Notification.findById(req.params.id);

    // Check if notification exists and belongs to the user
    if (!notification || notification.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: 'Marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new notification (could be used to notify users of any event)
export const createNotification = async (userId, message) => {
  try {
    const newNotification = new Notification({
      user: userId,
      message,
    });

    await newNotification.save();
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
