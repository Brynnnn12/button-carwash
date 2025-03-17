"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Car, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import BookingDetailModal from "@/components/dashboard/booking-detail-modal";
import CancelBookingModal from "@/components/dashboard/cancel-booking-modal";

export default function MyBookingsPage() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Data booking pengguna
  const bookings = [
    {
      id: "B-1237",
      service: "Cuci Premium",
      date: "18 Jul 2023",
      time: "10:00",
      status: "confirmed",
      car: "Toyota Avanza",
      licensePlate: "B 1234 ABC",
      location: "SparkleWash Pusat",
      price: "Rp250.000",
    },
    {
      id: "B-1242",
      service: "Interior Dasar",
      date: "25 Jul 2023",
      time: "14:30",
      status: "pending",
      car: "Toyota Avanza",
      licensePlate: "B 1234 ABC",
      location: "SparkleWash Pusat",
      price: "Rp200.000",
    },
  ];

  // Status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Terkonfirmasi</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Menunggu Konfirmasi</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Selesai</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Dibatalkan</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const handleViewDetail = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowCancelModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Booking Saya</h1>
          <p className="text-gray-500">Kelola semua booking cuci mobil Anda</p>
        </div>
        <Button asChild>
          <Link href="/services">
            <Calendar className="w-4 h-4 mr-2" />
            Booking Baru
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{booking.service}</CardTitle>
                    <p className="text-sm text-gray-500">{booking.id}</p>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Tanggal & Waktu</p>
                      <p className="text-gray-500">
                        {booking.date}, {booking.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Kendaraan</p>
                      <p className="text-gray-500">
                        {booking.car} ({booking.licensePlate})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Lokasi</p>
                      <p className="text-gray-500">{booking.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-bold">{booking.price}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleViewDetail(booking)}
                  >
                    Detail
                  </Button>
                  {booking.status === "confirmed" && (
                    <Button
                      variant="outline"
                      className="text-red-500"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Batalkan
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="w-12 h-12 mb-4 text-gray-300" />
              <p className="mb-2 text-xl font-medium">Tidak Ada Booking</p>
              <p className="mb-6 text-center text-gray-500">
                Anda belum memiliki booking yang akan datang
              </p>
              <Button asChild>
                <Link href="/services">Booking Sekarang</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <BookingDetailModal
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        booking={selectedBooking}
      />
      <CancelBookingModal
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        bookingId={selectedBookingId}
      />
    </div>
  );
}
