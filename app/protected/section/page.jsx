"use client";
import SignOut from "@/components/sign-out";
import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Grid from "../../../components/Grid";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import useSection from "util/hooks/section";

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


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
        <div className=" w-[100px] h-[100px] flex flex-row">  
                
        <Box
          component="form"
          sx={{ '& > :not(style)': { 
            m: 1, 
            width: '25ch',
            marginTop: '30px', // Set the margin-top value
            marginLeft: '30px' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="부문명"
            variant="outlined"
            value={sectionName}
            onChange={(e) => {
              console.log(e.target.value);
              setSectionName(e.target.value);
            }}
          />
    
        </Box>     
                
              
        <div>
            <Stack spacing={2} direction="row">
              <Button variant="outlined"
                      size="small"
                      style={{ width: '150px', height: '30px',marginLeft: '7px', marginTop: '40px' }} // Add margin-left and margin-top styles

                onClick={() => {
                //* 여기서 sectionId 값 """
                var id = "";
                if (!sectionId) {
                  id = crypto.randomUUID();
                } else {
                  id = sectionId;
                }
                createSection({
                  id: id,
                  name: sectionName,
                  LayoutItems: layout,
                }).then(() => {
                  router.push("/protected/sectionlist");
                });
              }}>저장하기</Button>
            </Stack>
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
      
      </div>
    </div>
  );
}
