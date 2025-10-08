"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const PriceCalculator = ({ onGetQuote }) => {
    const [service, setService] = useState("LED Signage");
    const [size, setSize] = useState(50); // sq ft
    const [quality, setQuality] = useState("Standard");

    // price ranges per sq ft (min, max)
    const ranges = {
        "LED Signage": [450, 1150],
        "ACP Elevation": [350, 850],
        "Terrace LED Hoardings": [2000, 15000],
        "Complete Branding Solution": [500, 2000],
    };

    function calcPrice() {
        const [minRate, maxRate] = ranges[service] || ranges["LED Signage"];
        const baseMin = Math.round(minRate * size);
        const baseMax = Math.round(maxRate * size);
        let multiplier = 1;
        if (quality === "Premium") multiplier = 1.25;
        if (quality === "Enterprise") multiplier = 1.5;
        const minPrice = Math.round(baseMin * multiplier);
        const maxPrice = Math.round(baseMax * multiplier);
        return { minPrice, maxPrice };
    }

    const { minPrice, maxPrice } = calcPrice();

    const handleGetQuote = () => {
        onGetQuote({
            service,
            size,
            quality,
            minPrice,
            maxPrice
        });
    };

    return (
        <motion.aside 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
        >
            <h3 className="font-semibold text-lg">Live Pricing Calculator</h3>
            <p className="text-sm text-slate-500 mt-1">Get an instant estimate — fine tune size & quality.</p>

            <div className="mt-4 space-y-3">
                <label className="block text-sm text-slate-600">Service Type</label>
                <select 
                    value={service} 
                    onChange={(e) => setService(e.target.value)} 
                    className="w-full rounded-md border p-2"
                >
                    <option>LED Signage</option>
                    <option>ACP Elevation</option>
                    <option>Terrace LED Hoardings</option>
                    <option>Complete Branding Solution</option>
                </select>

                <label className="block text-sm text-slate-600">Size (sq ft): {size}</label>
                <input 
                    type="range" 
                    min="1" 
                    max="2000" 
                    value={size} 
                    onChange={(e) => setSize(Number(e.target.value))} 
                    className="w-full" 
                />

                <label className="block text-sm text-slate-600">Quality</label>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setQuality("Standard")} 
                        className={`flex-1 p-2 rounded-md border ${quality === "Standard" ? "border-emerald-600 bg-emerald-50" : "bg-white"}`}
                    >
                        Standard
                    </button>
                    <button 
                        onClick={() => setQuality("Premium")} 
                        className={`flex-1 p-2 rounded-md border ${quality === "Premium" ? "border-emerald-600 bg-emerald-50" : "bg-white"}`}
                    >
                        Premium
                    </button>
                    <button 
                        onClick={() => setQuality("Enterprise")} 
                        className={`flex-1 p-2 rounded-md border ${quality === "Enterprise" ? "border-emerald-600 bg-emerald-50" : "bg-white"}`}
                    >
                        Enterprise
                    </button>
                </div>

                <div className="mt-4 p-4 rounded-md bg-slate-50 border">
                    <div className="text-sm text-slate-500">Estimated Price Range</div>
                    <div className="mt-2 text-xl font-semibold">
                        ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500">
                        Final price may vary based on site survey & custom requirements.
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <button 
                        onClick={handleGetQuote} 
                        className="cursor-pointer flex-1 bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        Get Quote
                    </button>
                    <a 
                        className="flex-1 text-center p-3 border rounded-lg hover:bg-slate-50 transition-colors" 
                        href="https://wa.me/919949066700" 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </motion.aside>
    );
};

export default PriceCalculator;