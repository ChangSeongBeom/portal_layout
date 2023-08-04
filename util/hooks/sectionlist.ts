import initialData from "@/app/protected/trello/data";
import { useState, useEffect } from "react";
import {
  CreateSectionDTO,
  LayoutItem,
  Section as Section,
  SectionInfo,
  UpdateSectionDTO,
} from "types/section";

export default function useSectionList() {
  const [isLoading, setIsLoading] = useState(true);
  const [sectionList, setSectionList] = useState([] as SectionInfo[]);

  // Fetch initial data
  useEffect(() => {
    fetchSectionAll().then(() => setIsLoading(false));
  }, []);

  async function fetchSectionAll() {
    try {
      const response = await fetch("/api/section", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: SectionInfo[] = await response.json();
      console.log("initial fetch section list", data);
      if (data.length !== 0) {
        setSectionList(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    sectionList,
    setSectionList,
    isLoading,
  };
}
