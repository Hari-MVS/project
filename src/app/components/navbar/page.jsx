"use client";
import React, { useState, useEffect, } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const menuItems = [
    {
        id: "architectural-signage",
        title: "Architectural Signage",
        children: [
            {
                title: "Modular Sign System",
                children: [
                    { title: "Modular Plus Indoor", href: "#modular-indoor" },
                    { title: "Modular Plus Outdoor", href: "#modular-outdoor" },
                ],
            },
            {
                title: "Flexible Sign System",
                children: [
                    { title: "I-Sign Fix", href: "#isign-fix" },
                    { title: "I-Sign Display", href: "#isign-display" },
                    { title: "I-Sign Flex Site", href: "#isign-flexsite" },
                    { title: "Strato", href: "#strato" },
                ],
            },
            {
                title: "Pylon",
                children: [
                    { title: "Modular Pylon", href: "#modular-pylon" },
                    { title: "Totem", href: "#totem" },
                ],
            },
            { title: "Illuminated Light Signs", href: "#illuminated-lightsigns" },
            { title: "Light Box", href: "#light-box" },
        ],
    },
    {
        id: "display-products",
        title: "Display Products",
        children: [
            { title: "Opti Frame", href: "#opti-frame" },
            { title: "Fabric Frame", href: "#fabric-frame" },
            { title: "Art Frame", href: "#art-frame" },
            { title: "LED Thinlite", href: "#led-thinlite" },
        ],
    },
    {
        id: "industries",
        title: "Industries",
        children: [
            { title: "Hospital", href: "#hospital" },
            { title: "Education", href: "#education" },
            { title: "Corporate Offices", href: "#corporate-offices" },
            { title: "Industry Signages", href: "#industry-signages" },
            { title: "Banking", href: "#banking" },
            { title: "Public Infrastructure", href: "#public-infrastructure" },
            { title: "Residential Real-State", href: "#residential-realstate" },
            { title: "Retail", href: "#retail" },
        ],
    },
    {
        id: "our-services",
        title: "Our Services",
        children: [
            { title: "Led Signages", href: "#led-signages" },
            { title: "Glow Sign Boards", href: "#glow-signboards" },
            { title: "Eco Solvent Printing", href: "#eco-solvent" },
            { title: "One Way Vision Front & Backlit", href: "#oneway-vision" },
            { title: "Brochures", href: "#brochure" },
            { title: "Letterheads", href: "#letterheads" },
            { title: "Multi-Color Printing", href: "#multicolor" },
            { title: "Vinyl Printing", href: "#vinyl" },
            { title: "Visiting Cards", href: "#visiting-cards" },
        ],
    },
    { title: "Gallery", href: "/gallary" },
    { title: "About", href: "/about/aboutpage" },
];

// 🌿 MOBILE MENU ITEM
function MobileMenuItem({ item, level = 0, setIsOpen }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`border-b border-slate-200 pl-${level * 4}`}>
            {item.children ? (
                <>
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-full flex justify-between items-center py-3 text-left text-slate-800 font-medium"
                    >
                        {item.title}
                        <span
                            className={`transform transition-transform duration-200 ${open ? "rotate-90" : ""
                                }`}
                        >
                            ▶
                        </span>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <div>
                            {item.children.map((child, idx) => (
                                <MobileMenuItem
                                    key={idx}
                                    item={child}
                                    level={level + 1}
                                    setIsOpen={setIsOpen} // pass it down
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <Link
                    href={item.href.startsWith("#") ? item.href.replace("#", "/menu/") : item.href}
                    onClick={() => {
                        // close submenu and close full mobile drawer before navigation
                        setOpen(false);
                        if (typeof setIsOpen === "function") setIsOpen(false);
                        // ensure body scroll is restored just in case
                        if (typeof window !== "undefined") document.body.style.overflow = "";
                    }}
                    className="block py-3 text-slate-700 hover:text-slate-900 transition-colors"
                >
                    {item.title}
                </Link>
            )}
        </div>
    );
}



// 🌿 MOBILE MENU CONTAINER
function MobileMenu({ isOpen, setIsOpen }) {
    // const [parent] = useAutoAnimate({ duration: 250, easing: "ease-in-out" });

    const pathname = usePathname();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            // always restore on unmount
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // If the route changes (navigation), ensure drawer is closed and scroll restored
    useEffect(() => {
        // path changed -> close drawer (if open) and restore scrolling
        if (isOpen) setIsOpen(false);
        document.body.style.overflow = "";
        // no cleanup needed here
    }, [pathname]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            />
            {/* Sliding Menu */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-4">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mb-4 text-slate-800 font-bold w-full py-2 rounded-md hover:bg-slate-100"
                    >
                        ✕ Close
                    </button>

                    {menuItems.map((item, idx) => (
                        <MobileMenuItem key={idx} item={item} setIsOpen={setIsOpen} />
                    ))}
                </div>
            </div>
        </>
    );
}

// 🌿 DESKTOP DROPDOWN
function Dropdown({ items }) {
    return (
        <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg border border-slate-200 
      opacity-0 scale-y-0 origin-top transition-all duration-200 ease-out 
      group-hover:opacity-100 group-hover:scale-y-100 z-50 pointer-events-none group-hover:pointer-events-auto">
            <div className="py-2">
                {items.map((item, i) =>
                    item.children ? (
                        <div key={i} className="relative group/sub">
                            <button className="flex items-center justify-between w-full px-4 py-2 hover:bg-slate-50">
                                {item.title}
                                <svg
                                    className="w-4 h-4 transition-transform duration-200 group-hover/sub:rotate-90"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                            <div className="absolute left-full top-0 w-52 bg-white rounded-md shadow-lg border border-slate-200
                opacity-0 scale-y-0 origin-top-left transition-all duration-200 ease-out
                group-hover/sub:opacity-100 group-hover/sub:scale-y-100 pointer-events-none group-hover:pointer-events-auto">
                                <Dropdown items={item.children} />
                            </div>
                        </div>
                    ) : (
                        <a
                            key={i}
                            href={`/menu/${item.href.replace("#", "")}`}
                            className="block px-4 py-2 hover:bg-slate-50"
                        >
                            {item.title}
                        </a>
                    )
                )}
            </div>
        </div>
    );
}

// 🌿 MAIN HEADER
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 bg-white/95 md:bg-white/70 md:backdrop-blur-md border-b border-slate-200">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <img
                            src="/logo2.jpg"
                            alt="V Sign Enterprises"
                            className="h-15 sm:h-16 w-auto object-contain"
                            loading="lazy"
                        />

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex items-center gap-6 text-sm lg:text-base text-slate-700">
                            {menuItems.map((item, i) =>
                                item.children ? (
                                    <div key={i} className="relative group">
                                        <button className="flex items-center gap-1 hover:text-slate-900 py-2">
                                            {item.title}
                                            <svg
                                                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                        <Dropdown items={item.children} />
                                    </div>
                                ) : (
                                    <a
                                        key={i}
                                        href={item.href.startsWith("#") ? `/menu/${item.href.replace("#", "")}` : item.href}
                                        className="block px-4 py-2 hover:bg-slate-50"
                                    >
                                        {item.title}
                                    </a>
                                )
                            )}
                        </nav>

                        {/* Mobile Button */}
                        <button
                            className="md:hidden p-2 rounded-md bg-slate-100"
                            onClick={() => setMenuOpen(true)}
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </>
    );
}
