import Image from "next/image";
import React from "react";

interface ImageCardProps {
    url: string;
    description: string;
}

function ImageCard({url, description}:ImageCardProps){
  return (
    <div className="flex justify-center items-center bg-blue-50 h-screen">
      <div className="bg-purple-600 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={url}
          alt={description}
          width={800}
          height={300}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ImageCard;
