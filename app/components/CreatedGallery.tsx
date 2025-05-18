/* eslint-disable @next/next/no-img-element */
"use client";
import { useImageContext } from "@/context/ImageContext";
import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

const CreatedGallery = () => {
  const { generatedImages } = useImageContext();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (imageUrl: string) => {
    setDownloading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setDownloading(false);
    } catch (error) {
      console.error("Download failed: ", error);
    }
  };

  // Dynamically determine grid columns and width
  const getGridColsAndWidth = () => {
    const count = generatedImages.length;
    if (count === 1) return "grid-cols-1 md:w-[75%] lg:w-[55%]";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 lg:w-[70%] md:w-[80%]";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:w-[60%] md:w-[80%]";
  };
  return (
    <div className="flex justify-center items-center pb-48">
      <div className="h-[70vh]">
        {generatedImages && generatedImages.length > 0 ? (
          <div
            className={`grid ${getGridColsAndWidth()} w-[90%] gap-4 h-[70vh] overflow-scroll  m-auto`}
          >
            {generatedImages.map((image, index) => (
              <div className={`relative w-full group`} key={index}>
                <img src={image} alt="created Image" className="object-cover" />
                <button
                  disabled={downloading}
                  className="absolute right-1.5 top-2 cursor-pointer hidden group-hover:block bg-amber-50 dark:bg-black rounded p-1"
                  onClick={() => handleDownload(image)}
                >
                  {downloading ? (
                    <VscLoading className="animate-spin text-xl" />
                  ) : (
                    <MdOutlineFileDownload className="text-xl" />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-8 flex flex-col justify-center items-center h-[50vh]">
            <h1 className="text-2xl  font-semibold">
              Start by uploading your product image.
            </h1>
            <p className="italic text-sm">
              💡 Then describe how you&apos;d like it to look.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedGallery;
