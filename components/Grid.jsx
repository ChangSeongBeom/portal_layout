"use client";
import React, { use, useState } from "react";
import GridLayout from "react-grid-layout";

import "node_modules/react-grid-layout/css/styles.css";
import "node_modules/react-resizable/css/styles.css";
import "../styles/gridStyles.css";
import { Icon } from "@iconify/react";
import useSection from "util/hooks/section";

export default function Grid({ props }) {
  // layout is an array of objects, see the demo for more complete usage
  const [clickedBox, setClickedBox] = useState("");

  return (
    <GridLayout
      className="layout"
      layout={props.layout}
      cols={6}
      rowHeight={30}
      width={1200}
      compactType="vertical"
      onLayoutChange={(layout) => {
        console.log("layout change in Grid", layout);
        setClickedBox("");
        props.setLayOut(layout);
      }}
    >
      {props.layout.map((item) => {
        return (
          <div
            key={item.i}
            onClick={(e) => {
              e.stopPropagation();
              setClickedBox(item.i);

              const newLayout = props.layout.map((layoutItem) => {
                const newLayout = { ...layoutItem };
                newLayout.isResizable = false;
                newLayout.isDraggable = false;
                return newLayout;
              });
              props.setLayOut(newLayout);
            }}
            className={"relative flex items-center justify-center"}
          >
            {item.i.includes(":") ? item.i.split(":")[0] : item.i}
            <button
              className={
                "absolute top-0 left-0 rounded-full bg-white border border-black w-[24px] h-[24px] p-1 flex justify-center items-center" +
                `${(clickedBox !== item.i || item.static) && " hidden"}`
              }
              onClick={(e) => {
                e.stopPropagation();
                console.log("delete ", item.i);
                props.setDeletedLayoutIds((prev) => [...prev, item.i]);
                props.setLayOut((prev) =>
                  prev.filter((layoutItem) => layoutItem.i !== item.i)
                );
              }}
            >
              <Icon icon="icomoon-free:bin" />
            </button>
            <button
              className={
                "absolute bottom-1 left-0 border-black w-fit h-[24px] p-1 flex justify-center items-center" +
                `${(clickedBox !== item.i || item.static) && " hidden"}`
              }
              onClick={(e) => {
                e.stopPropagation();
                console.log("draggerble ", item.i);
                const newLayout = props.layout.map((layoutItem) => {
                  const newLayout = { ...layoutItem };
                  if (newLayout.i != item.i) {
                    newLayout.isDraggable = false;
                    return newLayout;
                  }
                  newLayout.isDraggable = true;
                  return newLayout;
                });
                props.setLayOut(newLayout);
                setClickedBox("");
              }}
            >
              <Icon icon="icon-park-twotone:move" />
            </button>
            <button
              className={
                "absolute bottom-1 right-0  border-black w-fit h-[24px] p-1 flex justify-center items-center" +
                `${(clickedBox !== item.i || item.static) && " hidden"}`
              }
              onClick={(e) => {
                e.stopPropagation();
                console.log("resizable ", item.i);
                const newLayout = props.layout.map((layoutItem) => {
                  const newLayout = { ...layoutItem };
                  if (newLayout.i != item.i) {
                    newLayout.isResizable = false;
                    return newLayout;
                  }
                  newLayout.isResizable = true;
                  return newLayout;
                });
                props.setLayOut(newLayout);
                setClickedBox("");
              }}
            >
              <Icon icon="iconoir:drag" />
              {/* <Icon icon="icomoon-free:bin" /> */}
            </button>
          </div>
        );
      })}
    </GridLayout>
  );
}
