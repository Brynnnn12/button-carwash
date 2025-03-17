"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipLoader } from "react-spinners";

const MapComponent = dynamic(() => import("@/components/map"), { ssr: false });

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 overflow-hidden bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Hubungi Kami</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Punya pertanyaan atau ingin membuat janji? Hubungi kami.
          </p>
        </motion.div>

        <div className="grid max-w-6xl grid-cols-1 gap-12 mx-auto lg:grid-cols-2">
          <div className="w-full h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Kirim Pesan</CardTitle>
                  <CardDescription>
                    Isi formulir di bawah ini dan kami akan menghubungi Anda
                    sesegera mungkin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center"
                    >
                      <h3 className="mb-2 text-xl font-semibold">
                        Pesan Terkirim!
                      </h3>
                      <p className="text-gray-600">
                        Terima kasih telah menghubungi kami. Kami akan segera
                        menghubungi Anda.
                      </p>
                      <Button
                        className="mt-6"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Kirim Pesan Lain
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama</Label>
                          <Input id="name" placeholder="Nama Anda" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Email Anda"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telepon</Label>
                        <Input id="phone" placeholder="Nomor telepon Anda" />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <ClipLoader size={20} color="#ffffff" />
                        ) : (
                          "Kirim Pesan"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="w-full h-full">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Lokasi Kami</CardTitle>
                  <CardDescription>
                    Temukan lokasi kami di peta berikut ini.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MapComponent />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
