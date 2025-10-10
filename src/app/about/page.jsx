"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import autoAnimate from "@formkit/auto-animate";

export default function AboutPreview() {
  const sectionRef = useRef(null);

  // ✅ Initialize AutoAnimate once
  useEffect(() => {
    if (sectionRef.current) autoAnimate(sectionRef.current);
  }, []);

  return (
    <section
      id="about-preview"
      ref={sectionRef}
      className="mx-auto px-4 sm:px-6 lg:px-8 py-16 opacity-0 translate-y-6 animate-fadeUp"
    >
      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-8 shadow-lg border border-emerald-100 transition-all duration-500 hover:shadow-xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Est. 2005
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                4.2★ Rating
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              Trusted by Leading Brands Since 2005
            </h2>

            <p className="text-slate-600">
              V Sign Enterprises has been revolutionizing LED signage and ACP
              elevations in Hyderabad. From IKEA to Mahindra, we've built trust
              through innovative branding solutions.
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏆", text: "ISO Certified", color: "emerald" },
                { icon: "⚡", text: "24-48h Delivery", color: "blue" },
                { icon: "🔧", text: "24/7 Support", color: "purple" },
                { icon: "⭐", text: "3-Year Warranty", color: "amber" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center`}
                  >
                    <span className={`text-${item.color}-600 text-sm`}>
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-sm text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>

            <Link
  href="/aboutpage"
  className="relative inline-flex items-center px-6 py-3 font-medium rounded-lg text-white 
             bg-emerald-600 shadow-[0_0_20px_3px_rgba(16,185,129,0.5)]
             transition-all duration-500 hover:shadow-[0_0_35px_6px_rgba(16,185,129,0.8)] 
             hover:bg-emerald-500 animate-glow"
>
  Learn More About Us
  <svg
    className="w-4 h-4 ml-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
</Link>

          </div>

          {/* Right Content - Milestones */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold text-slate-900 mb-4 text-center">
              Our Journey
            </h3>

            <div className="space-y-4">
              {[
                {
                  year: "2005",
                  color: "emerald",
                  title: "Company Founded",
                  desc: "Started our signage revolution in Hyderabad",
                },
                {
                  year: "2020",
                  color: "blue",
                  title: "Premium Clients",
                  desc: "IKEA, Mahindra, ITC Hotels partnership",
                },
                {
                  year: "2024",
                  color: "purple",
                  title: "Digital Transformation",
                  desc: "Smart LED solutions & IoT integration",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center`}
                  >
                    <span
                      className={`text-${item.color}-700 font-bold text-sm`}
                    >
                      {item.year}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


