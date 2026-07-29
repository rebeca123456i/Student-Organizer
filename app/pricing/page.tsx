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
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8F4]">

      {/* Background */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute -top-44 -left-44 h-[420px] w-[420px] rounded-full bg-[#F5E7B2]/40 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#F8F2E6] blur-3xl" />

      </div>

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="text-center">

          <span className="rounded-full border border-[#E7D8B5] bg-[#FFF8EB] px-4 py-2 text-sm font-medium text-[#A67C52]">
            Pricing
          </span>

          <h1 className="mt-6 text-5xl font-bold text-[#3E3125]">
            Simple Pricing
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#7C6A58]">
            Start for free and upgrade whenever you need unlimited access
            to premium features and AI-powered study tools.
          </p>

        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-2">

          {availablePlans.map((plan) => (
                        <div
              key={plan.name}
              className={`relative rounded-[30px] border bg-white p-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.isPopular
                  ? "border-[#E6C980]"
                  : "border-[#ECE2D3]"
              }`}
            >

              {plan.isPopular && (

                <div className="absolute -top-4 left-8 rounded-full bg-[#F5E7B2] px-4 py-2 text-sm font-semibold text-[#5E4728]">

                  Most Popular

                </div>

              )}

              <h2 className="text-3xl font-bold text-[#3E3125]">
                {plan.name}
              </h2>

              <div className="mt-6 flex items-end gap-2">

                <span className="text-6xl font-bold text-[#3E3125]">
                  ${plan.amount}
                </span>

                {plan.amount > 0 && (
                  <span className="pb-2 text-[#8D7A66]">
                    /month
                  </span>
                )}

              </div>

              <p className="mt-6 leading-7 text-[#7C6A58]">
                {plan.description}
              </p>

              <div className="my-8 h-px bg-[#EFE5D6]" />

              <ul className="space-y-4">

                {plan.features.map((feature) => (

                  <li
                    key={feature}
                    className="flex items-center gap-3 text-[#5C5146]"
                  >

                    <div className="h-2 w-2 rounded-full bg-[#D9B867]" />

                    {feature}

                  </li>

                ))}

              </ul>

              {plan.amount === 0 ? (

                <button
                  disabled
                  className="mt-10 w-full rounded-2xl border border-[#E6DDCF] bg-[#F8F5EF] py-4 font-semibold text-[#8D7A66]"
                >
                  Current Plan
                </button>

              ) : (

                <button
                  onClick={handleSubscribe}
                  className="mt-10 w-full rounded-2xl bg-[#E6C980] py-4 font-semibold text-[#3E3125] transition hover:bg-[#DDBF72]"
                >
                  Upgrade to Premium
                </button>

              )}

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}