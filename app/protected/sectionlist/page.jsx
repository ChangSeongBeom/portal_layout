"use client";
import SignOut from "@/components/sign-out";
import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Grid from "../../../components/Grid";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import toast from "react-hot-toast";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const PortalLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 102%;
  padding: 22px;
  margin-top: 7px;
  margin-left: 1px;
  margin-right: 5px;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  margin-left: 5px;
  margin-right: 22px;
  margin-top: 0;
  height: 100px;
  background-color: #4682a9;
`;

const H1Link = styled.h1`
  font-size: 22px;
  display: flex;
  align-items: center;
`;

const RegisterPortal = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  margin-top: 0px;
  text-decoration: none;
  color: black;
  background-color: white;
  font-weight: bold;
`;

const PortalList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.25rem;
`;

// const PortalListId = styled.li`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 1rem;
// `;

// const PortalParagraph = styled.p`
//   flex: 1;
//   border: 1px solid black;
//   text-align: center;
//   font-size: 1.25rem;
//   padding: 0.5rem 0;
//   border-radius:20px;
// `;

const PortalLink = styled.a`
  display: inline-block;
  border: 1px solid black;
  padding: 0.5rem 1rem;
  margin-left: 10px;
  text-decoration: none;
  color: black;
  border-radius: 20px;
  margin-right: 0x;
`;
import useSection from "util/hooks/section";
import useSectionList from "util/hooks/sectionlist";

export default function SectionList() {

  const { sectionList, deleteSection } = useSectionList();
  return (
    <PortalLayoutContainer>
      <StyledContainer>
        <H1Link>부문별 포털 레이아웃 정보</H1Link>
        <RegisterPortal href="/protected/section">레이아웃 추가</RegisterPortal>
      </StyledContainer>
      <PortalList>
        {/* {sectionList.map((item) => (
          <PortalListId key={item.id}>
            <PortalParagraph>{item.name}</PortalParagraph>
            <PortalLink href={`/protected/section?sectionId=${item.id}&sectionName=${item.name}`}>
              확인
            </PortalLink>
          </PortalListId>
        ))} */}
      </PortalList>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} style={{ width: "93%" }}>
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a compact table"
          >
            <TableHead>
              <TableRow>
                <TableCell >포탈 레이아웃 리스트</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sectionList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Button
                      size="small"
                      href={`/protected/section?sectionId=${row.id}&sectionName=${row.name}`}
                    >
                      확인
                    </Button>
                    <Button
                      size="small"
                      color="warning"
                      onClick={() => {
                        deleteSection(row.id).then(() => {
                          toast.success(`${row.name} 삭제 완료`);
                        });
                      }}
                    >
                      삭제
                    </Button>
                  </TableCell>
                  {/* <TableCell component="th" scope="row">
                <PortalLink href={`/protected/section?sectionId=${row.id}&sectionName=${row.name}`}/>
                </TableCell> */}
                  {/* <PortalLink href={`/protected/section?sectionId=${row.id}&sectionName=${row.name}`}></PortalLink> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </PortalLayoutContainer>
  );
}
