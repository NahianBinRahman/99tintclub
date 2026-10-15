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
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isDesktopReady, setIsDesktopReady] = useState(false);
  const [isMobileReady, setIsMobileReady] = useState(false);

  // Configure video element with strict iOS Safari and Android autoplay properties
  const configureAndPlay = useCallback((video: HTMLVideoElement | null) => {
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
      playPromise.catch(() => {
        // Autoplay may be restricted until first touch (e.g. iOS Low Power Mode)
      });
    }
  }, []);

  // Synchronous ref callback to set muted attributes before initial paint
  const setDesktopRef = useCallback(
    (el: HTMLVideoElement | null) => {
      desktopVideoRef.current = el;
      if (el) configureAndPlay(el);
    },
    [configureAndPlay]
  );

  const setMobileRef = useCallback(
    (el: HTMLVideoElement | null) => {
      mobileVideoRef.current = el;
      if (el) configureAndPlay(el);
    },
    [configureAndPlay]
  );

  useEffect(() => {
    // Attempt playback immediately on mount
    configureAndPlay(desktopVideoRef.current);
    configureAndPlay(mobileVideoRef.current);

    // Global interaction listeners to kick-start playback if restricted by iOS Low Power Mode
    const handleInteraction = () => {
      const mobileVideo = mobileVideoRef.current;
      if (mobileVideo && mobileVideo.paused) {
        mobileVideo.muted = true;
        mobileVideo.play().catch(() => {});
      }
      const desktopVideo = desktopVideoRef.current;
      if (desktopVideo && desktopVideo.paused) {
        desktopVideo.muted = true;
        desktopVideo.play().catch(() => {});
      }
    };

    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("touchend", handleInteraction, { passive: true });
    window.addEventListener("touchmove", handleInteraction, { passive: true });
    window.addEventListener("pointerdown", handleInteraction, { passive: true });
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction, { passive: true });

    // Auto-resume playback when returning from background or tab switch
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

  // Handle loop seamlessly to behave like an animated motion graphic
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
      {/* Background Poster Container (Behind video tag to avoid iOS WebKit native play button stamp) */}
      {poster && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center -z-10 transition-opacity duration-1000"
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
        onLoadedData={() => setIsDesktopReady(true)}
        onCanPlay={(e) => configureAndPlay(e.currentTarget)}
        onEnded={handleLoop}
        className={`${
          mobileSrc ? "hidden md:block" : "block"
        } w-full h-full object-cover object-center transition-opacity duration-700 ${
          isDesktopReady ? "opacity-100" : "opacity-95"
        }`}
      />

      {/* Mobile Animated Background Video (Strictly no poster attribute on tag to prevent iOS play icon) */}
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
          onLoadedData={() => setIsMobileReady(true)}
          onCanPlay={(e) => configureAndPlay(e.currentTarget)}
          onEnded={handleLoop}
          className={`block md:hidden w-full h-full object-cover object-center transition-opacity duration-700 ${
            isMobileReady ? "opacity-100" : "opacity-95"
          }`}
        />
      )}

      {/* Ultra-subtle ambient contrast */}
      <div className="absolute inset-0 bg-black/[0.04] pointer-events-none" />
    </div>
  );
}
