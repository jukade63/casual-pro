import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JobCategory from "@/components/JobCategory";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import JobList from "@/components/worker/JobList";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="mx-auto text-center mt-8">
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <div className="flex flex-col gap-2 lg:flex-row justify-center items-center mb-8">
          <Link href="/business/sign-up">
            <Button>Sign up to hire</Button>
          </Link>
          <Link href="/worker/sign-up">
            <Button variant="outline">Sign up to work</Button>
          </Link>
        </div>
        <JobCategory />
        <Footer />
      </div>
    </div>
  );
}
