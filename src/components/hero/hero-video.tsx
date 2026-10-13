"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function HeroVideo({ src, poster, className = "" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Autoplay fallback handled:", error);
      });
    }
  }, []);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Background Video Element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
          isVideoLoaded ? "opacity-100" : "opacity-90"
        }`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Ultra-subtle ambient contrast to preserve bright white showroom */}
      <div className="absolute inset-0 bg-black/[0.04] pointer-events-none" />
    </div>
  );
}
