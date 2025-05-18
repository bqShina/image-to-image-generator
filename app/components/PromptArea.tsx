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
import { VscLoading } from "react-icons/vsc";
import { useImageContext } from "@/context/ImageContext";
import { RiResetLeftLine } from "react-icons/ri";

const PromptArea = () => {
  const { register, control, handleSubmit, setValue, reset } =
    useForm<PromptFormData>({
      defaultValues: {
        prompt: "",
        aspectRatio: ASPECT_RATIOS[0],
      },
    });
  const { generatedImages, setGeneratedImages } = useImageContext();
  const [uploadImage, setUploadImage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetPrompt = () => {
    reset();
    setUploadImage("");
    if (generating) setGenerating(false);
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setUploadImage(reader.result);
          setValue("image", reader.result);
        }
      };
      reader.readAsDataURL(image);
    }
  };

  const handleGenerateImage = async (data: PromptFormData) => {
    setGenerating(true);
    try {
      const response = await axios.post("/api/generate", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const imageUrls: string = response.data.output[0];

        setGeneratedImages([
          ...generatedImages,
          imageUrls,
          // "https://replicate.delivery/xezq/02KXOsibKl4oJh8OqIgR8jBx5DgWdvs1TahYdeVeQeiCfQ3SB/out-0.png",
        ]);
        setGenerating(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Image generating fails");
    }
  };
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2  bg-[#ffefe5] dark:bg-[#222222FA] rounded-lg m-auto sm:w-[60%] w-[90%] p-6 shadow">
      {errorMessage && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded flex justify-between w-[30%]">
          <p role="alert">{errorMessage}</p>
          <button
            className="cursor-pointer"
            onClick={() => {
              setErrorMessage("");
              resetPrompt();
            }}
          >
            <RxCross2 />
          </button>
        </div>
      )}
      <form
        className="flex justify-between space-x-2"
        onSubmit={handleSubmit((data) => handleGenerateImage(data))}
      >
        <div className="flex flex-col space-y-3 w-[10%] justify-between">
          {uploadImage ? (
            <div className="relative inline-block w-15">
              <button
                type="button"
                className="relative w-15 h-15 rounded-md cursor-pointer shadow overflow-hidden"
              >
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
                onChange={handleUploadImage}
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
          <div className="flex space-x-2">
            {generatedImages && (
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  resetPrompt();
                  setGeneratedImages([]);
                }}
              >
                <RiResetLeftLine className="text-sm" />
              </button>
            )}

            <button
              type="submit"
              disabled={!uploadImage && generating}
              className={`p-2 rounded ${
                uploadImage && !generating
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              } bg-[#ffd7be] dark:bg-[#ffffff29]`}
            >
              {generating ? (
                <VscLoading className="animate-spin" />
              ) : (
                <GoArrowUp />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptArea;
