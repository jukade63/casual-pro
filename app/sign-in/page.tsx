import { SignInForm } from "@/components/worker/SignInForm";
import Image from "next/image";
import loginImg from "../../public/login.jpg";
function SignIn() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Image
        src={loginImg}
        className="object-cover rounded-full"
        alt="app-logo"
        width={150}
        height={150}
      />
      <SignInForm />
    </div>
  );
}

export default SignIn;
