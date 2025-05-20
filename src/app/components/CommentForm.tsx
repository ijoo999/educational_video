'use client';

import { useState } from 'react';
import { api } from '../utils/api';

const USER_ID = 'ijoo_yoon'; // static user ID for testing

export default function CommentForm({
  videoId,
  onCommentAdded,
}: {
  videoId: string;
  onCommentAdded: () => void;
}) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle comment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit comment to backend
      await api.addComment(videoId, {
        text,
        user_id: USER_ID,
      });

      // Clear input and refresh comments
      setText('');
      onCommentAdded();
    } catch (err) {
      alert('Failed to post comment.');
      console.error('Comment post error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      {/* Comment input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-2 border border-gray-300 rounded"
        rows={3}
        required
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}
