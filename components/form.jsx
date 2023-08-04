"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form({ type }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            id: e.currentTarget.userId.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              toast.error(error);
            } else {
              router.refresh();
              router.push("/protected");
            }
          });
        } else {
          fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: e.currentTarget.userId.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              toast.success("회원가입을 성공하였습니다.");
              setTimeout(() => {
                router.push("/");
              }, 2000);
            } else {
              const { error } = await res.json();
              toast.error(error);
            }
          });
        }
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label htmlFor="id" className="block text-lg text-gray-600 uppercase">
          ID
        </label>
        <input
          id="userId"
          name="id"
          type="id"
          placeholder="아이디를 입력해주세요"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-lg text-xl"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-lg text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-lg text-xl"
        />
      </div>
      {type === "register" ? (
        <div>
          <label
            htmlFor="password2"
            className="block text-lg text-gray-600 uppercase"
          >
            Password 확인
          </label>
          <input
            id="password2"
            name="password2"
            type="password"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-lg text-xl"
          />
        </div>
      ) : (
        <></>
      )}
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
        )}
      </button>
      {type === "login" ? (
        <p className="text-center text-lg text-gray-600">
          아직 계정이 없으신가요?{" "}
          <Link href="/register" className="font-semibold text-gray-800">
            회원가입하러 가기
          </Link>{" "}
        </p>
      ) : (
        <p className="text-center text-lg text-gray-600">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-semibold text-gray-800">
            로그인하러 가기
          </Link>{" "}
        </p>
      )}
    </form>
  );
}
