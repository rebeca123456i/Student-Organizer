"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function CreateUser() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/create-user", {
      method: "POST",
    });
  }, [isLoaded, user]);

  return null;
}