"use client";
import { ImageContextType } from "@/types/imageToImage";
import { createContext, ReactNode, useContext, useState } from "react";

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  return (
    <ImageContext.Provider value={{ generatedImages, setGeneratedImages }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context)
    throw new Error("useImageContext must be used within ImageProvider");
  return context;
};
