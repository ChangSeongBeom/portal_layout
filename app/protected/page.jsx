"use client";
import SignOut from "@/components/sign-out";
import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Grid from "../../components/Grid";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
// responsive grid 생성
const ResponsiveGridLayout = WidthProvider(Responsive);
export default function Home() {
  const router = useRouter();
  const sp = useSearchParams();
  const [state, setState] = useState({
    breakpoints: "lg",
    layouts: { lg: [] },
  });

  // grid-layout 변경 시 사용
  const onLayoutChange = (layout, layouts) => {
    console.log("layouts", layouts, layout);
    setState((state) => ({
      ...state,
      layouts: layouts,
    }));
  };

  // breakpoint 변경
  const onBreakPointChange = (breakpoint) => {
    console.log("breakpoint", breakpoint); // lg or md or sm or xs or xxs

    setState((state) => ({
      ...state,
      breakpoints: breakpoint,
    }));
  };

  useEffect(() => {
    console.log(sp.get("page"));
  }, []);
  return <></>;
}
