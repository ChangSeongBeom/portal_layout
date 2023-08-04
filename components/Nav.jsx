"use client";

import SignOut from "./sign-out";

export default function Nav() {
  return (
    <div className="fixed top-0 w-screen">
      <div className="flex justify-between">
        <div className="Logo text-4xl ml-20 mt-5">관리자페이지</div>
        <SignOut />
      </div>
    </div>
  );
}
