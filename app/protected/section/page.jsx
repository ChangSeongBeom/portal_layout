"use client";
import SignOut from "@/components/sign-out";
import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Grid from "../../../components/Grid";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import useSection from "util/hooks/section";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

// responsive grid 생성
const ResponsiveGridLayout = WidthProvider(Responsive);
export default function Home() {
  const searchParams = useSearchParams();
  const [sectionId, setSectionId] = useState(
    searchParams.get("sectionId") ?? ""
  );
  const [sectionName, setSectionName] = useState(
    searchParams.get("sectionName") ?? ""
  );
  const router = useRouter();
  const {
    layout,
    setLayOut,
    fetchSection,
    createSection,
    setDeletedLayoutIds,
  } = useSection();

  const [componentList, setComponentList] = useState([
    { name: "컴포넌트A", id: "A" },
    { name: "컴포넌트B", id: "B" },
    { name: "컴포넌트C", id: "C" },
    { name: "컴포넌트D", id: "D" },
    { name: "컴포넌트E", id: "E" },
  ]);
  const conponentListInit = [
    { name: "컴포넌트A", id: "A" },
    { name: "컴포넌트B", id: "B" },
    { name: "컴포넌트C", id: "C" },
    { name: "컴포넌트D", id: "D" },
    { name: "컴포넌트E", id: "E" },
  ];

  useEffect(() => {
    if (!sectionId) {
      setLayOut([]);
      return;
    }
    fetchSection(sectionId);
  }, [sectionId]);

  useEffect(() => {
    console.log("layout state 변경", layout);
    if (layout.length === 0 && componentList.length === 0) return;
    const existingComps = layout.map((layoutItem) => {
      return layoutItem.i.split(":")[0];
    });
    setComponentList(
      conponentListInit.filter((item) => !existingComps.includes(item.name))
    );
  }, [layout]);

  return (
    <div className="flex flex-col">
      <div className="flex items-stretch">
      
        <div className="relative w-[900px] ">
          <div className="relative w-[100px] h-[100px]">
            <div >
                <div >부문명</div>
                <input
                  className="ml-4 px-2 bg-gray-200"
                  value={sectionName}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSectionName(e.target.value);
                  }}
                />
              </div>
              
              
            </div>
          <Grid
            props={{
              layout: layout,
              setLayOut: setLayOut,
              setDeletedLayoutIds: setDeletedLayoutIds,
            }}
          />
        </div>
        <div className="ComponentList ml-50 mt-4 flex flex-col gap-6 items-center">
       
          <div className="ComponentList border border-black gap-y-3 p-6 mr-2 ml-20 w-[10rem] h-fit flex flex-col items-center rounded">
            {componentList.map((item) => {
              return (
                <button
                  key={crypto.randomUUID()}
                  onClick={() => {
                    console.log("컴포넌트 추가 : ", item.name);
                    const id = item.name + ":" + crypto.randomUUID();
                    setLayOut((prev) => [
                      ...prev,
                      {
                        i: id,
                        x: 0,
                        y: Infinity,
                        w: 2,
                        h: 2,
                        name: `new ${item.name}`,
                        isResizable: false,
                        isDraggable: false,
                        static: false,
                      },
                    ]);
                    setComponentList((prev) => {
                      return prev.filter((comp) => comp.id !== item.id);
                    });
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
