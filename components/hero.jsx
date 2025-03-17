"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/header";
import LoadingSpinner from "@/components/loading-spinner";
import BookingModal from "@/components/booking-modal";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Daftar gambar untuk slider
  const slides = [
    {
      image:
        "https://www.shutterstock.com/image-photo/red-sportscars-wheels-covered-shampoo-600nw-2287564577.jpg",
      title: "Layanan Cuci Mobil Profesional",
      description:
        "Cuci mobil dan detailing premium untuk menjaga kendaraan Anda tetap terlihat terbaik",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/car-wash-expert-using-water-600nw-2287564617.jpg",
      title: "Interior Bersih & Segar",
      description:
        "Buat interior mobil Anda terlihat seperti baru dengan layanan pembersihan premium kami",
    },
    {
      image:
        "https://www.shutterstock.com/shutterstock/videos/1100395861/thumb/1.jpg?ip=x480",
      title: "Eksterior Mengkilap",
      description:
        "Dapatkan kilau eksterior yang tahan lama dengan treatment khusus dari ahli kami",
    },
  ];

  // Efek untuk loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Efek untuk slider otomatis
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoading, slides.length]);

  // Fungsi untuk navigasi slider
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-cyan-500">
        <LoadingSpinner size={60} color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slider Background Images */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('${slides[currentSlide].image}')`,
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/80" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Hidden on small screens */}
      <div className="absolute inset-0 z-10 items-center justify-between hidden px-4 md:flex">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 text-white rounded-full bg-white/20 hover:bg-white/40"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 text-white rounded-full bg-white/20 hover:bg-white/40"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      <Header />

      <div className="container relative z-10 flex items-center justify-center h-full px-4 mx-auto">
        <div className="max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 className="px-2 mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p className="px-4 mb-6 text-base text-gray-200 sm:text-lg md:text-xl md:mb-8">
                {slides[currentSlide].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center gap-3 px-4 sm:flex-row sm:gap-4"
          >
            <Button
              size="lg"
              className="text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3"
              onClick={() => setShowBookingModal(true)}
            >
              Pesan Sekarang
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base md:text-lg text-gray-800 border-white hover:bg-white/10 px-6 md:px-8 py-2.5 md:py-3"
            >
              Layanan Kami
            </Button>
          </motion.div>

          {/* Slider Dots */}
          <div className="flex justify-center mt-6 md:mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 md:h-3 w-2 md:w-3 mx-1 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-white scale-100"
                    : "bg-white/50 scale-75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        open={showBookingModal}
        onOpenChange={setShowBookingModal}
      />
    </div>
  );
}
