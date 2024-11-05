"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCode } from "react-icons/fa";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="h-24 flex justify-end items-center w-full">
      <div className="flex justify-center items-center gap-2 mr-4 text-sm">
        {!session?.user ? (
          <>
            <button
              className="w-20 h-10 p-2 text-[#7DD2FB] text-sm"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="w-20 h-10 border p-2 bg-[#7DD2FB] rounded-full text-black text-xs"
              onClick={() => {
                router.push("/signup");
              }}
            >
              SignUp
            </button>
          </>
        ) : (
          // If user is authenticated, display user info and sign out button
          <div className="flex items-center gap-3">
            <img
              src={session.user.image ?? ""} // Fallback to default avatar
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden lg:block">
            <div className="flex flex-col">
              <span className="text-sky-200">{session.user.name}</span>
              <span className="text-sky-200 text-sm">{session.user.email}</span>
            </div>
            </div>
            <button
              onClick={() => signOut()}
              className="w-20 h-10 p-2 text-[#7DD2FB] text-lg hover:text-white transition underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
