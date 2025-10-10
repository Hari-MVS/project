"use client";
import React from "react";

export default function Services({ openModal }) {
    const services = [
        {
            title: "LED Signage",
            price: "₹450-₹1,150 / sq ft",
            bullets: ["Indoor & Outdoor", "Custom LED Boards", "Smart Control"],
            icon: "💡",
        },
        {
            title: "ACP Elevation",
            price: "₹350-₹850 / sq ft",
            bullets: ["Exterior Cladding", "Weather Resistant", "Long Warranty"],
            icon: "🏢",
        },
        {
            title: "Terrace LED Hoardings",
            price: "₹2,000-₹15,000 / sq ft",
            bullets: ["High Brightness", "IP65 Rated", "Remote CMS"],
            icon: "📺",
        },
    ];

    return (
        <section id="services" className="mt-12 px-4 md:px-0">
            <h2 className="text-2xl font-semibold">Most Popular <span className="gradient-gold-text shiny text-3xl font-semibold tracking-tight">Services</span></h2>
            <p className="text-slate-500 mt-1">
                Comprehensive signage solutions with real-time pricing calculator
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((s) => (
                    <div
                        key={s.title}
                        className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between h-full"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                                <div className="text-lg font-semibold">{s.title}</div>
                                <div className="text-sm text-emerald-600 font-medium mt-1">{s.price}</div>
                                <ul className="mt-3 text-sm text-slate-600 space-y-1">
                                    {s.bullets.map((b) => (
                                        <li key={b}>✓ {b}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-6xl md:text-6xl animate-pulse">
                                {s.icon}
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-2">
                            <a
                                className="cursor-pointer flex-1 text-center p-2 border rounded-lg text-sm"
                                onClick={openModal}
                            >
                                Get Quote
                            </a>
                            <a
                                className="flex-1 text-center p-2 bg-slate-900 text-white rounded-lg text-sm"
                                href="#gallery"
                            >
                                View
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}