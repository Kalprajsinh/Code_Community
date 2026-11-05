"use client";

import { signIn, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-60 p-4 relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="w-full max-w-md backdrop-blur-md border border-[#333333] rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold text-blue-500 mb-2">Welcome to CoDev</h2>
        <p className="text-gray-400 text-sm mb-8">
          Sign in to access your workspaces, code templates, and collaboration tools
        </p>

        <div className="flex flex-col space-y-4 w-full">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white/20 text-white font-medium border border-gray-600 px-4 py-3 rounded-xl transition duration-200 shadow-sm"
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="Google Icon"
              className="w-6 h-6 object-contain"
            />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => signIn("github")}
            className="flex items-center justify-center gap-3 w-full bg-[#24292e] hover:bg-[#2f363d] text-white font-medium border border-gray-700 px-4 py-3 rounded-xl transition duration-200 shadow-sm"
          >
            <FaGithub className="text-2xl text-white" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
