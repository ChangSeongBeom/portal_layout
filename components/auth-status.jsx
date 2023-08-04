"use client";
import { getSession, useSession } from "next-auth/react";

//* 콜백 응답이 여기로 온다.
export default function AuthStatus() {
  const { update, data, status } = useSession();

  console.log("client session");
  console.log(data, status);

  return (
    <div className="absolute top-5 w-full flex justify-center items-center">
      {data && (
        <p className="text-stone-700 text-sm">Signed in as {data?.user?.id}</p>
      )}
    </div>
  );
}
