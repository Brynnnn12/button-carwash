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
import { Check } from "lucide-react";
import PackageModal from "@/components/package-modal";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const plans = [
    {
      id: "basic",
      name: "Dasar",
      description: "Sempurna untuk cuci mobil sesekali",
      monthlyPrice: 299.999,
      annualPrice: 2999.999,
      features: [
        "2 Cuci Dasar per bulan",
        "Pembersihan eksterior",
        "Pembersihan roda",
        "Pengeringan manual",
        "Diskon 15% untuk layanan tambahan",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      description: "Paket paling populer kami",
      monthlyPrice: 499.999,
      annualPrice: 4999.999,
      features: [
        "4 Cuci Premium per bulan",
        "Vakum interior",
        "Pembersihan dashboard",
        "Pembersihan jendela",
        "Semir ban",
        "Diskon 25% untuk layanan tambahan",
      ],
      popular: true,
    },
    {
      id: "deluxe",
      name: "Deluxe",
      description: "Perawatan lengkap untuk kendaraan Anda",
      monthlyPrice: 799.999,
      annualPrice: 7999.999,
      features: [
        "Cuci Deluxe tidak terbatas",
        "Detailing interior lengkap",
        "Shampo karpet",
        "Perawatan kulit",
        "Perlindungan cat",
        "Diskon 35% untuk layanan tambahan",
      ],
      popular: false,
    },
  ];

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
    setShowPackageModal(true);
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
    <section id="pricing" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Paket Keanggotaan
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Pilih paket keanggotaan dan hemat untuk cuci mobil rutin
          </p>

          <div className="flex items-center justify-center mt-8">
            <span
              className={`mr-3 text-lg ${
                !isAnnual ? "font-semibold text-primary" : "text-gray-500"
              }`}
            >
              Bulanan
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex items-center w-12 h-6 transition-colors bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 text-lg ${
                isAnnual ? "font-semibold text-primary" : "text-gray-500"
              }`}
            >
              Tahunan{" "}
              <span className="text-sm font-medium text-green-500">
                (Hemat 20%)
              </span>
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={item} className="flex">
              <Card
                className={`flex flex-col h-full w-full transition-all ${
                  plan.popular ? "border-primary shadow-lg relative" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 px-4 py-1 text-sm font-medium text-white transform -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 bg-primary">
                    Paling Populer
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6 text-center">
                    <span className="text-4xl font-bold">
                      Rp
                      {isAnnual
                        ? plan.annualPrice.toFixed(3)
                        : plan.monthlyPrice.toFixed(3)}
                    </span>
                    <span className="text-gray-500">
                      /{isAnnual ? "tahun" : "bulan"}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular ? "" : "bg-blue-500/90 hover:bg-blue-700"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPackage(plan.id)}
                  >
                    Pilih Paket
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <PackageModal
        open={showPackageModal}
        onOpenChange={setShowPackageModal}
        selectedPackage={selectedPackage}
      />
    </section>
  );
}
