"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Check } from "lucide-react";

export default function PackageModal({ open, onOpenChange, selectedPackage }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    paymentMethod: "transfer",
  });
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const packages = {
    basic: {
      name: "Dasar",
      price: "Rp299.999",
      annualPrice: "Rp2.999.999",
      features: [
        "2 Cuci Dasar/bulan",
        "Pembersihan eksterior",
        "Diskon 15% layanan tambahan",
      ],
    },
    premium: {
      name: "Premium",
      price: "Rp499.999",
      annualPrice: "Rp4.999.999",
      features: [
        "4 Cuci Premium/bulan",
        "Vakum interior",
        "Diskon 25% layanan tambahan",
      ],
    },
    deluxe: {
      name: "Deluxe",
      price: "Rp799.999",
      annualPrice: "Rp7.999.999",
      features: [
        "Cuci Deluxe unlimited",
        "Detailing interior",
        "Diskon 35% layanan tambahan",
      ],
    },
  };

  const packageData = selectedPackage
    ? packages[selectedPackage]
    : packages.premium;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
    }, 1500);
  };

  const handleClose = () => {
    setFormData({ name: "", phone: "", email: "", paymentMethod: "transfer" });
    setBillingCycle("monthly");
    setIsComplete(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        {isComplete ? (
          <div className="space-y-4 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
            <DialogTitle>Berlangganan Berhasil!</DialogTitle>
            <DialogDescription>
              Terima kasih telah memilih paket {packageData.name}.
            </DialogDescription>
            <Button onClick={handleClose}>Tutup</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">
                Paket {packageData.name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold">{packageData.name}</h3>
                <p className="text-xl font-bold text-primary">
                  {billingCycle === "monthly"
                    ? packageData.price
                    : packageData.annualPrice}
                  <span className="text-sm font-normal text-gray-500">
                    /{billingCycle === "monthly" ? "bulan" : "tahun"}
                  </span>
                </p>
                <div className="grid gap-2 mt-2">
                  {packageData.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 mr-2 text-green-500" />{" "}
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit} className="grid gap-3">
                {Object.entries({
                  name: "Nama Lengkap",
                  email: "Email",
                  phone: "Nomor Telepon",
                }).map(([key, label]) => (
                  <div key={key} className="grid gap-1">
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                      required
                    />
                  </div>
                ))}
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMethod: value })
                  }
                >
                  {[
                    { value: "transfer", label: "Transfer Bank" },
                    { value: "credit", label: "Kartu Kredit" },
                    { value: "ewallet", label: "E-Wallet" },
                  ].map(({ value, label }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Memproses..." : "Berlangganan"}
                </Button>
              </form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
