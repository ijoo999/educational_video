'use client';

import { useState, useRef, useEffect } from 'react';

export default function VideoPlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Clean up URL by trimming quotes or whitespace
  const cleanUrl = url?.trim().replace(/^['"]|['"]$/g, '');

  // Set volume when it changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  // Set playback speed when it changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Toggle play/pause when `playing` changes
  useEffect(() => {
    if (videoRef.current) {
      playing ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [playing]);

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      {cleanUrl ? (
        <video
          ref={videoRef}
          src={cleanUrl}
          controls
          width="100%"
          autoPlay={playing}
          muted={false}
          className="w-full"
        />
      ) : (
        <div className="text-white p-4 bg-red-600">
          ⚠ No video URL provided.
        </div>
      )}

      {/* Playback controls */}
      <div className="bg-gray-800 p-4 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => setPlaying(!playing)}
            className="px-3 py-1 bg-blue-600 rounded"
          >
            {playing ? 'Pause' : 'Play'}
          </button>

          <div className="flex items-center">
            <label className="mr-2">Volume:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>

          <div className="flex items-center">
            <label className="mr-2">Speed:</label>
            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              className="bg-gray-700 text-white p-1 rounded"
            >
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}x
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
