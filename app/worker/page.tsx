import React from "react";
import { Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CategoryCard } from "@/components/worker/CatetoryCard";
import hospitality from "../../public/hospitality.jpg";
import construction from "../../public/construction.jpg";
import event from "../../public/events.jpg";
import retail from "../../public/retail.jpg";
import manufacturing from "../../public/manufacturing.jpg";
import agedCare from "../../public/aged-care.jpg";
import customerService from "../../public/customer-service.jpg";
import agriculture from "../../public/agriculture.jpg";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import JobList from "@/components/worker/JobList";

const jobCategory = [
  {
    title: "Hospitality",
    img: (
      <Image
        src={hospitality}
        alt="Hospitality"
        className="object-cover w-[150px]"
      />
    ),
    description:
      "Explore opportunities in the hospitality industry, including hotels, restaurants, and catering services.",
  },
  {
    title: "Construction",
    img: (
      <Image
        src={construction}
        alt="Construction"
        className="object-cover w-[150px]"
      />
    ),
    description:
      "Join the construction field and be a part of building and shaping structures.",
  },
  {
    title: "Event",
    img: <Image src={event} alt="Event" className="object-cover w-[150px]" />,
    description:
      "Get involved in organizing and coordinating events of all kinds.",
  },
  {
    title: "Retail",
    img: <Image src={retail} alt="Retail" className="object-cover w-[150px]" />,
    description:
      "Work in the retail sector, assisting customers and managing store operations.",
  },
  {
    title: "Manufacturing",
    img: (
      <Image
        src={manufacturing}
        alt="Manufacturing"
        className="object-cover w-[150px]"
      />
    ),
    description:
      "Be a part of the manufacturing industry, contributing to the production of goods and materials.",
  },
  {
    title: "Aged Care",
    img: (
      <Image
        src={agedCare}
        alt="Aged Care"
        className="object-cover w-[150px]"
      />
    ),
    description:
      "Work in the aged care sector, providing support and care for elderly individuals.",
  },
  {
    title: "Customer Service",
    img: (
      <Image
        src={customerService}
        alt="Customer Service"
        className="object-cover w-[150px]"
      />
    ),
    description:
      "Join the customer service field, assisting and providing support to customers.",
  },
  {
    title: "Agriculture",
    img: (
      <Image
        src={agriculture}
        alt="Agriculture"
        className="object-cover w-[150px]"
      />
    ),
    description:
      "Work in the agriculture sector, contributing to the production of crops and livestock.",
  },
];

function WorkerPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen items-center max-w-6xl mx-auto">
        <div className="pt-5">
          <div className="flex items-center gap-2">
            <Check size={30} color="#158917" />
            <h1 className="font-semibold text-xl">
              Browse Thousands of Casual Jobs – All in One Place!
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Check size={30} color="#158917" />
            <h1 className="font-semibold text-xl">
              Work on Your Terms: Choose When and Where You Want to Work.
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Check size={30} color="#158917" />
            <h1 className="font-semibold text-xl">
              Join Now for Free and Start Your Casual Job Journey!
            </h1>
          </div>
        </div>
        <Link href="worker/sign-up" className={`${buttonVariants()} mt-10`}>
          Sign up
        </Link>
        <div className="mt-10"> 
          <JobList />
        </div>
        <h1 className="font-bold text-2xl mt-20 mb-8">
          Navigate Your Work Disciplines
        </h1>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {jobCategory.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.img}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default WorkerPage;
