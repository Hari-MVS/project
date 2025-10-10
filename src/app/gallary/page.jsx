// "use client";

// import { useState, useMemo, useCallback, useRef, useEffect } from "react";
// import Image from "next/image";
// import autoAnimate from "@formkit/auto-animate";
// import bk from "@/app/assets/Backlit Signage.jpeg";
// import led from "@/app/assets/LED Signage.jpeg";
// import tr from "@/app/assets/Terrace signage.jpeg";
// import er from "@/app/assets/Entrance Canopy.jpeg";
// import sign1 from "@/app/assets/Signage01.jpeg";
// import sign2 from "@/app/assets/Signage02.jpeg";
// import sign3 from "@/app/assets/Signage03.jpeg";

// const projects = [
//   { id: 1, category: ["LED"], title: "LED Signage", img: led },
//   { id: 2, category: ["BACKLIT"], title: "Backlit Signage", img: bk },
//   { id: 3, category: ["LED", "TERRACE"], title: "Entrance Canopy", img: er },
//   { id: 4, category: ["TERRACE"], title: "Terrace signage", img: tr },
//   { id: 5, category: ["BACKLIT"], title: "Project 5", img: er },
//   { id: 6, category: ["LED"], title: "Project 6", img: sign1 },
//   { id: 7, category: ["TERRACE"], title: "Project 7", img: sign2 },
//   { id: 8, category: ["BACKLIT", "LED"], title: "Project 8", img: sign3 },
// ];

// const categories = ["LED", "BACKLIT", "TERRACE"];

// export default function Gallery() {
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const parentRef = useRef(null);

//   // ✅ Initialize AutoAnimate
//   useEffect(() => {
//     if (parentRef.current) autoAnimate(parentRef.current);
//   }, []);

//   const toggleFilter = useCallback((category) => {
//     setSelectedFilters((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category)
//         : [...prev, category]
//     );
//   }, []);

//   const filteredProjects = useMemo(() => {
//     if (selectedFilters.length === 0) return projects;
//     return projects.filter((p) =>
//       selectedFilters.every((f) => p.category.includes(f))
//     );
//   }, [selectedFilters]);

//   return (
//     <section id="gallery" className="mt-12 px-5 md:px-10">
//       <h2 className="text-2xl font-semibold">Our Work Gallery</h2>
//       <p className="text-slate-500 mt-1">
//         Showcasing our expertise with live project updates
//       </p>

//       {/* Filters */}
//       <div className="mt-4 flex flex-wrap gap-2">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => toggleFilter(cat)}
//             className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
//               selectedFilters.includes(cat)
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Gallery Grid with AutoAnimate */}
//       <div
//         ref={parentRef}
//         className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
//       >
//         {filteredProjects.map((proj, index) => (
//           <div
//             key={proj.id}
//             className="group relative rounded-lg overflow-hidden aspect-[4/3] transition-all duration-500 ease-in-out hover:scale-[1.03]"
//           >
//             <Image
//               src={proj.img}
//               alt={proj.title}
//               width={400}
//               height={300}
//               className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
//               sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//               priority={index < 4}
//             />
//             <div className="absolute inset-0 flex items-end p-3">
//               <div className="bg-black/50 text-white text-xs rounded px-2 py-1">
//                 {proj.title}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import autoAnimate from "@formkit/auto-animate";
import bk from "@/app/assets/Backlit Signage.jpeg";
import led from "@/app/assets/LED Signage.jpeg";
import tr from "@/app/assets/Terrace signage.jpeg";
import er from "@/app/assets/Entrance Canopy.jpeg";
import sign1 from "@/app/assets/Signage01.jpeg";
import sign2 from "@/app/assets/Signage02.jpeg";
import sign3 from "@/app/assets/Signage03.jpeg";

const projects = [
  { id: 1, category: ["LED"], title: "LED Signage", img: led },
  { id: 2, category: ["BACKLIT"], title: "Backlit Signage", img: bk },
  { id: 3, category: ["LED", "TERRACE"], title: "Entrance Canopy", img: er },
  { id: 4, category: ["TERRACE"], title: "Terrace signage", img: tr },
  { id: 5, category: ["BACKLIT"], title: "Signage", img: er },
  { id: 6, category: ["LED"], title: "Signage", img: sign1 },
  { id: 7, category: ["TERRACE"], title: "Signage", img: sign2 },
  { id: 8, category: ["BACKLIT", "LED"], title: "Signage", img: sign3 },
];

const categories = ["LED", "BACKLIT", "TERRACE"];

export default function Gallery() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const parentRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Initialize AutoAnimate
  useEffect(() => {
    const initAutoAnimate = async () => {
      try {
        const autoAnimate = (await import("@formkit/auto-animate")).default;
        if (parentRef.current) {
          autoAnimate(parentRef.current);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load auto-animate:", error);
        setIsLoaded(true);
      }
    };
    initAutoAnimate();
  }, []);

  const toggleFilter = useCallback((category) => {
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedFilters.length === 0) return projects;
    return projects.filter((p) =>
      selectedFilters.every((f) => p.category.includes(f))
    );
  }, [selectedFilters]);

  return (
    <section id="gallery" className="mt-12 px-5 md:px-10">
      <h2 className="text-2xl font-semibold">Our Work <span className="gradient-blue-text shiny text-4xl font-semibold tracking-tight">Gallery</span></h2>
      <p className="text-slate-500 mt-1">
        Showcasing our expertise with live project updates
      </p>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleFilter(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilters.includes(cat)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div
        className={`py-12 px-4 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div
          ref={parentRef}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((proj, index) => (
            <div
              key={proj.id}
              className="group relative p-3 overflow-hidden aspect-[4/3] transition-all duration-500 ease-in-out hover:scale-[1.03]  backdrop-blur-lg border border-white/20 hover:shadow-2xl hover:border-white/40"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image */}
              <Image
                src={proj.img}
                alt={proj.title}
                width={400}
                height={300}
                className="object-cover w-full h-full transition-all duration-500 ease-in-out md:group-hover:scale-110
                [mask-image:linear-gradient(to_bottom,black_85%,transparent_95%),linear-gradient(to_right,black_90%,transparent_97%),linear-gradient(to_left,black_90%,transparent_99%)]
                [mask-composite:intersect]
                md:group-hover:[mask-image:none]"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 4}
              />

              {/* Title Section */}
              {/* On mobile: always visible (no animation) */}
              {/* On desktop: slide up on hover */}
              <div
                className="
                  absolute inset-0 flex items-end p-6 
                     to-transparent 
                  transition-transform duration-500 
                  md:translate-y-full md:group-hover:translate-y-0
                  sm:translate-y-0
                "
              >
                <div className="bg-black/40 text-white px-2 py-1 border border-white/30 text-center w-full sm:w-auto">
                  <h3 className="text-sm font-semibold">{proj.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
