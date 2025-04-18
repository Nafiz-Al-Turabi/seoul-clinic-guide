"use client";
import React, { useState } from "react";
import {
  useForgotPasswordMutation,
  useResetPawsswordMutation,
} from "@/app/store/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const emailFromStore = useSelector((state: any) => state.auth.email);

  const [step, setStep] = useState(1);
  const [email, setEmailInput] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [forgotPassword, { isLoading: loadingEmail, error: emailError }] =
    useForgotPasswordMutation();
  const [resetPassword, { isLoading: loadingReset, error: resetError }] =
    useResetPawsswordMutation();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ email }).unwrap();
      dispatch(setEmail(email));
      toast.success(response?.message);
      setTimeout(() => {
        setStep(2);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await resetPassword({
        email,
        token,
        password: newPassword,
      }).unwrap();
      toast.success(response?.message);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-800 text-center">
              Forgot Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 rounded-lg"
              disabled={loadingEmail}
            >
              {loadingEmail ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
            {emailError && (
              <p className="text-sm text-red-600 text-center">
                {(emailError as any).data?.message || "An error occurred."}
              </p>
            )}
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-800 text-center">
              Reset Password
            </h2>
            <input
              type="text"
              placeholder="Enter Token from Email"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-2 rounded-lg"
              disabled={loadingReset}
            >
              {loadingReset ? "Resetting..." : "Reset Password"}
            </button>
            {resetError && (
              <p className="text-sm text-red-600 text-center">
                {/* {(resetError as any).data?.message || "An error occurred."} */}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
