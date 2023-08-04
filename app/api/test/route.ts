import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]/route";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { ToDoList } from "types/trello";

export async function GET(req: NextRequest, res: NextResponse) {
    console.log("ㅅㄷㄴㅅㄷㄴㅅㄷㄴㅅ");
  
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("requesting se", session.sub);
  
   
    // const lists = {};
    // const cards = {};
    // for (const list of board) {
    //   list["cardIds"] = list.ToDoCards.map((card) => card.id);
    //   for (const card of list.ToDoCards) {
    //     cards[card.id] = card;
    //   }
    //   console.log("list before delete ToDoCards", list);
    //   delete list["ToDoCards"];
    //   console.log("list after delete ToDoCards", list);
    //   lists[list.id] = list;
    // }
    // console.log({
    //   cards: cards,
    //   lists: lists,
    //   listOrder: board.map((list) => list.id),
    // });
  
 
  }
  