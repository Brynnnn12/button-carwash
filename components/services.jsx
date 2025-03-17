"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Droplets,
  Sparkles,
  Shield,
  Brush,
  SprayCanIcon as Spray,
  Car,
} from "lucide-react";

export default function Services() {
  const [activeTab, setActiveTab] = useState("exterior");

  const services = {
    exterior: [
      {
        icon: <Droplets className="h-10 w-10" />,
        title: "Cuci Luar",
        description:
          "Cuci eksterior dengan sabun berkualitas tinggi, pembersihan roda, dan pengeringan manual",
        price: "Rp25.000",
        time: "15 menit",
      },
      {
        icon: <Sparkles className="h-10 w-10" />,
        title: "Cuci Biasa",
        description:
          "Cuci dasar plus semir ban, perlindungan lilin, dan cuci bagian bawah mobil",
        price: "Rp55.000",
        time: "25 menit",
      },
      {
        icon: <Shield className="h-10 w-10" />,
        title: "Cuci Premium",
        description:
          "Cuci premium plus sealant cat, pelindung hujan, dan poles busa tiga lapis",
        price: "Rp80.000",
        time: "35 menit",
      },
    ],
    interior: [
      {
        icon: <Brush className="h-10 w-10" />,
        title: "Interior Dasar",
        description: "Vakum, pembersihan dashboard, dan pembersihan jendela",
        price: "Rp200.000",
        time: "20 menit",
      },
      {
        icon: <Spray className="h-10 w-10" />,
        title: "Interior Premium",
        description:
          "Interior dasar plus pembersihan kursi, shampo karpet, dan pengharum",
        price: "Rp400.000",
        time: "45 menit",
      },
      {
        icon: <Car className="h-10 w-10" />,
        title: "Interior Deluxe",
        description:
          "Interior premium plus perawatan kulit, penghilang noda, dan sanitasi",
        price: "Rp600.000",
        time: "60 menit",
      },
    ],
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami menawarkan berbagai layanan cuci mobil dan detailing untuk
            menjaga kendaraan Anda tetap terlihat terbaik
          </p>
        </motion.div>

        <Tabs
          defaultValue="exterior"
          className="w-full max-w-4xl mx-auto"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="exterior">Layanan Eksterior</TabsTrigger>
              <TabsTrigger value="interior">Layanan Interior</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="exterior">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {services.exterior.map((service, index) => (
                <motion.div key={index} variants={item}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="interior">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {services.interior.map((service, index) => (
                <motion.div key={index} variants={item}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-center mb-4 text-primary">
          {service.icon}
        </div>
        <CardTitle className="text-center text-xl">{service.title}</CardTitle>
        <CardDescription className="text-center">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-primary">{service.price}</div>
          <div className="text-sm text-gray-500">{service.time}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Pesan Sekarang</Button>
      </CardFooter>
    </Card>
  );
}
