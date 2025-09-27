'use client';

import React from 'react';
import Image from 'next/image';

const AuthLayout = ({ children }) => {
  return (
    <main className="grid sm:grid-cols-1 md:grid-cols-12 min-h-screen">
      {/* Left Section: Content */}
      <section className="left-section p-6 flex items-center justify-center col-span-5">
        {children}
      </section>

      {/* Right Section: Image */}
      <section className="right-section relative xs:hidden md:block col-span-7">
        <figure className="image-cover w-100">
<Image
          src="/images/login-background.jpg"
          alt="Login Background"
          width={1920}
          height={1080}
          className=""
          priority
        />
        </figure>
        
      </section>
    </main>
  );
};

export default AuthLayout;
