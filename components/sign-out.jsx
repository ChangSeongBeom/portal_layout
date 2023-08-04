"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOut() {
  return (
    <button
      className="text-stone-400 hover:text-stone-200 transition-all"
      onClick={() => signOut()}
    >
      로그아웃
    </button>
  );
}
