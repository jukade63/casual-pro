import Image from "next/image";
import image from "../../public/forget-pass.jpg";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ForgotPasswordForm } from "./_components/ForgotPassWordForm";

export default function ForgotPassword() {
  return (
    <section className="h-screen relative">
      <div className="h-2/5 bg-blue-600"></div>
      <div className="absolute inset-0 flex items-center justify-center -top-1/6">
        <div className="max-w-xl w-full p-8 bg-white rounded-md shadow-md text-center space-y-4">
          <Image
            src={image}
            alt=""
            width={125}
            height={125}
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-sm">
            Enter your email and we'll send you a link to reset your password.
          </p>
          <ForgotPasswordForm />
          <div className="inline-block">
            <Link
              href="/sign-in"
              className="text-sm flex justify-center items-center"
            >
              <ChevronLeft strokeWidth={1.5} />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
