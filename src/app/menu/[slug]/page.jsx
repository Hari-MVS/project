"use client";

import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useParams, useRouter } from "next/navigation";
import menuContent from "../../../data/menucontent.json";

export default function MenuPageClient() {
  const params = useParams();
  const { slug } = params;
  const content = menuContent[slug];
  const [parent] = useAutoAnimate({ duration: 250, easing: "ease-in-out" });
  const router = useRouter();

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <h1 className="text-2xl text-gray-700 font-medium animate-fadeIn">
          Content not found.
        </h1>
      </div>
    );
  }

  return (
    <div
      ref={parent}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 px-6 py-12 flex flex-col items-center"
    >
      {/* Back Button */}
      <div className="w-full max-w-5xl flex justify-start mb-8">
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium shadow-md hover:shadow-lg hover:bg-gray-900 transition-all duration-300 animate-fadeIn"
        >
          ← Back to Home
        </button>
      </div>

      {/* Content Title & Description */}
      <div className="text-center max-w-3xl mb-10 animate-slideUp">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 animate-fadeUp delay-200">
          {content.title}
        </h1>
        <p className="text-gray-600 leading-relaxed animate-fade-in-up delay-300">{content.description}</p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {content.images.map((img, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 animate-fadeUp delay-400"
          >
            <img
              src={img}
              alt={content.title}
              loading="lazy"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
}