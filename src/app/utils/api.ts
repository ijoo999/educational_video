import axios from 'axios';

const API_BASE_URL = 'https://take-home-assessment-423502.uc.r.appspot.com';

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API Error:', JSON.stringify(err?.response?.data, null, 2) || err.message);
    return Promise.reject(err);
  }
);

const USER_ID = 'ijoo_yoon';

export const api = {
  // Get all videos by user
  getVideos: () =>
    instance.get('/videos', {
      params: { user_id: USER_ID },
    }),

  // Get a single video
  getVideoById: (id: string) =>
    instance.get('/videos/single', {
      params: { video_id: id },
    }),

  // Create a video
  createVideo: (data: {
    title: string;
    description: string;
    video_url: string;
    user_id: string;
  }) => instance.post('/videos', data),

  // Get comments for a video
  getComments: (videoId: string) =>
    instance.get('/videos/comments', {
      params: { video_id: videoId },
    }),

  // Add a comment
  addComment: (videoId: string, data: { text: string; user_id: string }) =>
    instance.post('/videos/comments', {
      video_id: videoId,
      content: data.text, 
      user_id: data.user_id,
    }),
};
