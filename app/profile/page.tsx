"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  const queryClient = useQueryClient();
  const router = useRouter();

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
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-10">

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">

          <Image
            src={user?.imageUrl || "/avatar.png"}
            width={120}
            height={120}
            alt="avatar"
            className="rounded-full"
          />

          <h2 className="text-2xl font-bold mt-4">
            {user?.fullName}
          </h2>

          <p className="text-gray-500">
            {user?.primaryEmailAddress?.emailAddress}
          </p>

        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8 text-gray-700">
            Subscription
          </h2>

          <div className="text-gray-600 ">

            <div>
              <span className="font-semibold">
                Current Plan:
              </span>{" "}
              {data?.subscription?.subscriptionActive
                ? "Premium"
                : "Free"}
            </div>

            <div>
              <span className="font-semibold">
                Status:
              </span>{" "}
              {data?.subscription?.subscriptionActive
                ? "Active"
                : "Inactive"}
            </div>

            {data?.subscription?.subscriptionActive ? (
              <button
                onClick={() => unsubscribeMutation.mutate()}
                className="bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                Cancel Subscription
              </button>
            ) : (
              <button
                onClick={() => router.push("/pricing")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Upgrade to Premium
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}