import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
     <Header />
     <div className="container mx-auto text-center mt-8">
      <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <Link href="/business/sign-up">
          <Button>
            Sign up to hire
          </Button>
        </Link>
        <Link href="/worker/sign-up">
          <Button variant='secondary'>
            Sign up to work
          </Button>
        </Link>
      </div>
    </div>
    </div>
  );
}
