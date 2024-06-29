import Image from "next/image";
import React from "react";

interface ImageCardProps {
  src: string;
  alt: string;
}

function ImageCard({ src, alt }: ImageCardProps) {
  return (
    <div className="flex justify-center items-center bg-blue-50 w-screen py-4">
      <div className="bg-purple-600 xl:rounded-xl overflow-hidden shadow-lg w-full max-w-7xl">
        <div className="relative w-full h-[50vh]">
          <Image
            src={src}
            alt={alt}
            layout="fill"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

export default ImageCard;