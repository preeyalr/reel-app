import { useState } from "react";
import PropTypes from "prop-types";

function OverlayLeft({ data }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => setIsFollowing(prev => !prev);

  return (
    <div className="text-white space-y-2 max-w-xs">
      {/* Hashtag */}
      <p className="text-sm font-semibold">#{data.title}</p>

      {/* Creator name + Follow button */}
      <div className="flex items-center space-x-2">
        <span className="font-bold">@{data.userName}</span>
        <button
          onClick={toggleFollow}
          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
            isFollowing
              ? "bg-gray-700 text-white border border-white"
              : "bg-white text-black"
          }`}
        >
          {isFollowing ? "Following ✓" : "Follow"}
        </button>
      </div>

      {/* Description */}
      <p className="text-xs line-clamp-3 text-gray-200">{data.description}</p>
    </div>
  );
}
OverlayLeft.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default OverlayLeft;

