import initialData from "@/app/protected/trello/data";
import { useState, useEffect } from "react";
import {
  CreateToDoCardDTO,
  CreateToDoListDTO,
  ToDoCard,
  ToDoList,
  UpdateToDoCardDTO,
} from "types/trello";

function useTodoBoard() {
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState([] as ToDoList[]);

  // Fetch initial data
  useEffect(() => {
    fetchBoard().then(() => setIsLoading(false));
  }, []);

  async function fetchBoard() {
    try {
      const response = await fetch("/api/trello", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: ToDoList[] = await response.json();
      console.log("initial fetch board", data);
      if (data.length !== 0) {
        setBoard(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function saveBoard() {
    console.log("saveBoard", board);
    try {
      await fetch("/api/trello", {
        method: "POST",
        //* 여기 바디를 다시 역변환해야함
        body: JSON.stringify(board),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function createToDoList(createToDoListDTO: CreateToDoListDTO) {
    try {
      const resp = await fetch(`/api/trello/todolist/${createToDoListDTO.id}`, {
        method: "POST",
        body: JSON.stringify(createToDoListDTO),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const toDoList: ToDoList = await resp.json();
      setBoard([...board, toDoList]);
    } catch (error) {
      console.log(error);
    }
  }

  // Delete a list
  async function deleteToDoList(listId) {
    const newBoard = (board as ToDoList[]).filter(
      (toDoList) => toDoList.id !== listId
    );
    setBoard(newBoard as ToDoList[]);
    try {
      const resp = await fetch(`/api/trello/todolist/${listId}`, {
        method: "DELETE",
        //* 여기 바디를 다시 역변환해야함
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function createToDoCard(createToDoCard: CreateToDoCardDTO) {
    try {
      const resp = await fetch(`/api/trello/todocard/${createToDoCard.id}`, {
        method: "POST",
        body: JSON.stringify(createToDoCard),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const toDoCard: ToDoCard = await resp.json();
      const newBoard = board.map((toDoList) => {
        if (toDoList.id === createToDoCard.listId) {
          toDoList.ToDoCards.push(toDoCard);
        }
        return toDoList;
      });
      setBoard(newBoard as ToDoList[]);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteToDoCard(listId, cardId) {
    const newBoard = (board as ToDoList[]).map((toDoList) => {
      if (toDoList.id === listId) {
        toDoList.ToDoCards = toDoList.ToDoCards.filter(
          (toDoCard) => toDoCard.id !== cardId
        );
      }
      return toDoList;
    });
    setBoard(newBoard as ToDoList[]);
    try {
      const resp = await fetch(`/api/trello/todocard/${cardId}`, {
        method: "DELETE",
        //* 여기 바디를 다시 역변환해야함
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function updateToDoCard(card: UpdateToDoCardDTO) {
    try {
      const resp = await fetch(`/api/trello/todocard/${card.id}`, {
        method: "PATCH",
        body: JSON.stringify(card),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    board,
    setBoard,
    isLoading,
    saveBoard,
    createToDoList,
    deleteToDoList,
    createToDoCard,
    deleteToDoCard,
    updateToDoCard,
  };
}

export default useTodoBoard;
