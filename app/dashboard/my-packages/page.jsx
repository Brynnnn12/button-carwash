"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import UsePackageModal from "@/components/dashboard/use-package-modal";

export default function MyPackagesPage() {
  const [showUsePackageModal, setShowUsePackageModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Data paket pengguna
  const packages = [
    {
      id: "PKT-123",
      name: "Paket Komplit",
      purchased: "10 Jul 2023",
      expires: "10 Sep 2023",
      remaining: [
        { service: "Cuci Premium", used: 1, total: 2 },
        { service: "Interior Dasar", used: 0, total: 1 },
        { service: "Semir Ban", used: 0, total: 1 },
      ],
    },
  ];

  const handleUsePackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowUsePackageModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Paket Saya</h1>
          <p className="text-gray-500">Kelola paket cuci mobil Anda</p>
        </div>
        <Button asChild>
          <Link href="/pricing">
            <Package className="w-4 h-4 mr-2" />
            Beli Paket
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <Card key={pkg.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{pkg.name}</CardTitle>
                  <Badge className="bg-green-500">Aktif</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 border rounded-md">
                    <p className="text-sm text-gray-500">Tanggal Pembelian</p>
                    <p className="font-medium">{pkg.purchased}</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <p className="text-sm text-gray-500">Berlaku Hingga</p>
                    <p className="font-medium">{pkg.expires}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Sisa Layanan</h3>
                  {pkg.remaining.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-2 border-b last:border-0"
                    >
                      <span>{item.service}</span>
                      <span className="font-medium">
                        {item.total - item.used} dari {item.total}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleUsePackage(pkg)}
                >
                  Gunakan Paket
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-12 h-12 mb-4 text-gray-300" />
              <p className="mb-2 text-xl font-medium">Tidak Ada Paket Aktif</p>
              <p className="mb-6 text-center text-gray-500">
                Anda belum memiliki paket cuci mobil yang aktif
              </p>
              <Button asChild>
                <Link href="/pricing">Beli Paket Sekarang</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal */}
      <UsePackageModal
        open={showUsePackageModal}
        onOpenChange={setShowUsePackageModal}
        packageData={selectedPackage}
      />
    </div>
  );
}
