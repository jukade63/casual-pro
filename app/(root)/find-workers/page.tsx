import dynamic from 'next/dynamic'
 
const Testimonials = dynamic(() => import('@/components/business/Testimonial'), { ssr: false })
import Hero from "@/components/business/Hero";
import HowItWork from "@/components/business/HowItWorks";
import React from "react";

function BusinessPage() {
  return (
    <div className="mt-1">
      <Hero />
      <HowItWork/>
      <Testimonials />
    </div>
  );
}

export default BusinessPage;
