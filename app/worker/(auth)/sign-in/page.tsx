import { SignInForm } from '@/components/worker/SignInForm'
import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={"/logo.png"}
        className="object-cover rounded-full"
        alt="app-logo"
        width={150}
        height={150}
      />
      <SignInForm />
    </div>
  )
}

export default page