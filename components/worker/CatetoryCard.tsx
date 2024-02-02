import React from "react";

interface CategoryCardProps {
  title: string;
  image: React.ReactElement;
  description?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  description,
}) => {
  return (
    <div className="p-2 bg-white rounded-md border border-gray-300 shadow-md grid grid-cols-2 gap-4 w-[350px] 
    cursor-pointer hover:transform hover:scale-105 transition-transform duration-300"
    >
      <div className="col-span-1">
        <div className="w-64 overflow-hidden">{image}</div>
      </div>
      <div className="col-span-1">
        <h2 className="text-md font-semibold">{title}</h2>
        <p className="text-gray-600 text-xs">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
