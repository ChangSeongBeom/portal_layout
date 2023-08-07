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
import Paper from '@mui/material/Paper';



const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

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
    { name: "정규학습", id: "A" },
    { name: "상시학습", id: "B" },
    { name: "커뮤니티", id: "C" },
    { name: "인증", id: "D" },
    { name: "사외교육", id: "E" },
  ]);
  const conponentListInit = [
    { name: "정규학습", id: "A" },
    { name: "상시학습", id: "B" },
    { name: "커뮤니티", id: "C" },
    { name: "인증", id: "D" },
    { name: "사외교육", id: "E" },
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
      <div className="flex items-stretch flex-col">
      
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
        <div className="ComponentList ml-50 mt-4 flex flex-col gap-6 items-center">
        
        <div
              className="ComponentList border border-black p-6 mr-2 ml-0 w-[15rem]   flex flex-col items-center rounded"
              style={{ backgroundColor: 'white', color: 'black' }}
            >
              <Div>{"클릭하여 포탈 레이아웃 생성"}</Div>
              {componentList.map((item) => {
              return (
                <Button
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
                        w: 6,
                        h: 8,
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
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}



