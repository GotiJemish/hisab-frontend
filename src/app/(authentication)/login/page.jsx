import LoginPage from '@/pages/auth/LoginPage'
import React from 'react'
import { Metadata } from "next";
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};
const page = () => {
  return (
         <AuthProvider>
           <LoginPage/>
          </AuthProvider>
  )
}

export default page
