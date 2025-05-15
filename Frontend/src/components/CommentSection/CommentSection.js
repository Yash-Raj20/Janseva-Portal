import { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSection({ issueId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/api/issues/${issueId}`);
      setComments(res.data.comments);
    };

    fetchComments();
  }, [issueId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(`/api/issues/${issueId}/comment`, { text: newComment });
      setComments(prev => [...prev, { text: newComment, createdAt: new Date() }]);
      setNewComment('');
    } catch (err) {
      alert('Error adding comment');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3 text-blue-700">Comments</h3>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow rounded-lg"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleAddComment}
        >
          Post
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {comments.map((c, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded-lg shadow">
            <p>{c.text}</p>
            <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
