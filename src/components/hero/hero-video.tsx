"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface HeroVideoProps {
  src: string;
  mobileSrc?: string;
  poster?: string;
  className?: string;
}

export function HeroVideo({
  src,
  mobileSrc,
  poster,
  className = "",
}: HeroVideoProps) {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isDesktopLoaded, setIsDesktopLoaded] = useState(false);
  const [isMobileLoaded, setIsMobileLoaded] = useState(false);

  // Reliable play helper with strict mobile compatibility flags
  const startPlayback = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;

    // Strict attributes required by iOS Safari & Android Chrome for autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: If browser policy blocked immediate autoplay, wait for first user touch/scroll/click
        const unlockPlayback = () => {
          if (video && video.paused) {
            video.muted = true;
            video.play().catch(() => {});
          }
          window.removeEventListener("touchstart", unlockPlayback);
          window.removeEventListener("touchend", unlockPlayback);
          window.removeEventListener("scroll", unlockPlayback);
          window.removeEventListener("click", unlockPlayback);
        };

        window.addEventListener("touchstart", unlockPlayback, { passive: true, once: true });
        window.addEventListener("touchend", unlockPlayback, { passive: true, once: true });
        window.addEventListener("scroll", unlockPlayback, { passive: true, once: true });
        window.addEventListener("click", unlockPlayback, { passive: true, once: true });
      });
    }
  }, []);

  // Initialize playback on mount and whenever video sources change
  useEffect(() => {
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    startPlayback(desktopVideo);
    startPlayback(mobileVideo);

    // Auto-resume playback when returning from background or tab switch
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (desktopVideo && desktopVideo.paused) startPlayback(desktopVideo);
        if (mobileVideo && mobileVideo.paused) startPlayback(mobileVideo);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [src, mobileSrc, startPlayback]);

  // Seamless looping recovery to maintain continuous animation feel
  const handleEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Desktop Background Video (Visible on md screens and larger) */}
      <video
        ref={desktopVideoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={() => setIsDesktopLoaded(true)}
        onCanPlay={(e) => startPlayback(e.currentTarget)}
        onEnded={handleEnded}
        className={`${
          mobileSrc ? "hidden md:block" : "block"
        } w-full h-full object-cover object-center transition-opacity duration-700 ${
          isDesktopLoaded ? "opacity-100" : "opacity-90"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Mobile Animated Background Video (Visible on mobile/tablet viewports) */}
      {mobileSrc && (
        <video
          ref={mobileVideoRef}
          src={mobileSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onLoadedData={() => setIsMobileLoaded(true)}
          onCanPlay={(e) => startPlayback(e.currentTarget)}
          onEnded={handleEnded}
          className={`block md:hidden w-full h-full object-cover object-center transition-opacity duration-700 ${
            isMobileLoaded ? "opacity-100" : "opacity-90"
          }`}
        >
          <source src={mobileSrc} type="video/mp4" />
        </video>
      )}

      {/* Subtle ambient showroom tint */}
      <div className="absolute inset-0 bg-black/[0.04] pointer-events-none" />
    </div>
  );
}
