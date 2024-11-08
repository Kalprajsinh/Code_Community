"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if user info is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Set user data from session if available
    if (session?.user) {
      setUser({
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || ""
      });
    }
  }, [session]);

  const handleSignOut = () => {
    // Clear localStorage on sign out
    localStorage.removeItem("user");
    signOut();
  };

  return (
    <div className="h-24 flex justify-end items-center w-full">
      <div className="flex justify-center items-center gap-2 mr-4 text-sm">
        {!user ? (
          <>
            <button
              className="w-20 h-10 p-2 text-[#7DD2FB] text-sm"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="w-20 h-10 border p-2 bg-[#7DD2FB] rounded-full text-black text-xs"
              onClick={() => router.push("/signup")}
            >
              SignUp
            </button>
          </>
        ) : (
          // If user is authenticated, display user info and sign out button
          <div className="flex items-center gap-3">
            <img
              src={user.image || "user.png"}
              className="w-8 h-8 rounded-full mt-1 lg:mt-0"
            />
            <div className="hidden lg:block">
              <div className="flex flex-col">
                <span className="text-sky-200">{user.name}</span>
                <span className="text-sky-200 text-sm">{user.email}</span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
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
