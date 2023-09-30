"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleJoinClick = () => {
    if (username === "") alert("Please input your name!");
    else router.push("/chat");
  };

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            What is your name?
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 active:scale-95 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleJoinClick}
            k
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
