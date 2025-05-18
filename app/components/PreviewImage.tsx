import Image from "next/image";
import React from "react";

const PreviewImage = () => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      // onClick={() => setSelectedImage(null)}
    >
      {/* <div className="relative max-w-3xl w-full">
        <Image
          src={"/selectedImage"}
          alt="Preview"
          width={800}
          height={600}
          className="rounded-lg"
        />
        <button
          className="absolute top-2 right-2 bg-white p-2 rounded-full text-black hover:bg-gray-200"
          // onClick={() => setSelectedImage(null)}
        >
          ✕
        </button>
      </div> */}
    </div>
  );
};

export default PreviewImage;
