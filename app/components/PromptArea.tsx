"use client";
import React, { useState } from "react";
import { FiImage } from "react-icons/fi";
import { GoArrowUp } from "react-icons/go";
import AspectRatioSelect from "./AspectRatioSelect";
import { PromptFormData } from "@/types/imageToImage";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { ASPECT_RATIOS } from "@/constants";
import axios from "axios";

const PromptArea = () => {
  const { register, control, handleSubmit } = useForm<PromptFormData>({
    defaultValues: {
      aspectRatio: ASPECT_RATIOS[0],
    },
  });
  const [uploadImage, setUploadImage] = useState("");

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      setUploadImage(URL.createObjectURL(image));
    }
  };

  const handleGenerateImage = async (data: PromptFormData) => {
    // const imageFile = data.image[0];
    // if (!imageFile) return;

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   const base64Image = reader.result as string;

    // }
    await axios.post("/api/generate", JSON.stringify(data));
  };
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2  bg-[#ffefe5] dark:bg-[#222222FA] rounded-lg m-auto w-[60%] p-6 shadow">
      <form
        className="flex justify-between space-x-2"
        onSubmit={handleSubmit((data) => handleGenerateImage(data))}
      >
        <div className="flex flex-col space-y-3 w-[10%] justify-between">
          {uploadImage ? (
            <div className="relative inline-block w-15">
              <button className="relative w-15 h-15 rounded-md cursor-pointer shadow overflow-hidden">
                <Image
                  src={uploadImage}
                  alt="upload image"
                  className="w-full h-full object-cover"
                  fill
                />
              </button>
              <button
                type="button"
                className="absolute top-[-5px] -right-1.5 cursor-pointer text-white dark:text-black bg-black dark:bg-white shadow rounded-full text-xs"
                onClick={() => setUploadImage("")}
              >
                <RxCross2 />
              </button>
            </div>
          ) : (
            <label className="bg-[#ffd7be] dark:bg-[#ffffff29] rounded-full cursor-pointer p-1.5 w-fit">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  onChange: (e) => handleUploadImage(e),
                })}
              />
              <FiImage />
            </label>
          )}
          <Controller
            name="aspectRatio"
            control={control}
            render={({ field }) => (
              <AspectRatioSelect onChange={field.onChange} />
            )}
          />
        </div>
        <div className="flex flex-col items-end space-y-3 w-[75%] md:w-[90%]">
          <textarea
            className="inline-block focus:outline-none resize-none w-full"
            placeholder="Add the product prompt"
            {...register("prompt")}
          ></textarea>
          <button
            type="submit"
            disabled={!uploadImage}
            className={`p-2 rounded ${
              uploadImage ? "cursor-pointer" : "cursor-not-allowed"
            } bg-[#ffd7be] dark:bg-[#ffffff29]`}
          >
            <GoArrowUp />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptArea;
