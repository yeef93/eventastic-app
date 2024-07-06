import React from "react";
import Image from "next/image";
import categories from "@/utils/categories";

function Categories() {
  return (
    <div className="text-left xl:px-40 pt-6">
      <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/events?category=${category.name}`}
            className="rounded-full overflow-hidden border border-gray-200 hover:border-green-800 hover:shadow-lg transition duration-300 block w-16 h-16 md:w-24 md:h-24"
            style={{ minWidth: "4rem", minHeight: "4rem" }}
          >
            <Image
              src={category.imageUrl}
              alt={category.name}
              objectFit="cover"
              layout="responsive"
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-full"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Categories;