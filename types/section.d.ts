type SectionInfo = {
  id: string;
  name: string;
};

type Section = {
  id: string;
  name: string;
  LayoutItems: LayoutItem[];
};

type LayoutItem = {
  i: string;
  name: string;
  x: number;
  y: number;
  h: number;
  w: number;
  isResizable: boolean = false;
  isDraggable: boolean = false;
  static: boolean = false;
};

type UpdateSectionDTO = {
  id: string;
  name?: string;
  x?: number;
  y?: number;
};

type CreateSectionDTO = {
  id: string;
  name: string;
  LayoutItems: LayoutItem[];
};

export type {
  Section,
  SectionInfo,
  UpdateSectionDTO,
  CreateSectionDTO,
  LayoutItem,
};
