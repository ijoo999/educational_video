'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../../../utils/api';
import VideoPlayer from '../../../components/VideoPlayer';
import CommentForm from '../../../components/CommentForm';
import CommentList from '../../../components/CommentList';

export default function VideoPage() {
  // Extract video ID from the URL
  const { id: videoId } = useParams() as { id: string };

  const [video, setVideo] = useState<any>(null);
  const [comments, setComments] = useState([]);

  // Fetch video data on mount or when videoId changes
  useEffect(() => {
    const fetchVideo = async () => {
      if (!videoId) return;

      try {
        const res = await api.getVideoById(videoId);
        const data = res.data?.video || res.data;

        // Clean up stray quotes from the video URL, if present
        const cleanUrl =
          typeof data.video_url === 'string'
            ? data.video_url.replace(/^'+|'+$/g, '').trim()
            : '';

        setVideo({ ...data, video_url: cleanUrl });
      } catch (err) {
        console.error('Error fetching video:', err);
      }
    };

    fetchVideo();
  }, [videoId]);

  // Fetch comments for the video
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.getComments(videoId);
        setComments(res.data.comments || res.data || []);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [videoId]);

  if (!video) return <p>Loading video...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
      <p className="text-gray-600 mb-4">{video.description}</p>
      <VideoPlayer url={video.video_url} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>

        {/* Render existing comments */}
        <CommentList comments={comments} />

        {/* On successful comment post, refetch the comment list */}
        <CommentForm
          videoId={videoId}
          onCommentAdded={async () => {
            const res = await api.getComments(videoId);
            setComments(res.data.comments || res.data || []);
          }}
        />
      </div>
    </div>
  );
}
