"use client";
import React, { useState, useEffect } from "react";
import List from "./List";
import initialData from "./data";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Image from "next/image";
import useTodoBoard from "util/hooks/todoBoard";
import "./styles.css";

const Container = styled.div`
  display: flex;
  padding: 20px;
  overflow: auto;
`;
const Nav = styled.nav`
  display: flex;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 10px;
  justify-content: space-between;
  background-color: #4682a9;
  padding: 30px;
  border-radius: 10px;
`;

const BrandName = styled.h1`
  align-self: center;
  color: white;
  font-size: 22px;
`;

const AddListContainer = styled.div`
  align-self: center;
  padding-left: 30px;
  display: flex;
  gap: 20px;
`;

const AddListButton = styled.button`
  padding: 8px 16px 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: #0390fc;
    color: white;
  }
`;

const AddTodoInput = styled.input``;

export default function Trello() {
  //   const [board, setBoard] = useState(intialState);
  const {
    board,
    setBoard,
    isLoading,
    saveBoard,
    createToDoList,
    deleteToDoList,
    createToDoCard,
    deleteToDoCard,
    updateToDoCard,
  } = useTodoBoard();
  // 새 리스트 생성 버튼이 클릭되면 toggleInput state 로 상태 관리
  const [toggleInput, setToggleInput] = useState(false);
  // 새 리스트 생성시 리스트 이름을 담는 state
  const [listName, setListName] = useState("");

  useEffect(() => {
    console.log("board changed ", board);
  }, [board]);

  // Handle darg and drop
  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      // droppableId 는 todoList 의 id 를 의미한다.
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = board.filter((list) => list.id === source.droppableId)[0];
    const finish = board.filter(
      (list) => list.id === destination.droppableId
    )[0];

    // 같은 리스트 내 이동
    if (start === finish) {
      setBoard(
        board.map((list) => {
          if (list.id === destination.droppableId) {
            list.ToDoCards = list.ToDoCards.map((card, index) => {
              if (index === source.index) {
                card.order = destination.index;
              } else if (index > source.index) {
                card.order = index - 1;
              } else if (index >= destination.index) {
                card.order = index + 1;
              }
              return card;
            });
            list.ToDoCards.sort((a, b) => a.order - b.order);
            list.ToDoCards.forEach((card, index) => {
              updateToDoCard({ id: card.id, order: index });
            });
          }
          return list;
        })
      );
      return;
    }
    const movedCard = start.ToDoCards.splice(source.index, 1)[0];
    movedCard.listId = destination.droppableId;
    finish.ToDoCards = finish.ToDoCards.map((card, index) => {
      if (index >= destination.index) {
        card.order = index + 1;
      }
      return card;
    });
    finish.ToDoCards.splice(destination.index, 0, movedCard);

    setBoard(
      board.map((list) => {
        if (list.id === destination.droppableId) {
          list.ToDoCards.forEach((card, index) => {
            updateToDoCard({ id: card.id, order: index, listId: list.id });
          });
          return finish;
        } else if (list.id === source.droppableId) {
          return start;
        }
        return list;
      })
    );

    return;
  }
  // Handle Key press function
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addList(listName);
      setListName("");
      setToggleInput(false);
    }
  }

  // Adds a list
  function addList(listName) {
    if (listName) {
      const newList = {
        id: crypto.randomUUID(),
        title: listName,
      };
      createToDoList(newList);
    }
  }

  // Add a card
  function addCard(listId, cardDetails) {
    console.log("addcard board", board);
    const cards = board.filter((list) => list.id === listId)[0].ToDoCards;
    const newCard = {
      id: crypto.randomUUID(),
      title: cardDetails.title,
      description: cardDetails.description,
      listId: listId,
      order: cards[cards.length - 1] ? cards[cards.length - 1].order + 1 : 0,
    };
    createToDoCard(newCard);
  }

  return (
    <div>
      <Nav>
        <BrandName className="nav-title">할일 목록 관리</BrandName>
        <AddListContainer>
          <AddListButton
            className="add-list-btn"
            placeholder=""
            onClick={() => setToggleInput(!toggleInput)}
          >
            {toggleInput ? "취소" : "목록 추가"}
          </AddListButton>
          {toggleInput ? (
            <AddTodoInput
              autoFocus
              type="text"
              onChange={(e) => setListName(e.target.value)}
              value={listName}
              onKeyPress={handleKeyPress}
            />
          ) : null}
          {toggleInput ? (
            <AddListButton
              className="add-list-btn"
              onClick={() => handleKeyPress({ key: "Enter" })}
            >
              확인
            </AddListButton>
          ) : null}
        </AddListContainer>
      </Nav>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          {board.length == 0 ? (
            <Image
              src="/image.svg"
              alt="home"
              width={400}
              height={400}
              className="ml-[40px]"
            />
          ) : null}
          <Container>
            {board.map((toDoList) => {
              console.log(toDoList);
              return (
                <List
                  key={toDoList.id}
                  list={toDoList}
                  cards={toDoList.ToDoCards}
                  deleteList={deleteToDoList}
                  addCard={addCard}
                  deleteCard={deleteToDoCard}
                />
              );
            })}
          </Container>
        </DragDropContext>
      )}
      {/* <p className="Debug">{JSON.stringify(board)}</p> */}
    </div>
  );
}
