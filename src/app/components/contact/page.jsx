"use client";

import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [isMapVisible, setMapVisible] = useState(false);
  const mapRef = useRef(null);

  // Lazy-load Google Maps only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (mapRef.current) observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="mt-12 px-5 md:px-10 mb-20">
      <h2 className="text-2xl font-semibold">Get In Touch</h2>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <form className="bg-white p-6 rounded-2xl shadow space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-md"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-md"
          />
          <select className="w-full p-3 border rounded-md">
            <option>Service Interested In</option>
            <option>LED Signage Solutions</option>
            <option>ACP Elevation & Cladding</option>
            <option>Terrace LED Hoardings</option>
          </select>
          <textarea
            placeholder="Project Details"
            className="w-full p-3 border rounded-md h-28"
          />

          <div className="mt-4">
            <a
              href="mailto:info@vsignpvtltd.com"
              className="w-full block p-3 bg-slate-900 text-white rounded-lg text-center hover:bg-slate-800 transition-colors"
            >
              Email Us
            </a>
          </div>
        </form>

        {/* Office Info / Map */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <h3 className="font-semibold text-lg">Visit Our Office</h3>

          {/* Lazy-load map */}
          <div ref={mapRef} className="rounded-lg overflow-hidden h-48">
            {isMapVisible ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.698209312946!2d78.55738957501955!3d17.38565698350062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99b88fd6d6a5%3A0x8c6c2975f2f72454!2sSamathapuri%20Colony%2C%20Nagole%2C%20Hyderabad%2C%20Telangana%20500035!5e0!3m2!1sen!2sin!4v1698765432107!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0 rounded-lg"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VSign Office Location"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                Loading Map...
              </div>
            )}
          </div>

          <p className="text-sm text-slate-600">
            Plot No. 27 & 28, Samathapuri Colony, Nagole, Hyderabad - 500035
          </p>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://maps.google.com/?q=Plot+No.+27+%26+28,+Samathapuri+Colony,+Nagole,+Hyderabad+-+500035"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              Get Directions
            </a>

            <a
              href="https://wa.me/919949066700"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444" />
              </svg>
              WhatsApp
            </a>
          </div>

          <div className="space-y-2 text-sm text-slate-600 mt-4">
            <div className="flex items-center gap-2">
              <span>Phone:</span>
              <div className="flex gap-2">
                <a href="tel:+919949066700" className="text-blue-600 hover:text-blue-800">
                  +91 99490 66700
                </a>
                <span>|</span>
                <a href="tel:+919908706363" className="text-blue-600 hover:text-blue-800">
                  +91 99087 06363
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span>Email:</span>
              <a href="mailto:info@vsignpvtltd.com" className="text-blue-600 hover:text-blue-800">
                info@vsignpvtltd.com
              </a>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span>Open:</span>
                <span>Mon-Sat 9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span>Holiday:</span>
                <span className="text-red-500">Sunday</span>
              </div>
            </div>

            <div className="text-green-600 font-medium">Response within 2 hours</div>
          </div>
        </div>
      </div>
    </section>
  );
}
