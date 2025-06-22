// src/components/BottomNav.jsx

import { FiHome, FiPlusSquare, FiSearch } from "react-icons/fi";
import { BsPersonCircle, BsYoutube } from "react-icons/bs";

function BottomNav() {
  return (
   
    <div className="fixed bottom-0 w-full flex justify-between px-6 py-2 bg-black text-white text-xl md:text-2xl lg:text-3xl">
    
      <div className="flex flex-col items-center hover:text-pink-400 transition">
        <FiHome size={24} />
        <span className="text-xs">Home</span>
      </div>
      <div className="flex flex-col items-center hover:text-pink-400 transition">
        <BsYoutube size={24} />
        <span className="text-xs">Shorts</span>
      </div>
      <div className="flex flex-col items-center hover:text-pink-400 transition">
        <FiPlusSquare size={24} />
        <span className="text-xs">Add</span>
      </div>
      <div className="flex flex-col items-center hover:text-pink-400 transition">
        <FiSearch size={24} />
        <span className="text-xs">Search</span>
      </div>
      <div className="flex flex-col items-center hover:text-pink-400 transition">
        <BsPersonCircle size={24} />
        <span className="text-xs">Profile</span>
      </div>
    </div>
  );
}

export default BottomNav;
