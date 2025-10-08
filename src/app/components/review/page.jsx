"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Reviews() {
    const reviews = [
        { author: "Rahul", rating: 5, text: "Excellent work, quick install." },
        { author: "Sanya", rating: 4, text: "Good quality and service." },
        { author: "Amit", rating: 4, text: "Responsive team and professional." },
    ];

    return (
        <section id="reviews" className="mt-12 pl-6 pr-6">
            <h2 className="text-2xl font-semibold">Live Customer Reviews</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((r, idx) => (
                    <motion.blockquote key={idx} whileHover={{ y: -4 }} className="bg-white p-5 rounded-2xl shadow">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">{r.author}</div>
                            <div className="text-amber-400">{'★'.repeat(r.rating)}</div>
                        </div>
                        <p className="text-sm text-slate-600 mt-3">{r.text}</p>
                    </motion.blockquote>
                ))}
            </div>
        </section>
    );
}