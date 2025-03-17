"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Pelanggan Tetap",
      content:
        "Saya telah menggunakan SparkleWash selama lebih dari setahun, dan saya selalu terkesan dengan perhatian mereka terhadap detail. Mobil saya selalu terlihat seperti baru setelah layanan mereka!",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Anggota Bulanan",
      content:
        "Keanggotaan premium benar-benar sepadan. Saya mencuci mobil saya setiap minggu, dan tim selalu memberikan lebih dari yang diharapkan. Pembersihan interior sangat luar biasa.",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Pelanggan Baru",
      content:
        "Pertama kali menggunakan SparkleWash dan saya sudah berencana untuk mendaftar keanggotaan. Mereka teliti, profesional, dan mobil saya belum pernah terlihat lebih baik!",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg",
      rating: 4,
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Pemilik Bisnis",
      content:
        "Kami menggunakan SparkleWash untuk seluruh armada perusahaan kami. Layanan mereka konsisten, dapat diandalkan, dan mereka selalu mengakomodasi jadwal kami. Sangat direkomendasikan!",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate visible testimonials based on current index
  const getVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonials[currentIndex]];
    }

    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  };

  const resetAutoAdvanceTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      nextTestimonial();
    }, 5000);
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    resetAutoAdvanceTimer();
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    resetAutoAdvanceTimer();
  };

  // Set up auto-advance timer
  useEffect(() => {
    resetAutoAdvanceTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetAutoAdvanceTimer();
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Jangan hanya percaya kata-kata kami - dengarkan dari pelanggan yang
            puas
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute z-10 flex justify-between w-full px-4 -translate-y-1/2 top-1/2">
            <button
              onClick={prevTestimonial}
              className="p-2 transition-colors bg-white rounded-full shadow-md hover:bg-gray-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 transition-colors bg-white rounded-full shadow-md hover:bg-gray-100"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={`testimonial-group-${currentIndex}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`grid ${
                  isMobile ? "grid-cols-1" : "grid-cols-3"
                } gap-6`}
              >
                {getVisibleTestimonials().map((testimonial) => (
                  <TestimonialCard
                    key={`testimonial-${testimonial.id}-${currentIndex}`}
                    testimonial={testimonial}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 w-2 mx-1 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="w-12 h-12 mr-4">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700">{testimonial.content}</p>
      </CardContent>
    </Card>
  );
}
