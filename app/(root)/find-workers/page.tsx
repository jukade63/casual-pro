import Hero from "@/components/business/Hero";
import HowItWork from "@/components/business/HowItWorks";
import Testimonials from "@/components/business/Testimonial";
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
