"use client";
import React from "react";
import { FiImage } from "react-icons/fi";
import { GoArrowUp } from "react-icons/go";
import { IoCropSharp } from "react-icons/io5";

const PromptArea = () => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2  bg-[#ffefe5] dark:bg-[#222222FA] rounded-lg m-auto w-[60%] p-6 shadow">
      <form className="flex space-x-2">
        <div className="flex flex-col space-y-3 w-fit justify-between">
          <label className="bg-[#ffd7be] dark:bg-[#ffffff29] rounded-full cursor-pointer p-1.5 w-fit">
            <input type="file" className="hidden" />
            <FiImage />
          </label>
          <button className="flex items-center space-x-1 rounded bg-amber-50 dark:bg-black px-2 py-1 w-fit">
            <IoCropSharp /> <span className="text-sm">2 : 3</span>
          </button>
        </div>
        <div className="flex flex-col items-end space-y-3 w-[90%]">
          <textarea
            className="inline-block focus:outline-none resize-none w-full"
            placeholder="Add the product prompt"
          ></textarea>
          <button className="p-2 rounded bg-[#ffd7be] dark:bg-[#ffffff29]">
            <GoArrowUp />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptArea;
