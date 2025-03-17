"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Car, MapPin, Phone, User, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BookingDetailModal({ open, onOpenChange, booking }) {
  if (!booking) return null;

  // Status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Selesai</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500">Sedang Dikerjakan</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500">Akan Datang</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Dibatalkan</Badge>;
      case "confirmed":
        return <Badge className="bg-green-500">Terkonfirmasi</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Menunggu Konfirmasi</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            <span>Detail Booking</span>
            {getStatusBadge(booking.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="pb-4 mb-4 border-b">
            <h3 className="mb-2 text-lg font-semibold">{booking.service}</h3>
            <p className="text-sm text-gray-500">ID: {booking.id}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Pelanggan</p>
                <p className="text-gray-700">{booking.customer}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Telepon</p>
                <p className="text-gray-700">{booking.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Tanggal & Waktu</p>
                <p className="text-gray-700">
                  {booking.date}, {booking.time}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Car className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Kendaraan</p>
                <p className="text-gray-700">
                  {booking.car ||
                    `${booking.carType} (${booking.licensePlate})`}
                </p>
              </div>
            </div>

            {booking.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Lokasi</p>
                  <p className="text-gray-700">{booking.location}</p>
                </div>
              </div>
            )}

            {booking.price && (
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Harga</p>
                  <p className="text-gray-700">{booking.price}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          {booking.status === "upcoming" && <Button>Mulai Pengerjaan</Button>}
          {booking.status === "in-progress" && <Button>Selesaikan</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
