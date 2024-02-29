import Image from "next/image";
import React from "react";
import imageSrc from "../public/header-img.png";

const headline = "Instantly Connect with Employers Seeking Your Skills.";
const subheadline = "Customizable Solutions for Every Business – Casual Jobs, Simplified.";

const Header = () => {
  return (
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-8  max-w-5xl md:h-[calc(100vh-220px)]">
      <div className="md:w-1/2 pr-8">
        <h1 className="text-4xl font-bold mb-2">{headline}</h1>
        <p className="text-gray-600">{subheadline}</p>
      </div>

      <div className="w-1/2">
        <div className="w-full h-auto">
          <Image
            className="object-cover rounded-md hidden md:block"
            src={imageSrc}
            alt="header-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
