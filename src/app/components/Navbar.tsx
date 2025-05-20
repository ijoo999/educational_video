import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          EduVideos
        </Link>
        <div className="flex space-x-4">
          <Link href="/videos" className="text-gray-700 hover:text-blue-600">
            Browse Videos
          </Link>
          <Link href="/create" className="text-gray-700 hover:text-blue-600">
            Upload Video
          </Link>
        </div>
      </div>
    </nav>
  );
}