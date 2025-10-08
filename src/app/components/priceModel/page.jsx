"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PriceModal = ({ isOpen, onClose, priceData }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        details: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionData = {
        ...formData,
        service: priceData?.service,
        size: priceData?.size,
        quality: priceData?.quality,
        estimatedMinPrice: priceData?.minPrice,
        estimatedMaxPrice: priceData?.maxPrice
    };

    // Create pre-filled Google Form URL
    const prefillURL = `https://docs.google.com/forms/d/e/1FAIpQLSfMo3hiegl0oJuffuBlYRqqgbrOQ8XQ_xeIAf6SNVSENisUuA/viewform?usp=pp_url&entry.1197761422=${encodeURIComponent(submissionData.name)}&entry.238213077=${encodeURIComponent(submissionData.phone)}&entry.194998029=${encodeURIComponent(submissionData.email)}&entry.302052636=${encodeURIComponent(submissionData.details)}&entry.16220737=${encodeURIComponent(submissionData.service)}&entry.1623084565=${encodeURIComponent(submissionData.size)}&entry.2022063777=${encodeURIComponent(submissionData.quality)}&entry.1552388893=${encodeURIComponent(`₹${submissionData.estimatedMinPrice} - ₹${submissionData.estimatedMaxPrice}`)}`;
    // Open the pre-filled form in new tab
    window.open(prefillURL, '_blank');
    
    alert("Please review and submit the pre-filled form. Your data has been auto-filled!");
    onClose();
};

    const handleWhatsApp = () => {
        const message = `Hello! I'm interested in getting a quote for:\n\nService: ${priceData?.service}\nSize: ${priceData?.size} sq ft\nQuality: ${priceData?.quality}\nEstimated Price: ₹${priceData?.minPrice?.toLocaleString()} - ₹${priceData?.maxPrice?.toLocaleString()}\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProject Details: ${formData.details}`;

        const whatsappUrl = `https://wa.me/919949066700?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-full max-w-xl bg-white rounded-2xl p-6"
                >
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <div className="text-lg font-semibold">Request Quote</div>
                            {priceData && (
                                <div className="text-sm text-slate-500">
                                    Estimated: ₹{priceData.minPrice.toLocaleString()} - ₹{priceData.maxPrice.toLocaleString()}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-700 text-xl"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <textarea
                            name="details"
                            placeholder="Project details"
                            value={formData.details}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md h-28 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                Send Quote Request
                            </button>
                            <button
                                type="button"
                                onClick={handleWhatsApp}
                                className="flex-1 text-center p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                WhatsApp
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PriceModal;