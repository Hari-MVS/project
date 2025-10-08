"use client";

import { motion } from "framer-motion";

const plans = [
  {
    title: "LED Signage Solutions",
    subtitle:
      "We Are One Of The Reputed LED Sign Makers In The Telangana And We Always Come Up With The Most Creative LED Signs",
    features: [
      "Indoor & Outdoor LED Signs",
      "Full Color LED Displays",
      "Custom LED Boards",
      "Energy Efficient Solutions",
      "Smart Control Systems",
    ],
    price: "₹450–₹1,150 per sq ft",
    starting: "Starting from ₹25,000",
    badge: "MOST POPULAR",
    icon: "💡",
    gradient: "from-yellow-200 to-yellow-400",
  },
  {
    title: "ACP Elevation & Cladding",
    subtitle:
      "Our Aluminium Composite Panels Are Cost-Effective And Best Solution For Exterior Wall Cladding, ACP Signage, Facade Panels, And Interiors.",
    features: [
      "Exterior Wall Cladding",
      "ACP Signage Boards",
      "Modern Facade Panels",
      "Interior Applications",
      "Weather Resistant",
    ],
    price: "₹350–₹850 per sq ft",
    starting: "Starting from ₹15,000",
    badge: "",
    icon: "🏢",
    gradient: "from-gray-200 to-gray-400",
  },
  {
    title: "Terrace LED Hoardings",
    subtitle:
      "Define Site Boundaries, Project Privacy, Public Safety. Sustainable, Zero Waste Products And Low Carbon Options",
    features: [
      "Large Format LED Displays",
      "Weather Resistant IP65",
      "High Brightness 8000+ Nits",
      "Remote Controlled",
      "Content Management System",
    ],
    price: "₹2,000–₹15,000 per sq ft",
    starting: "Starting from ₹2,00,000",
    badge: "PREMIUM",
    icon: "📺",
    gradient: "from-indigo-300 to-indigo-600",
  },
];

export default function PricingCards() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="relative overflow-hidden rounded-2xl shadow-xl group"
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${plan.gradient} opacity-80 group-hover:opacity-100 transition duration-500`}
            ></div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col h-full p-8 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl">
              {plan.badge && (
                <span
                  className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                    plan.badge === "MOST POPULAR"
                      ? "bg-yellow-400 text-gray-800"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div className="text-5xl text-center mb-4 drop-shadow-sm">{plan.icon}</div>
              <h2 className="text-2xl font-extrabold text-center mb-3 text-gray-900 dark:text-white">
                {plan.title}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center mb-6 leading-relaxed">
                {plan.subtitle}
              </p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center text-gray-800 dark:text-gray-200"
                  >
                    <span className="text-green-500 mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center mb-6">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{plan.starting}</p>
              </div>
              {/* <div className="mt-auto flex flex-col gap-3">
                <button className="w-full bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white font-semibold py-3 rounded-xl shadow-md transition-all">
                  Get Quote Now
                </button>
                <button className="w-full border border-gray-400 dark:border-gray-600 py-3 rounded-xl text-gray-800 dark:text-gray-200 bg-white/60 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                  View Details
                </button>
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
