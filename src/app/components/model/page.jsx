"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuoteModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        service: "",
        name: "",
        phone: "",
        email: "",
        business: "",
    });

    const services = [
        { name: "LED Signage", price: "₹25,000", icon: "💡" },
        { name: "ACP Elevation", price: "₹15,000", icon: "🏢" },
        { name: "LED Hoardings", price: "₹2,00,000", icon: "📺" },
        { name: "Complete Solution", price: "Custom Quote", icon: "⭐" },
    ];

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        // Basic validation
        if (!form.email) {
            alert("Please enter your email!");
            return;
        }

        const res = await fetch("/api/send-quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form), // send all form data
        });

        if (res.ok) {
            alert("Quote request sent successfully!");
            setForm({ service: "", name: "", phone: "", email: "", business: "", date: "", time: "", location: "", requirements: "" });
            setStep(1);
            onClose();
        } else {
            alert("Failed to send quote. Try again.");
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: "rgba(255,255,255,0.0)" }}>
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg overflow-hidden">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">Book Free Consultation</h2>

                {/* Animate content, not container */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-medium mb-2">Step 1: Service Selection</h3>
                                <div className="space-y-2">
                                    {services.map((s) => (
                                        <button
                                            key={s.name}
                                            className={`w-full flex items-center p-3 border rounded-lg ${form.service === s.name ? "border-teal-600 bg-teal-50" : "border-gray-200"}`}
                                            onClick={() => setForm({ ...form, service: s.name })}
                                        >
                                            <span className="text-2xl mr-3">{s.icon}</span>
                                            <div className="text-left">
                                                <div className="font-medium">{s.name}</div>
                                                <div className="text-sm text-gray-500">Starting {s.price}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50"
                                        disabled={!form.service}
                                        onClick={() => setStep(2)}
                                    >
                                        Next →
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-medium mb-2">Step 2: Contact Details</h3>
                                <form
                                    className="space-y-3"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setStep(3);
                                    }}
                                >
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input type="text" name="name" placeholder="Your Name *" className="flex-1 border p-2 rounded-lg min-w-0" value={form.name} onChange={handleChange} required />
                                        <input type="text" name="phone" placeholder="Phone Number *" className="flex-1 border p-2 rounded-lg min-w-0" value={form.phone} onChange={handleChange} required />
                                    </div>
                                    <input type="email" name="email" placeholder="Email Address" className="w-full border p-2 rounded-lg" value={form.email} onChange={handleChange} />
                                    <input type="text" name="business" placeholder="Business/Organization Name" className="w-full border p-2 rounded-lg" value={form.business} onChange={handleChange} />

                                    <div className="flex justify-between mt-4">
                                        <button type="button" className="px-4 py-2 border rounded-lg" onClick={() => setStep(1)}>← Previous</button>
                                        <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg">Next →</button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-medium mb-2">Step 3: Project Details & Submit</h3>

                                <div className="space-y-3">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div className="flex-1 min-w-0">
                                            <label className="block text-sm font-medium mb-1">Preferred Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                className="w-full border p-2 rounded-lg"
                                                value={form.date || ""}
                                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <label className="block text-sm font-medium mb-1">Time Slot</label>
                                            <select
                                                name="time"
                                                className="w-full border p-2 rounded-lg"
                                                value={form.time || ""}
                                                onChange={(e) => setForm({ ...form, time: e.target.value })}
                                                required
                                            >
                                                <option value="">Select Time Slot</option>
                                                <option value="09:00-12:00">09:00 - 12:00</option>
                                                <option value="12:00-15:00">12:00 - 15:00</option>
                                                <option value="15:00-18:00">15:00 - 18:00</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Project Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            className="w-full border p-2 rounded-lg"
                                            placeholder="Enter project location"
                                            value={form.location || ""}
                                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Project Requirements</label>
                                        <textarea
                                            name="requirements"
                                            className="w-full border p-2 rounded-lg"
                                            placeholder="Enter project details"
                                            value={form.requirements || ""}
                                            onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                                            rows={3}
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 border rounded-lg w-full sm:w-auto"
                                            onClick={() => setStep(2)}
                                        >
                                            ← Previous
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-teal-600 text-white rounded-lg w-full sm:w-auto"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
