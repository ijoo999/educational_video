'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateVideoPage() {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Converts a YouTube watch URL to an embeddable format
  const transformYouTubeUrl = (originalUrl: string): string => {
    if (originalUrl.includes('watch?v=')) {
      return originalUrl.replace('watch?v=', 'embed/');
    }
    return originalUrl;
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const transformedUrl = transformYouTubeUrl(url.trim());

      const payload = {
        title: title.trim(),
        description: description.trim(),
        video_url: transformedUrl,
        user_id: 'ijoo_yoon',
      };

      console.log('Submitting:', payload);

      await axios.post(
        'https://take-home-assessment-423502.uc.r.appspot.com/videos',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Navigate to video list after successful upload
      router.push('/videos');
    } catch (err: any) {
      console.error('Upload failed:', JSON.stringify(err?.response?.data, null, 2));
      alert('Failed to create video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upload a New Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>

        {/* Video URL Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Video URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
}
