// src/hooks/useInViewVideo.js
import { useEffect } from "react";

export default function useInViewVideo(videoRef, setIsPlaying) {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }, { threshold: 0.6 });

    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [videoRef, setIsPlaying]);
}
