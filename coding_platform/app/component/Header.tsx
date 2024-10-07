"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCode } from "react-icons/fa";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="h-24 flex justify-between items-center w-full">
      <div className="flex justify-center items-center gap-1 ml-4 text-2xl">
        <FaCode /> CoDev
      </div>
      <div className="flex justify-center items-center gap-2 mr-4 text-xl">
        {!session?.user ? (
          <>
            <button
              className="w-20 h-10 p-2 text-textcolor text-sm"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="w-20 h-10 border p-2 bg-textcolor rounded-full text-black text-sm"
              onClick={() => {
                router.push("/signup");
              }}
            >
              SignUp
            </button>
          </>
        ) : (
          // If user is authenticated, display user info and sign out button
          <div className="flex items-center gap-4">
            <img
              src={session.user.image ?? "/default-avatar.png"} // Fallback to default avatar
              width={32} // Adjust size as needed
              height={32}
              className="rounded-full"
              alt="User profile"
            />
            <div className="flex flex-col">
              <span className="text-sky-600">{session.user.name}</span>
              <span className="text-sky-600 text-sm">{session.user.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="w-20 h-10 p-2 text-textcolor text-lg hover:text-white transition"
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
