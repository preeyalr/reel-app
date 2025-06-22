import {
  FaHeart,
  FaCommentDots,
  FaShare,
  FaMoneyBill,
  FaEllipsisV,
} from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function OverlayRight({ data }) {
  const [showHeart, setShowHeart] = useState(false);

  const handleLike = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000); // hide after 1s
  };

  return (
    <div className="text-white flex flex-col items-center space-y-5 text-sm relative">

      {/* Profile Image (top) */}
      <img
        src={data.userImage || "/avatars/default.png"}
        alt="profile"
        className="w-12 h-12 rounded-full border-2 border-white object-cover"
      />

      {/* Like with floating heart */}
      <div onClick={handleLike}>
        <IconBlock icon={<FaHeart size={24} />} label={(data.likes / 1000).toFixed(1) + "K"} />
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -40 }}
              exit={{ opacity: 0, y: -60 }}
              className="absolute text-red-500"
            >
              ❤️
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Other Icons */}
      <IconBlock icon={<FaCommentDots size={24} />} label={(data.comments / 1000).toFixed(1) + "K"} />
      <IconBlock icon={<FaShare size={24} />} label={data.shares} />
      <IconBlock icon={<FaMoneyBill size={24} />} label={`₹${data.earnings}K`} />
      <IconBlock icon={<FaEllipsisV size={24} />} />

      {/* Rotating Album Art */}
      <motion.img
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        src="/icons/album-art.png"
        alt="album"
        className="w-12 h-12 rounded-full mt-4 border-2 border-white object-cover"
      />
    </div>
  );
}

function IconBlock({ icon, label }) {
  return (
    <div className="flex flex-col items-center text-white hover:scale-110 transition-transform cursor-pointer">
      <div className="bg-black bg-opacity-50 p-2 rounded-full shadow-lg">
        {icon}
      </div>
      {label && <p className="text-xs mt-1">{label}</p>}
    </div>
  );
}

export default OverlayRight;
