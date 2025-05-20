'use client';

interface Comment {
  id: string;
  content: string;
  user_id: string;
}

export default function CommentList({ comments }: { comments: Comment[] }) {
  // If no comments, show a fallback message
  if (!comments.length) return <p className="text-gray-500">No comments yet.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>
      <ul className="space-y-4">
        {/* Render each comment */}
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <p className="text-gray-800">{comment.content}</p>
            <p className="text-xs text-gray-500 mt-1">By {comment.user_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
