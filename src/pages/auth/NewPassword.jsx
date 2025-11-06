"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/form/input/AuthInput";
import Button from "@/components/ui/button/Button";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import apiClient from "@/utilities/apiClients";
import { validatePassword } from "@/utilities/validations";

const NewPassword = () => {
      const router = useRouter();
  const { loading, setLoading } = useLoading();
  const { showToast } = useToast();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Guard: ensure OTP was verified
  useEffect(() => {
    const verified = localStorage.getItem("otpVerified");
    if (!verified) {
      router.replace("/otp-verify");
    }
  }, [router]);

  const validate = () => {
    const passErr = validatePassword(password);
    if (passErr) return passErr;
    if (password !== confirm) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      showToast({ message: err, type: "error" });
      return;
    }

    try {
      setLoading(true);
      const email = localStorage.getItem("registerEmail");
      const payload = { email, password };
      const res = await apiClient.post("auth/set-password/", payload);
      if (res?.status === 200) {
        showToast({ message: "Password reset successfully.", type: "success" });
        // cleanup
        localStorage.removeItem("otpVerified");
        localStorage.removeItem("resetEmail");
        router.push("/");
      } else {
        showToast({ message: res?.data?.message || "Failed to reset password.", type: "error" });
      }
    } catch (err) {
      showToast({ message: err.response?.data?.message || "Something went wrong.", type: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
 <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Set a new password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your new password to complete the reset process.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            label="New Password"
            required
            type="password"
            name="password"
            controlId="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />

          <AuthInput
            label="Confirm Password"
            required
            type="password"
            name="confirm"
            controlId="confirm"
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
          />

          <Button className="w-full" size="sm" type="submit" title={loading ? "Saving..." : "Save Password"} disabled={loading} />
        </form>
      </div>
    </div>
  )
}

export default NewPassword
