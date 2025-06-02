"use client";
import { useGetMeQuery } from "@/app/store/api/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data, isLoading, error } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) {
      // Store the full URL including parameters
      const fullUrl = window.location.pathname + window.location.search;
      localStorage.setItem("redirectUrl", fullUrl);
      router.replace("/auth/login");
    } else if (!isLoading && (error || data?.data?.type !== "user")) {
      router.replace("/unauthorized");
    }
  }, [token, isLoading, error, data]);

  if (isLoading || !data || data?.data?.type !== "user") return null;

  return <>{children}</>;
}