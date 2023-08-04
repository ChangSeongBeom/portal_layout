import initialData from "@/app/protected/trello/data";
import { useState, useEffect } from "react";
import {
  CreateSectionDTO,
  LayoutItem,
  Section as Section,
  UpdateSectionDTO,
} from "types/section";

export default function useSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [section, setSection] = useState<Section>();
  const [layout, setLayOut] = useState([] as LayoutItem[]);
  const [deletedLayoutIds, setDeletedLayoutIds] = useState([] as string[]);

  async function fetchSection(sectionId) {
    try {
      const response = await fetch(`/api/section/${sectionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: Section = await response.json();
      console.log("initial fetch section", data);
      setSection(data);
      setLayOut(
        data.LayoutItems.map((item) => {
          item.isDraggable = false;
          item.isResizable = false;
          return item;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function createSection(newSectionDTO: CreateSectionDTO) {
    console.log(`/api/section/${newSectionDTO.id}`);

    console.log("deletedLayoutIds", deletedLayoutIds);

    deletedLayoutIds.forEach(async (deletedLayoutId) => {
      await deleteLayout(deletedLayoutId);
    });

    try {
      const resp = await fetch(`/api/section/${newSectionDTO.id}`, {
        method: "POST",
        body: JSON.stringify(newSectionDTO),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newSection: Section = await resp.json();
      console.log("newSection", newSection);
      // setSection(newSection);
      // setLayOut(newSection.LayoutItems);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLayout(layoutId) {
    try {
      const resp = await fetch(`/api/section/layout/${layoutId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteSection(sectionId) {
    // const newSectionList = (section as Section[]).filter(
    //   (toDoList) => toDoList.id !== sectionId
    // );
    // setSection(newSectionList as Section[]);
    try {
      const resp = await fetch(`/api/section/${sectionId}`, {
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

  async function updateSection(section: UpdateSectionDTO) {
    try {
      const resp = await fetch(`/api/section/${section.id}`, {
        method: "PATCH",
        body: JSON.stringify(section),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    section,
    setSection,
    isLoading,
    fetchSection,
    deleteSection,
    createSection,
    updateSection,
    layout,
    setLayOut,
    deletedLayoutIds,
    setDeletedLayoutIds,
  };
}
