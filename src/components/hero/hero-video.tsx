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
  poster = "/images/car-preview.jpg",
  className = "",
}: HeroVideoProps) {
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isDesktopPlaying, setIsDesktopPlaying] = useState(false);
  const [isMobilePlaying, setIsMobilePlaying] = useState(false);

  // Configure video element with strict iOS Safari and Android autoplay properties
  const configureAndPlay = useCallback((video: HTMLVideoElement | null, isMobile = false) => {
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (isMobile) setIsMobilePlaying(true);
          else setIsDesktopPlaying(true);
        })
        .catch(() => {
          // Autoplay restricted (e.g. iOS Low Power Mode).
          // Keep video element opacity 0 so iOS native play button is NOT visible!
        });
    }
  }, []);

  // Synchronous ref callback to set muted attributes before initial paint
  const setDesktopRef = useCallback(
    (el: HTMLVideoElement | null) => {
      desktopVideoRef.current = el;
      if (el) configureAndPlay(el, false);
    },
    [configureAndPlay]
  );

  const setMobileRef = useCallback(
    (el: HTMLVideoElement | null) => {
      mobileVideoRef.current = el;
      if (el) configureAndPlay(el, true);
    },
    [configureAndPlay]
  );

  useEffect(() => {
    configureAndPlay(desktopVideoRef.current, false);
    configureAndPlay(mobileVideoRef.current, true);

    // Global interaction listeners to kick-start playback if restricted by iOS Low Power Mode
    const handleInteraction = () => {
      const mobileVideo = mobileVideoRef.current;
      if (mobileVideo) {
        mobileVideo.muted = true;
        mobileVideo
          .play()
          .then(() => setIsMobilePlaying(true))
          .catch(() => {});
      }
      const desktopVideo = desktopVideoRef.current;
      if (desktopVideo) {
        desktopVideo.muted = true;
        desktopVideo
          .play()
          .then(() => setIsDesktopPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("touchend", handleInteraction, { passive: true });
    window.addEventListener("touchmove", handleInteraction, { passive: true });
    window.addEventListener("pointerdown", handleInteraction, { passive: true });
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction, { passive: true });

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleInteraction();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("touchend", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [configureAndPlay]);

  const handleLoop = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Background Poster Container (High-res studio car preview always crisp and clean) */}
      {poster && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {/* Desktop Background Video */}
      <video
        ref={setDesktopRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        onPlaying={() => setIsDesktopPlaying(true)}
        onTimeUpdate={() => {
          if (!isDesktopPlaying) setIsDesktopPlaying(true);
        }}
        onEnded={handleLoop}
        className={`${
          mobileSrc ? "hidden md:block" : "block"
        } w-full h-full object-cover object-center transition-opacity duration-700 ${
          isDesktopPlaying ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Mobile Animated Background Video:
          Keeps opacity-0 until playback actually starts so iOS Low Power Mode CANNOT stamp the native play icon over the car */}
      {mobileSrc && (
        <video
          ref={setMobileRef}
          src={mobileSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setIsMobilePlaying(true)}
          onTimeUpdate={() => {
            if (!isMobilePlaying) setIsMobilePlaying(true);
          }}
          onEnded={handleLoop}
          className={`block md:hidden w-full h-full object-cover object-center transition-opacity duration-700 ${
            isMobilePlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* Ultra-subtle ambient contrast */}
      <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />
    </div>
  );
}
