"use client";

import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ChevronDown, X } from "lucide-react";

export default function FAQModal({ isOpen, onClose, faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [parent] = useAutoAnimate(); // For FAQ list animation

  if (!isOpen) return null;

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-gray-900/70 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200 animate-modal-show"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                Find answers to common questions
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* FAQ Content */}
        <div
          ref={parent}
          className="p-6 max-h-[60vh] overflow-y-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-600 text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="text-gray-900 font-medium">{faq.question}</span>
                </div>
                <div
                  className={`ml-2 p-1 rounded-lg bg-gray-100 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown size={18} className="text-gray-600" />
                </div>
              </button>

              {/* Answer */}
              <div
                className={`px-5 pb-4 ml-10 border-l-2 border-gray-300 overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-5 flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            Still have questions? We're here to help.
          </p>
          <button className="px-5 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-white font-medium transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
