"use client";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

function GoogleComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) {
    return redirect("/auth/login");
  }

  localStorage.setItem("token", token as string);
  return redirect("/");
}

export default GoogleComponent;
