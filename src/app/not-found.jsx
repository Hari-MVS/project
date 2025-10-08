"use client";
import Link from "next/link";

export default function NotFoundSignage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      
      {/* Neon Sign */}
      <h1 className="text-6xl md:text-8xl font-extrabold text-red-600 neon-glow mb-6 animate-flicker">
        NOT FOUND
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-300 mb-8 text-center">
        The service you are looking for does not exist.
      </p>

      {/* Go Back Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
      >
        Go Back Home
      </Link>

      {/* CSS for neon glow and flicker */}
      <style jsx>{`
        .neon-glow {
          text-shadow:
            0 0 5px #ff0000,
            0 0 10px #ff0000,
            0 0 20px #ff0000,
            0 0 40px #ff0000,
            0 0 80px #ff0000;
        }

        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 22%, 24%, 55% { opacity: 0.4; }
        }

        .animate-flicker {
          animation: flicker 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
