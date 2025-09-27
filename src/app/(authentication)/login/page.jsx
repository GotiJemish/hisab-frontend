import LoginPage from '@/pages/auth/LoginPage'
import React from 'react'
import { Metadata } from "next";

export const metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};
const page = () => {
  return (
    <LoginPage/>
  )
}

export default page
