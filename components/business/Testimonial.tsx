import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      author: "John Doe",
      company: "ABC Corp",
      text: "CasualPro helped us find the perfect candidates quickly and efficiently. The platform is user-friendly and highly effective.",
    },
    {
      id: 2,
      author: "Jane Smith",
      company: "XYZ Inc",
      text: "We've been using CasualPro for our hiring needs and have been extremely satisfied with the quality of candidates we've found.",
    },
    {
      id: 3,
      author: "Michael Johnson",
      company: "123 Solutions",
      text: "CasualPro's streamlined process and extensive candidate pool have saved us countless hours in our recruitment efforts. Highly recommended!",
    },
    {
      id: 4,
      author: "Emily Brown",
      company: "Tech Innovations",
      text: "Using CasualPro has been a game-changer for our hiring process. We've found top-notch talent that aligns perfectly with our company culture and values.",
    },
    {
      id: 5,
      author: "David Clark",
      company: "Global Enterprises",
      text: "CasualPro exceeded our expectations with its intuitive interface and robust features. It's been instrumental in our hiring success.",
    },
    {
      id: 6,
      author: "Sarah Johnson",
      company: "Future Tech",
      text: "We've tried other platforms before, but CasualPro stands out for its exceptional candidate quality and customer service.",
    },
  ];
  return (
    <div className="text-center bg-slate-300 py-12">
         <h2 className="text-3xl font-semibold text-center mb-12">
          Testimonials
        </h2>
      <Carousel className="w-full mx-auto max-w-3xl mb-5">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3 rounded-md"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col justify-around p-2 text-center aspect-square">
                    <Image
                      src="/clogo.svg"
                      alt="company-logo"
                      width={50}
                      height={50}
                      className="mx-auto"
                    />
                    <p className="text-xs text-gray-500 p-2">
                      " {testimonial.text} "
                    </p>
                    <div>
                      <p className="text-sm font-semibold">
                        {testimonial.author}
                      </p>
                      <p className="text-xs">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-200" />
        <CarouselNext className="bg-gray-200" />
      </Carousel>
    </div>
  );
}
