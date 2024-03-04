import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative bg-[url('/workers.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/20 sm:bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Effortless Recruitment
            <strong className="block font-extrabold text-rose-700">
              Exceptional Results
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Say goodbye to recruitment headaches and hello to efficiency. With
            CasualPro's intuitive interface and advanced search filters, finding
            your next star employee is simpler than ever.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-2 text-center">
            <Link href="/business/sign-up" className="block flex-basis-1">
              <Button className="px-10 w-full">Get Started</Button>
            </Link>

            <Link
              href="#"
              className="block w-full rounded bg-gray-100 px-12 py-2 text-sm font-medium shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
