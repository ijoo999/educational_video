# EduVideos Platform

A full-stack video viewer that lets users browse, watch videos, and leave comments. Built with Next.js, it fetches data from a remote API and uses React client components for interactivity.

## Features

- Browse all videos
- Watch videos with custom playback controls
- View and post comments per video
- Server-rendered pages with client-side hydration
- Minimal UI with Tailwind CSS
- _**Currently supports only direct .mp4 video URLs**_

## Tech Stack

- Next.js (App Router)
- React (Client Components)
- TypeScript
- Axios
- Tailwind CSS

## Getting Started

1. Clone the repository:

    git clone https://github.com/your-username/eduvideos.git
    cd eduvideos


2. Install dependencies:

    npm install


3. Start the development server:

    npm run dev


4. Open [http://localhost:3000](http://localhost:3000) in your browser.


### Video Player Page

Displays the selected video with controls and its associated comments section.

### Browse Page

Lists all available videos pulled from the backend.

(Insert screenshots or link to `/screenshots` folder)

## Notes

- Comments are stored per video ID
- Valid video URLs are required to ensure proper playback

