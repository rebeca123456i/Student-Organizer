"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await fetch("/api/profile/subscription-status");
      return res.json();
    },
    enabled: isLoaded,
  });

  const unsubscribeMutation = useMutation({
    mutationFn: async () => {
      await fetch("/api/profile/unsubscribe", {
        method: "POST",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription"],
      });
    },
  });

  if (!isLoaded || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4]">
        Loading...
      </div>
    );
  }

  const premium =
    data?.subscription?.subscriptionActive;

  return (
    <main className="min-h-screen bg-[#FAF8F4] px-6 py-20">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-[34px] border border-[#ECE2D3] bg-white p-12 shadow-xl">

          {/* Header */}

          <div className="flex flex-col items-center">

            <Image
              src={user?.imageUrl || "/avatar.png"}
              width={150}
              height={150}
              alt="Profile"
              className="rounded-full border-4 border-[#F5E7B2]"
            />

            <h1 className="mt-6 text-4xl font-bold text-[#3E3125]">
              {user?.fullName || "Student"}
            </h1>

            <p className="mt-2 text-[#7C6A58]">
              {user?.primaryEmailAddress?.emailAddress}
            </p>

            <span
              className={`mt-6 rounded-full px-5 py-2 text-sm font-semibold ${
                premium
                  ? "bg-[#FFF5DA] text-[#A67C52]"
                  : "bg-[#F5F5F4] text-[#78716C]"
              }`}
            >
              {premium ? "Premium Member" : "Free Plan"}
            </span>

          </div>

          <div className="my-10 h-px bg-[#EFE5D6]" />

          {/* Statistics */}

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-[#ECE2D3] bg-[#FFFDF8] p-6">

              <p className="text-sm text-[#8B7966]">
                Current Plan
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#3E3125]">
                {premium ? "Premium" : "Free"}
              </h2>

            </div>

            <div className="rounded-3xl border border-[#ECE2D3] bg-[#FFFDF8] p-6">

              <p className="text-sm text-[#8B7966]">
                Status
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#3E3125]">
                {premium ? "Active" : "Inactive"}
              </h2>

            </div>

            <div className="rounded-3xl border border-[#ECE2D3] bg-[#FFFDF8] p-6">

              <p className="text-sm text-[#8B7966]">
                Member Since
              </p>

              <h2 className="mt-2 text-xl font-bold text-[#3E3125]">
                {new Date(user?.createdAt ?? Date.now()).getFullYear()}
              </h2>

            </div>

          </div>

                    {/* Account */}

          <div className="mt-12 rounded-3xl border border-[#ECE2D3] bg-[#FFFDF8] p-8">

            <h2 className="text-2xl font-bold text-[#3E3125]">
              Account Information
            </h2>

            <div className="mt-8 space-y-6">

              <div className="flex items-center justify-between border-b border-[#EFE5D6] pb-4">

                <span className="text-[#8B7966]">
                  Full Name
                </span>

                <span className="font-semibold text-[#3E3125]">
                  {user?.fullName}
                </span>

              </div>

              <div className="flex items-center justify-between border-b border-[#EFE5D6] pb-4">

                <span className="text-[#8B7966]">
                  Email Address
                </span>

                <span className="font-semibold text-[#3E3125]">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-[#8B7966]">
                  Subscription
                </span>

                <span className="font-semibold text-[#3E3125]">
                  {premium ? "Premium" : "Free"}
                </span>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            {premium ? (

              <button
                onClick={() => unsubscribeMutation.mutate()}
                className="flex-1 rounded-2xl bg-[#C86A5A] py-4 font-semibold text-white transition hover:bg-[#B45848]"
              >
                Cancel Subscription
              </button>

            ) : (

              <button
                onClick={() => router.push("/pricing")}
                className="flex-1 rounded-2xl bg-[#E6C980] py-4 font-semibold text-[#3E3125] transition hover:bg-[#DDBF72]"
              >
                Upgrade to Premium
              </button>

            )}

            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 rounded-2xl border border-[#E6DDCF] bg-white py-4 font-semibold text-[#3E3125] transition hover:bg-[#F9F5ED]"
            >
              Back to Dashboard
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}