"use client"
import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/utilities/apiClients";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";

const OtpVarify = () => {
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const { showToast } = useToast();

  // Refs for 6 inputs
  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const focusNext = (index, value) => {
    const val = value || "";
    if (val.length === 1 && index < inputsRef.length - 1) {
      inputsRef[index + 1].current?.focus();
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const next = [...otpValues];
    next[index] = val;
    setOtpValues(next);
    focusNext(index, val);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef[index - 1].current?.focus();
    }
  };

  const assembleOtp = () => otpValues.join("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = assembleOtp();
    if (otp.length !== 6) {
      showToast({ message: "Please enter the 6-digit code.", type: "error" });
      return;
    }

    try {
      setLoading(true);

      // Assume backend expects { email, otp } and email stored in localStorage by ForgotPassword
      const email = localStorage.getItem("resetEmail");
      const payload = { email, otp };

      const response = await apiClient.post("auth/verify-forgot-otp/", payload);

      if (response?.status === 200) {
        showToast({ message: "OTP verified. Proceed to reset password.", type: "success" });
        // Optionally store a flag to allow new-password page to know it's verified
        localStorage.setItem("otpVerified", "true");
        router.push("/new-password");
      } else {
        showToast({ message: response?.data?.message || "Invalid code.", type: "error" });
      }
    } catch (err) {
      showToast({
        message: err.response?.data?.message || "Failed to verify code. Try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP with cooldown
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async (e) => {
    e?.preventDefault();
    if (cooldown > 0) return;

    try {
      setLoading(true);
      const email = localStorage.getItem("resetEmail");
      if (!email) {
        showToast({ message: "No email found to resend OTP.", type: "error" });
        return;
      }

      const res = await apiClient.post("auth/forgot-password/", { email });
      if (res?.status === 200) {
        showToast({ message: "OTP resent to your email.", type: "success" });
        setCooldown(30); // 30 seconds cooldown
      } else {
        showToast({ message: res?.data?.message || "Failed to resend OTP.", type: "error" });
      }
    } catch (err) {
      showToast({ message: err.response?.data?.message || "Failed to resend OTP.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          href="/"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Two Step Verification
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            A verification code has been sent to your email. Please enter it in the
            field below.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Type your 6 digits security code
                </label>
                <div className="flex gap-2 sm:gap-4" id="otp-container">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input
                      key={i}
                      maxLength={1}
                      ref={inputsRef[i]}
                      value={otpValues[i]}
                      onChange={(e) => handleChange(e, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="dark:bg-dark-900 otp-input h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      type="text"
                    />
                  ))}
                </div>
              </div>
              <div>
                <button
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify My Account"}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Didn’t get the code?
              <button
                onClick={handleResend}
                disabled={loading || cooldown > 0}
                className="ml-2 text-brand-500 hover:text-brand-600 dark:text-brand-400 disabled:opacity-60"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVarify;
