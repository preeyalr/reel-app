import { useEffect, useState } from "react";
import VideoCard from "./components/VideoCard";
import BottomNav from "./components/BottomNav";
import Login from "./screens/Login";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.pexels.com/videos/search?query=vertical&orientation=portrait&per_page=50",
          {
            headers: {
              Authorization: "nMhvmERQMbHy6qdvcD3Z06yrzyThoSIubP6CrOKoLnkhMyLrdFXibDnR" // 🔁 Replace with your real API key
            }
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        // Transform Pexels response to your data structure
        const mappedVideos = data.videos.map((video) => ({
          id: video.id,
          videoUrl: video.video_files.find(f => f.quality === "sd")?.link || video.video_files[0]?.link,
          title: video.user.name,
          description: video.url,
          userName: video.user.name,
          userImage: video.user.image || "https://randomuser.me/api/portraits/men/42.jpg",
          likes: Math.floor(Math.random() * 5000),
          comments: Math.floor(Math.random() * 1000),
          shares: Math.floor(Math.random() * 200),
          earnings: (Math.random() * 5).toFixed(1),
          isPaid: Math.random() > 0.5
        }));

        setVideos(mappedVideos);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black text-white text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center bg-black text-red-500 text-lg">
        Failed to load videos.
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white">
      {/* Video Feed */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        {videos.map((video) => (
          <VideoCard key={video.id} data={video} />
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default App;
