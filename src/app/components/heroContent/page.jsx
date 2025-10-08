"use client";
import React, { useEffect, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import PricingCalculator from "../priceCalculator/page";

export default function HeroContent({ onGetQuote }) {
  const [parent] = useAutoAnimate({ duration: 400, easing: "ease-in-out" });
  const sectionRef = useRef(null);

  useEffect(() => {
    // Small fade + translate effect on scroll (GPU-friendly)
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 500, 0.9);
      const translateY = Math.min(scrollY * 0.05, 20);
      sectionRef.current.style.opacity = opacity;
      sectionRef.current.style.transform = `translateY(-${translateY}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-center py-12 transition-all duration-700 ease-in-out will-change-transform will-change-opacity"
    >
      {/* Left content */}
      <div ref={parent} className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight opacity-0 animate-fade-in-up">
          Elevating Your Brand Identity with Quality & Innovation
        </h1>

        <p className="mt-4 text-slate-600 opacity-0 animate-fade-in-up delay-200">
          Premium LED signage, ACP elevation and large-format hoardings — custom design, fast installation, and 3-year warranty.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-300">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-lg shadow hover:scale-[1.02] transition-transform duration-300"
          >
            Get Free Quote
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 border border-slate-200 px-5 py-3 rounded-lg hover:bg-slate-50 transition-all duration-300"
          >
            View Gallery
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm opacity-0 animate-fade-in-up delay-400">
          {[
            { value: "19+", label: "Years" },
            { value: "4.2★", label: "Rating" },
            { value: "29", label: "Reviews" },
            { value: "24hrs", label: "Response" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow duration-300"
            >
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Calculator */}
      <div
        ref={parent}
        id="pricing-calculator-placeholder"
        className="opacity-0 animate-fade-in-up delay-500"
      >
        <PricingCalculator onGetQuote={onGetQuote} />
      </div>
    </section>
  );
}


