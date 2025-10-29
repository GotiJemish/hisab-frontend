"use client";

import AuthInput from "@/components/form/input/AuthInput";
import Button from "@/components/ui/button/Button";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import { ChevronLeftIcon } from "@/icons";
import apiClient from "@/utilities/apiClients";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { loading, setLoading } = useLoading();
  const { showToast } = useToast();

  // 🔹 Email Validation
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email address";
    return null;
  };

  // 🔹 Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    setError(emailError);
    if (emailError) return;

    try {
      setLoading(true);
      const response = await apiClient.post("auth/forgot-password/", { email });
      // console.log(response);
      if (response?.status === 200) {
        showToast({
          message: "Password reset link sent to your email.",
          type: "success",
        });
        localStorage.setItem("resetEmail",email);
        router.push("/otp-verify");
      } else {
        showToast({
          message: response?.data?.message || "Failed to send reset link.",
          type: "error",
        });
      }
    } catch (err) {
      showToast({
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      {/* Back Button */}
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Back to dashboard
        </Link>
      </div>

      {/* Forgot Password Form */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Forgot Your Password?
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the email address linked to your account, and we’ll send you a
            link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            label="Email"
            required
            type="email"
            name="email"
            controlId="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            validation={{ error: !!error, message: error }}
          />

          <Button
            className="w-full"
            size="sm"
            type="submit"
            title={loading ? "Sending..." : "Send Reset Link"}
            disabled={loading}
          />
        </form>

        <div className="mt-5">
          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
            Wait, I remember my password?{" "}
            <Link
              href="/"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
