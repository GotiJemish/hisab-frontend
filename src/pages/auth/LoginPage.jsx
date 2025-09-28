"use client";
import AuthInput from "@/components/form/input/AuthInput";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputFieldj";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useLoading } from "@/context/LoadingContext";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon, GoogleIcon, XIcon } from "@/icons";
import apiClient from "@/utilities/apiClients";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { handleApiError } from "@/utilities/functions";

const LoginPage = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const { loading, setLoading } = useLoading();
  const [isChecked, setIsChecked] = useState(false);
  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Reset specific field error on change
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;


    console.log("Form Submitted", form);
    try {
      setLoading(true);

      const response = await apiClient.post("/auth/login/", {
        email: form?.email,
        password: form?.password,
      });
      const { access, refresh, user_id } = response.data;
      // Save access token to localStorage
      localStorage.setItem("auth_token", access);
      localStorage.setItem("refresh_token", refresh);
      // localStorage.setItem("user_id", user_id);
      // Save access token in cookie too (optional)
      Cookies.set("auth_token", access, {
        expires: 2, // 2 days
        secure: true,
        sameSite: "Lax",
      });
      showToast({ message: "Logged in successfully!", type: "success" });
      login({ access, refresh,userId:user_id }); 
      router.push(`/${user_id}`);
    } catch (error) {
      handleApiError(error, "Login failed");
      showToast({ message: "Login failed", type: "error" });
    }
    finally {
      setLoading(false);
    }


  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <GoogleIcon />
                Sign in with Google
              </button>
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <XIcon />
                Sign in with X
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">

                <AuthInput label="email" required type="email" name="email" controlId="email" onChange={(e) => { handleChange("email", e.target.value) }} placeholder="Enter your email" validation={{ error: !!errors.email, message: errors.email, }} />
                <AuthInput label="password" required type="password" name="password" controlId="password" onChange={(e) => { handleChange("password", e.target.value) }} placeholder="Enter your password" validation={{ error: !!errors.password, message: errors?.password }} />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit" title="Sign in" />


                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href="/register"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
