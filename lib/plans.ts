

export interface Plan {
  name: string;
  amount: number;
  currency: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const availablePlans: Plan[] = [
  {
    name: "Free",
    amount: 0,
    currency: "USD",
    description: "Perfect for getting started with Student Organizer.",
    features: [
      "Task management",
      "Calendar",
      "Course organization",
      "Profile",
      "Up to 20 tasks",
    ],
  },
  {
    name: "Premium",
    amount: 50,
    currency: "USD",
    isPopular: true,
    description: "Unlock all premium features for students.",
    features: [
      "Unlimited tasks",
      "AI Quiz Generator",
      "AI Summary Generator",
      "Smart Study Planner",
      "Priority support",
    ],
  },
];

export const PREMIUM_PRICE_ID = process.env.STRIPE_PRICE_PREMIUM!;