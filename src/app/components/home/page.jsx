"use client";
import React, { useState, useEffect } from "react";
import QuoteModal from "../model/page";
import Gallery from "@/app/gallary/page";
import PreviewServices from "../services/previewServices";
import Hero from "../hero/page";
import faqsData from "../../../data/faq.json";

// Import the new components
import Services from "../popularServices/page";
import Reviews from "../review/page";
import Contact from "../contact/page";
import Footer from "../footer/page";
import HeroContent from "../heroContent/page";
import FaqModal from "../faq/page";
import Header from "../navbar/page";
import PriceModal from "../priceModel/page";
import  AboutPreview  from "@/app/about/page";
import AnimatedLine from "../line/page";
// import MenuContent from "../menuContent/page";

export default function VSignLanding() {


    //Quote modal values
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Price Modal values
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    const [priceModalData, setPriceModalData] = useState(null);

    const openPriceModal = (data) => {
        setPriceModalData(data);
        setIsPriceModalOpen(true);
    };

    const closePriceModal = () => {
        setIsPriceModalOpen(false);
        setPriceModalData(null);
    };

    // FAQ values
    const [isFaqOpen, setIsFaqOpen] = useState(false);
    const [faqs, setFaqs] = useState([]);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) setShowButton(true);
            else setShowButton(false);
        };

        // Use imported data directly
        setFaqs(faqsData);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
            <Header />

            <Hero openModal={openModal} />
            
            <main className="mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section with Pricing Calculator */}
                <HeroContent onGetQuote={openPriceModal} />
                <AnimatedLine />


                <Services openModal={openModal} />
                


                {/* Quote Modal - Fixed usage with proper props */}
                <QuoteModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                // Add any other props that your QuoteModal component expects
                />

                <PreviewServices />
                <AnimatedLine />

                <Gallery />
                <AnimatedLine />


                
                <AboutPreview />


                <Reviews />
                <AnimatedLine />

                <Contact />

                {/* <MenuContent /> */}
            </main>


            <PriceModal
                isOpen={isPriceModalOpen}
                onClose={closePriceModal}
                priceData={priceModalData}
            />

            {/* Floating FAQ Button */}
            {showButton && (
                <button
                    className="cursor-pointer fixed bottom-8 right-8 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 z-40 transition-opacity duration-300"
                    onClick={() => setIsFaqOpen(true)}
                >
                    FAQs
                </button>
            )}
            {/* FAQ Modal */}
            <FaqModal
                isOpen={isFaqOpen}
                onClose={() => setIsFaqOpen(false)}
                faqs={faqs}
            />

            <Footer />
        </div>
    );
}