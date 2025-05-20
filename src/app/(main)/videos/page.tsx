import { api } from '../../utils/api';
import Link from 'next/link';

// Define expected video structure
interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
}

export default async function VideosPage() {
  let videos: Video[] = [];

  try {
    // Fetch all videos for the user
    const res = await api.getVideos();
    const raw = res.data;
    console.log('📦 API raw response:', raw);

    // Normalize video list regardless of API shape
    if (Array.isArray(raw)) {
      videos = raw;
    } else if (Array.isArray(raw.videos)) {
      videos = raw.videos;
    } else {
      console.warn('⚠ Unexpected video data shape:', raw);
    }

    console.log('Final video array used for rendering:', videos);
  } catch (err: any) {
    console.error('❌ Failed to fetch videos:', err?.response?.data || err.message);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse Videos</h1>

      {/* Handle empty state */}
      {videos.length === 0 ? (
        <p>No videos yet.</p>
      ) : (
        // Render each video as a card link
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.id}`}
              className="block p-4 bg-white shadow rounded hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-gray-600">{video.description}</p>
              <p className="text-xs text-gray-500 mt-2">By {video.user_id}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
