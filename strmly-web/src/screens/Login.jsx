// src/screens/Login.jsx
import { useState, useEffect } from "react";

function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      window.location.href = "/";
    }
  }, []);

  const handleLogin = () => {
    if (userID.trim() && password.trim()) {
      localStorage.setItem("userID", userID);
      window.location.href = "/";
    } else {
      alert("Please enter both User ID and Password");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-3xl font-bold mb-6">Login to STRMLY</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
        className="mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 w-full max-w-sm"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-6 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 w-full max-w-sm"
      />
      <button
        onClick={handleLogin}
        className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
