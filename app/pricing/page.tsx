"use client";

import { useUser } from "@clerk/nextjs";
import { availablePlans } from "@/lib/plans";

export default function PricingPage() {
  const { user } = useUser();

  const handleSubscribe = async () => {
    if (!user) {
      window.location.href = "/sign-in";
      return;
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-5xl font-bold text-center mb-4">
        Pricing
      </h1>

      <p className="text-center text-gray-500 mb-12">
        Choose the plan that fits your needs.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {availablePlans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-8 shadow-sm ${
              plan.isPopular
                ? "border-blue-600"
                : "border-gray-200"
            }`}
          >
            {plan.isPopular && (
              <div className="mb-4 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
                Most Popular
              </div>
            )}

            <h2 className="text-3xl font-bold">{plan.name}</h2>

            <p className="text-4xl font-bold mt-4">
              ${plan.amount}
              <span className="text-lg font-normal">
                {plan.amount > 0 && "/month"}
              </span>
            </p>

            <p className="mt-4 text-gray-600">
              {plan.description}
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature}>✔ {feature}</li>
              ))}
            </ul>

            {plan.amount === 0 ? (
              <button
                disabled
                className="mt-8 w-full rounded-lg bg-gray-300 py-3"
              >
                Current Plan
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                className="mt-8 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
              >
                Upgrade to Premium
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}