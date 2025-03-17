"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import CreateBookingModal from "@/components/dashboard/create-booking-modal";
import BookingDetailModal from "@/components/dashboard/booking-detail-modal";
import CancelBookingModal from "@/components/dashboard/cancel-booking-modal";

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Data booking
  const bookings = [
    {
      id: "B-1245",
      customer: "Budi Santoso",
      service: "Cuci Premium",
      date: "16 Jul 2023",
      time: "10:00",
      status: "completed",
      phone: "081234567890",
      carType: "Toyota Avanza",
      licensePlate: "B 1234 ABC",
    },
    {
      id: "B-1246",
      customer: "Siti Rahayu",
      service: "Interior Premium",
      date: "16 Jul 2023",
      time: "11:30",
      status: "completed",
      phone: "081234567891",
      carType: "Honda Jazz",
      licensePlate: "B 2345 DEF",
    },
    {
      id: "B-1247",
      customer: "Ahmad Hidayat",
      service: "Cuci Deluxe",
      date: "16 Jul 2023",
      time: "13:00",
      status: "in-progress",
      phone: "081234567892",
      carType: "Mitsubishi Xpander",
      licensePlate: "B 3456 GHI",
    },
    {
      id: "B-1248",
      customer: "Dewi Lestari",
      service: "Cuci Dasar",
      date: "16 Jul 2023",
      time: "14:30",
      status: "upcoming",
      phone: "081234567893",
      carType: "Daihatsu Terios",
      licensePlate: "B 4567 JKL",
    },
    {
      id: "B-1249",
      customer: "Rudi Hartono",
      service: "Interior Dasar",
      date: "16 Jul 2023",
      time: "16:00",
      status: "upcoming",
      phone: "081234567894",
      carType: "Suzuki Ertiga",
      licensePlate: "B 5678 MNO",
    },
  ];

  // Filter berdasarkan pencarian
  const filteredBookings = bookings.filter((booking) => {
    return (
      searchQuery === "" ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
          <h1 className="text-2xl font-bold">Manajemen Booking</h1>
          <p className="text-gray-500">Kelola semua booking cuci mobil</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Calendar className="w-4 h-4 mr-2" />
          Booking Baru
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari booking..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Layanan</TableHead>
                  <TableHead>Tanggal & Waktu</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.customer}</div>
                          <div className="text-sm text-gray-500">
                            {booking.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell>
                        <div>
                          <div>{booking.date}</div>
                          <div className="text-sm text-gray-500">
                            {booking.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewDetail(booking)}
                            >
                              Lihat Detail
                            </DropdownMenuItem>
                            {booking.status === "upcoming" && (
                              <>
                                <DropdownMenuItem>
                                  Mulai Pengerjaan
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleCancelBooking(booking.id)
                                  }
                                >
                                  Batalkan
                                </DropdownMenuItem>
                              </>
                            )}
                            {booking.status === "in-progress" && (
                              <DropdownMenuItem>Selesaikan</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-6 text-center text-gray-500"
                    >
                      Tidak ada booking yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateBookingModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
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
