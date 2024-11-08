// pages/login.tsx

"use client";

import { signIn,useSession } from "next-auth/react";
import { FaApple, FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  if (session && session.user) {
    console.log(session)
    router.push("/");
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post("/api/login", { email, password });
        if (response.status === 201) {
            localStorage.setItem("user", JSON.stringify({ email }));  
            router.push("/");  
        }
    } catch (error) {
        console.error("Login failed:", error);
    }
};



  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black bg-opacity-60">
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="flex-1 flex flex-col justify-center items-center p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Login to CoDev</h2>
        <form className="w-full max-w-md" onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-100 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-100 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Right Side: Social Authentication */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Or continue with</h2>
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg hover:text-sky-400 transition duration-200"
          >
            <img
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="Google Icon"
          className="w-8 h-8"
        />
            Continue with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg hover:text-sky-400 transition duration-200"
          >
            <FaGithub className="mr-2 text-xl text-white" />
            Continue with GitHub
          </button>
          <button
            onClick={() => signIn("apple")}
            className="flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg hover:text-sky-400 transition duration-200"
          >
            <FaApple className="mr-2 text-xl text-white" />
            Continue with Apple
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg hover:text-sky-400 transition duration-200"
          >
            <FaFacebook className="mr-2 text-xl text-white" />
            Continue with Apple
          </button>
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
