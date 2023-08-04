import Image from "next/image";
import Form from "@/components/form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h1 className="text-4xl">{"관리자페이지"}</h1>
          <h3 className="text-xl font-semibold">회원가입</h3>
          <p className="text-lg text-gray-500">
            관리자페이지 에 회원가입 합니다.
          </p>
        </div>
        <Form type="register" />
      </div>
    </div>
  );
}
