// src/screens/MainApp.jsx
import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import BottomNav from "../components/BottomNav";

function MainApp() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://api.pexels.com/videos/search?query=vertical&orientation=portrait&per_page=50")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch videos");
          return res.json();
        })
        .then((data) => {
          setVideos(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, 1000);
  }, []);

  if (loading) return <div className="text-white h-screen flex items-center justify-center bg-black">Loading...</div>;
  if (error) return <div className="text-red-500 h-screen flex items-center justify-center bg-black">{error}</div>;

  return (
    <div className="relative">
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        {videos.map((video) => (
          <VideoCard key={video.id} data={video} />
        ))}
      </div>
      <BottomNav />
    </div>
  );
}

export default MainApp;
