// app/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import QuoteModal from "../model/page";
import Gallery from "@/app/gallary/page";
import PreviewServices from "../services/previewServices";
import Hero from "../hero/page";
import faqsData from "../../../data/faq.json";
import Services from "../popularServices/page";
import Reviews from "../review/page";
import Contact from "../contact/page";
import HeroContent from "../heroContent/page";
import FaqModal from "../faq/page";
import AnimatedLine from "../line/page";
import AboutPreview from "@/app/about/page";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setFaqs(faqsData);

    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <>
      <Hero openModal={openModal} />
      <HeroContent />
      <AnimatedLine />
      <Services openModal={openModal} />
      <QuoteModal isOpen={isModalOpen} onClose={closeModal} />
      <PreviewServices />
      <AnimatedLine />
      <Gallery />
      <AnimatedLine />
      <AboutPreview />
      <Reviews />
      <AnimatedLine />
      <Contact />
      {showButton && (
        <button
          className="cursor-pointer fixed bottom-8 right-8 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 z-40 transition-opacity duration-300"
          onClick={() => setIsFaqOpen(true)}
        >
          FAQs
        </button>
      )}
      <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} faqs={faqs} />
    </>
  );
}
