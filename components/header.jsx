"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Beranda", href: "#" },
    { name: "Layanan", href: "#services" },
    { name: "Harga", href: "#pricing" },
    { name: "Testimoni", href: "#testimonials" },
    { name: "Kontak", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-blue-500">
              Buton Carwash
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-6 md:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-800 hover:text-primary"
                    : "text-white hover:text-primary-foreground"
                }`}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex space-x-2"
            >
              <Button
                variant="outline"
                className={
                  isScrolled
                    ? "border-gray-300 text-gray-800"
                    : "border-white text-geay-800"
                }
                onClick={() => setShowLoginModal(true)}
              >
                Masuk
              </Button>
              <Button onClick={() => setShowRegisterModal(true)}>Daftar</Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant=""
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? "text-gray-800" : "text-white"}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white md:hidden"
          >
            <div className="container flex flex-col px-4 py-4 mx-auto space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="py-2 font-medium text-gray-800 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowLoginModal(true);
                  }}
                >
                  Masuk
                </Button>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowRegisterModal(true);
                  }}
                >
                  Daftar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Modals */}
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      <RegisterModal
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
      />
    </>
  );
}
