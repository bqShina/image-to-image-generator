"use client";
import React, { useState } from "react";

const CreatedGallery = () => {
  const [createdimages, setCreatedImages] = useState([]);
  return (
    <div className="flex justify-center items-center h-[80vh]">
      {!createdimages.length && (
        <h1 className="text-2xl text-center font-semibold">
          What do you want to create?
        </h1>
      )}
    </div>
  );
};

export default CreatedGallery;
