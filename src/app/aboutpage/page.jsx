"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function  AboutSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 }
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const milestones = [
    { year: "2005", title: "Company Founded", desc: "Started with a vision to revolutionize signage in Hyderabad" },
    { year: "2010", title: "First Major Contract", desc: "Secured partnership with leading retail chains" },
    { year: "2020", title: "Premium Clients", desc: "IKEA, Mahindra, ITC Hotels became our trusted partners" },
    { year: "2024", title: "Digital Transformation", desc: "Leading with smart LED solutions and IoT integration" },
  ];

  const features = [
    { icon: "🏆", title: "ISO Certified Quality", desc: "Premium materials with extended 3-year warranty coverage" },
    { icon: "⚡", title: "Fast Delivery", desc: "Express installation within 24-48 hours for urgent projects" },
    { icon: "🔧", title: "24/7 Support", desc: "Round-the-clock maintenance and technical support services" },
  ];

  const team = [
    {
      name: "Ananya Reddy",
      role: "CEO & Visionary",
      desc: "Leading creative innovation, guiding the team to think outside the box and deliver futuristic signage solutions.",
      img: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "Rohan Gupta",
      role: "Lead Developer",
      desc: "Building robust digital solutions, integrating smart technologies with client-focused experiences.",
      img: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Meera Singh",
      role: "Creative Designer",
      desc: "Transforming ideas into vibrant visuals, making branding and signage visually unforgettable.",
      img: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Arjun Kumar",
      role: "Innovation Strategist",
      desc: "Bringing crazy, out-of-the-box concepts to life while maintaining practical implementation.",
      img: "https://i.pravatar.cc/150?img=56",
    },
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-slate-900 to-emerald-900 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
            <Link href="/"><span>Home</span></Link> 
            <span>›</span>
            <span className="text-white">About Us</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">About V Sign Enterprises</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Established 2005 | Trusted by Leading Brands | 4.2★ Rating
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={container}
        // initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Introduction */}
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Since 2005, V Sign Enterprises has been a pioneer in the LED signage and ACP elevation industry in Hyderabad, Telangana.
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto">
            We specialize in creating impactful brand identities through innovative signage solutions that captivate audiences and drive business growth.
          </p>
        </motion.div>

        {/* Milestones */}
        <motion.div variants={item} className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Journey</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-2">{milestone.year}</div>
                <h4 className="font-semibold text-slate-900 mb-2">{milestone.title}</h4>
                <p className="text-slate-600 text-sm">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={item} className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div variants={container}>
          <motion.h2 variants={item} className="text-3xl font-bold text-slate-900 mb-6 text-center">
            About Our Team
          </motion.h2>
          <motion.p variants={item} className="text-slate-600 text-lg mb-12 text-center max-w-3xl mx-auto">
            Meet the creative minds behind V Sign Enterprises — pushing boundaries, thinking big, and crafting extraordinary branding experiences.
          </motion.p>

          <motion.div variants={container} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden cursor-pointer"
              >
                <span className="absolute -top-4 -left-4 w-10 h-10 bg-emerald-200 rounded-full opacity-40 animate-pulse"></span>
                <span className="absolute -bottom-4 -right-6 w-16 h-16 bg-emerald-100 rounded-full opacity-30 animate-pulse"></span>

                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
                />
                <div className="font-semibold text-lg text-center">{member.name}</div>
                <div className="text-emerald-600 text-sm mb-2 text-center">{member.role}</div>
                <p className="text-slate-600 text-sm text-center">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}