import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ServiceCard from "./ServiceCard";
import assets from "../../assets";

const ServicesScroll = () => {
  const scrollRef = useRef(null);
  const [cardsPerPage, setCardsPerPage] = useState(3); // default for large screens
  const [currentPage, setCurrentPage] = useState(0);

  const cardWidth = 210;
  const gap = 16; // Tailwind's default `gap-4` = 1rem = 16px

  const cards = [
    {
      img: assets.frontend,
      title: "frontend",
      description:
        "I build clean, responsive, and dynamic UIs using modern frontend technologies like React, Tailwind CSS, and JavaScript.",
    },
    {
      img: assets.backend,
      title: "backend",
      description:
        "I develop secure and scalable backend systems using Node.js and Express, with RESTful APIs and structured architecture.",
    },
    {
      img: assets.fullStack,
      title: "full stack",
      description:
        "I can build complete MERN stack applications handling both frontend and backend, including authentication and APIs.",
    },
    {
      img: assets.deployment,
      title: "deployment",
      description:
        "I deploy full-stack projects on platforms like Render, Vercel, or Netlify, integrated with MongoDB Atlas or Cloudinary.",
    },
    {
      img: assets.api,
      title: "api integration",
      description:
        "I integrate third-party APIs like weather data, payments, or storage, and can build custom endpoints with secure handling.",
    },
    {
      img: assets.uiUx,
      title: "ui ux",
      description:
        "I improve UX with transitions, dark mode, accessibility, and performance optimization techniques like lazy loading.",
    },
  ];

  // Update cardsPerPage based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setCardsPerPage(1);
      } else if (width >= 480 && width < 768) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    handleResize(); // Call on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const scrollToPage = (pageIndex) => {
    const container = scrollRef.current;
    const scrollAmount = pageIndex * (cardWidth + gap) * cardsPerPage;
    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    setCurrentPage(pageIndex);
  };

  const scrollLeft = () => {
    if (currentPage > 0) {
      scrollToPage(currentPage - 1);
    }
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1) {
      scrollToPage(currentPage + 1);
    }
  };

  return (
    <div className="relative w-[220px] md:w-[425px] lg:w-[675px] max-w-[1000px] mx-auto">
      {/* Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 -left-12  z-10 transform -translate-y-1/2 bg-white text-fuchsia-800 p-2 rounded-full shadow-md hover:bg-fuchsia-200 transition"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={scrollRight}
        className="absolute top-1/2 -right-8 md:-right-12 lg:-right-8 z-10 transform -translate-y-1/2 bg-white text-fuchsia-800 p-2 rounded-full shadow-md hover:bg-fuchsia-200 transition"
      >
        <FaChevronRight />
      </button>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll scroll-smooth scrollbar-hide px-20 py-8"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              scrollSnapAlign: "start",
              width: `${cardWidth}px`,
              flexShrink: 0,
            }}
          >
            <ServiceCard {...card} />
          </div>
        ))}
      </div>

      {/* Dot Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentPage === i
                ? "bg-fuchsia-600 w-6 scale-110"
                : "bg-white opacity-50 w-3 hover:opacity-80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesScroll;
