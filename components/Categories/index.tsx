import React from "react";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Nature",
    imageUrl: "https://img.icons8.com/?size=80&id=5ChqDseUT1II&format=png",
  },
  { id: 2, name: "Sports", imageUrl: "/images/sports.jpg" },
  { id: 3, name: "Food", imageUrl: "/images/food.jpg" },
  { id: 4, name: "Music", imageUrl: "/images/music.jpg" },
];

function Categories() {
  return (
    <div className="flex flex-wrap justify-center gap-20 py-10">
      {categories.map((category) => (
        <a
          key={category.id}
          href={`/events?category=${category.name}`}
          className="rounded-full overflow-hidden border border-gray-200 hover:border-green-800 hover:shadow-lg transition duration-300 block w-20 h-20"
        >
          <Image
            src={category.imageUrl}
            alt={category.name}
            objectFit="cover"
            width={200}
            height={200}
          />
        </a>
      ))}
    </div>
  );
}

export default Categories;
