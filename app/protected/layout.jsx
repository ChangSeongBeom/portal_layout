// These styles apply to every route in the application
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Nav from "@/components/Nav";
import SignOut from "@/components/sign-out";
import Link from "next/link";

export default async function ToDoLayout({ children }) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Nav />
      <div className="flex-1 flex mt-[90px]">
        <div className="Templates bg-white-50 w-[15rem] flex justify-center border-t border-navy-700 border-3">
          <ul className="flex flex-col mt-4 gap-4">
            <li className="mx-auto">
              <Link href={"/protected/sectionlist"}>포탈 리스트</Link>
            </li>
            <li className="mx-auto">
              <Link href={"/protected/trello"}>나의 할일 관리</Link>
            </li>
            {/* <li className="mx-auto">
              <Link href={"/protected/none"}>MY TESTPAGE3</Link>
            </li> */}
          </ul>
        </div>
        <div className="Contents flex-1 border-t border-navy-700 border-2">
          {children}
        </div>
      </div>
    </div>
  );
}
