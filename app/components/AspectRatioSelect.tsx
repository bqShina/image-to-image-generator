"use client";
import { ASPECT_RATIOS } from "@/constants";
import React, { useState } from "react";
import { IoCropSharp } from "react-icons/io5";

const AspectRatioSelect = ({
  onChange,
}: {
  onChange: (val: string) => void;
}) => {
  const [selected, setSelected] = useState(ASPECT_RATIOS[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
    setOpen(false);
  };
  return (
    <div className="relative w-15">
      <button
        className="flex items-center space-x-1 rounded bg-amber-50 dark:bg-black px-2 py-1.5 w-15 cursor-pointer"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <IoCropSharp /> <span className="text-xs font-bold">{selected}</span>
      </button>

      {open && (
        <ul className="absolute bottom-7 right-0 mb-1 rounded bg-amber-50 dark:bg-black text-xs font-semibold py-2 shadow">
          {ASPECT_RATIOS.map((ratio) => (
            <li
              key={ratio}
              onClick={() => handleSelect(ratio)}
              className={`${
                ratio === selected ? "bg-amber-200 dark:bg-gray-800" : ""
              } px-3 py-2 cursor-pointer hover:bg-amber-200 hover:dark:dark:bg-gray-800 text-right`}
            >
              {ratio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AspectRatioSelect;
