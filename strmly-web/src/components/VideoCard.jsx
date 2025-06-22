import { useRef, useEffect, useState } from "react";
import useInView from "../hooks/useInView";
function VideoCard({ data }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
const [isFollowing, setIsFollowing] = useState(false);
const [likes, setLikes] = useState(data.likes);
const [liked, setLiked] = useState(false);
  useInView(videoRef, setIsPlaying);
const handleLike = () => {
  if (liked) return; // prevent double likes
  setLiked(true);
  setLikes((prev) => prev + 1);
   setTimeout(() => {
    const simulateFail = Math.random() < 0.2;
    if (simulateFail) {
      setLiked(false);
      setLikes((prev) => prev - 1);
      alert("Like failed, please try again");
    }
  }, 1000);
};
  // Play/pause depending on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  // Toggle play/pause on single click
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };


  // Toggle mute on double click
  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative h-screen w-full snap-start">
      <video
        ref={videoRef}
        src={data.videoUrl}
        className="object-cover h-full w-full"
        muted={isMuted}
        autoPlay
        loop
        playsInline
        onClick={togglePlayPause}
        onDoubleClick={toggleMute}
      />

      {/* Left Overlay */}
    {/* Left Overlay with Follow Button */}
<div className="absolute bottom-20 left-4 text-white space-y-1 max-w-xs">
  <p className="font-bold text-lg">#{data.title}</p>

  {/* Creator Name + Follow Button */}
  <div className="flex items-center space-x-2">
    <p className="text-sm font-medium">@{data.userName}</p>
    <button
      onClick={() => setIsFollowing((prev) => !prev)}
      className={`text-xs px-3 py-1 rounded-full font-semibold transition ${
        isFollowing
          ? "bg-gray-700 text-white border border-white"
          : "bg-white text-black"
      }`}
    >
      {isFollowing ? "Following ✓" : "Follow"}
    </button>
  </div>

  <p className="line-clamp-3 text-sm">{data.description}</p>
</div>


      {/* Right Overlay */}
      <div className="absolute bottom-20 right-4 text-white flex flex-col items-center space-y-4 text-sm">
      <div onClick={handleLike} className="cursor-pointer">
  ❤️
  <p>{(likes / 1000).toFixed(1)}K</p>
</div>
        <div className="text-center">
          💬
          <p>{(data.comments / 1000).toFixed(1)}K</p>
        </div>
        <div className="text-center">
          🔗
          <p>{data.shares}</p>
        </div>
        <div className="text-center">
          💰
          <p>₹{data.earnings}K</p>
        </div>
        <div className="text-center text-2xl">⋮</div>
      </div>
    </div>
  );
}

export default VideoCard;
