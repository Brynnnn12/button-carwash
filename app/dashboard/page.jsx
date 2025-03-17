"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Car,
  Clock,
} from "lucide-react";
import Link from "next/link";
import CreateBookingModal from "@/components/dashboard/create-booking-modal";
import BookingDetailModal from "@/components/dashboard/booking-detail-modal";

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(true); // Simulasi role pengguna (true = admin, false = user)

  return <div>{isAdmin ? <AdminDashboard /> : <UserDashboard />}</div>;
}

function AdminDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Data untuk statistik
  const stats = [
    {
      title: "Total Pelanggan",
      value: "1,248",
      icon: <Users className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Booking Hari Ini",
      value: "24",
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pendapatan Bulan Ini",
      value: "Rp24,5jt",
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Layanan Selesai",
      value: "842",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  // Data untuk booking terbaru
  const recentBookings = [
    {
      id: "B-1234",
      customer: "Budi Santoso",
      service: "Cuci Premium",
      date: "15 Jul 2023",
      time: "10:00",
      status: "completed",
      phone: "081234567890",
      carType: "Toyota Avanza",
      licensePlate: "B 1234 ABC",
    },
    {
      id: "B-1235",
      customer: "Siti Rahayu",
      service: "Interior Premium",
      date: "15 Jul 2023",
      time: "11:30",
      status: "completed",
      phone: "081234567891",
      carType: "Honda Jazz",
      licensePlate: "B 2345 DEF",
    },
    {
      id: "B-1236",
      customer: "Ahmad Hidayat",
      service: "Cuci Deluxe",
      date: "15 Jul 2023",
      time: "13:00",
      status: "in-progress",
      phone: "081234567892",
      carType: "Mitsubishi Xpander",
      licensePlate: "B 3456 GHI",
    },
    {
      id: "B-1237",
      customer: "Dewi Lestari",
      service: "Cuci Dasar",
      date: "15 Jul 2023",
      time: "14:30",
      status: "upcoming",
      phone: "081234567893",
      carType: "Daihatsu Terios",
      licensePlate: "B 4567 JKL",
    },
    {
      id: "B-1238",
      customer: "Rudi Hartono",
      service: "Interior Dasar",
      date: "15 Jul 2023",
      time: "16:00",
      status: "upcoming",
      phone: "081234567894",
      carType: "Suzuki Ertiga",
      licensePlate: "B 5678 MNO",
    },
  ];

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Booking Terbaru</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/bookings">
                  Lihat Semua
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="sm" onClick={() => setShowCreateModal(true)}>
                Booking Baru
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-2 pb-4 border-b rounded-md cursor-pointer last:border-0 last:pb-0 hover:bg-gray-50"
                  onClick={() => handleBookingClick(booking)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        booking.status === "completed"
                          ? "bg-green-500"
                          : booking.status === "in-progress"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{booking.customer}</p>
                      <p className="text-sm text-gray-500">{booking.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{booking.date}</p>
                    <p className="text-sm text-gray-500">{booking.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Menu Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="flex flex-col items-center justify-center h-auto gap-2 py-4"
                asChild
              >
                <Link href="/dashboard/bookings">
                  <Calendar className="w-6 h-6" />
                  <span>Kelola Booking</span>
                </Link>
              </Button>
              <Button
                className="flex flex-col items-center justify-center h-auto gap-2 py-4"
                asChild
              >
                <Link href="/dashboard/customers">
                  <Users className="w-6 h-6" />
                  <span>Kelola Pelanggan</span>
                </Link>
              </Button>
              <Button
                className="flex flex-col items-center justify-center h-auto gap-2 py-4"
                asChild
              >
                <Link href="/dashboard/services">
                  <Car className="w-6 h-6" />
                  <span>Kelola Layanan</span>
                </Link>
              </Button>
              <Button
                className="flex flex-col items-center justify-center h-auto gap-2 py-4"
                asChild
              >
                <Link href="/dashboard/settings">
                  <CheckCircle className="w-6 h-6" />
                  <span>Laporan</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jadwal Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 text-blue-600 bg-blue-100 rounded-full">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Cuci Premium</p>
                    <p className="text-sm text-gray-500">Budi Santoso</p>
                  </div>
                </div>
                <p className="font-medium">10:00</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 text-blue-600 bg-blue-100 rounded-full">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Interior Premium</p>
                    <p className="text-sm text-gray-500">Siti Rahayu</p>
                  </div>
                </div>
                <p className="font-medium">11:30</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 text-blue-600 bg-blue-100 rounded-full">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">Cuci Deluxe</p>
                    <p className="text-sm text-gray-500">Ahmad Hidayat</p>
                  </div>
                </div>
                <p className="font-medium">13:00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
}

function UserDashboard() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Data untuk statistik pengguna
  const userStats = [
    {
      title: "Booking Aktif",
      value: "2",
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Paket Aktif",
      value: "1",
      icon: <Car className="w-5 h-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Riwayat Cuci",
      value: "8",
      icon: <Clock className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Poin Reward",
      value: "350",
      icon: <DollarSign className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  // Data untuk booking yang akan datang
  const upcomingBookings = [
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

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Booking Mendatang</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/my-bookings">
                Lihat Semua
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-2 pb-4 border-b rounded-md cursor-pointer last:border-0 last:pb-0 hover:bg-gray-50"
                    onClick={() => handleBookingClick(booking)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-sm text-gray-500">
                          {booking.status === "confirmed"
                            ? "Terkonfirmasi"
                            : "Menunggu Konfirmasi"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{booking.date}</p>
                      <p className="text-sm text-gray-500">{booking.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-500">Tidak ada booking mendatang</p>
                <Button className="mt-4" asChild>
                  <Link href="/services">Pesan Layanan</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Menu Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="flex flex-col items-center justify-center h-auto gap-2 py-4"
                asChild
              >
                <Link href="/services">
                  <Calendar className="w-6 h-6" />
                  <span>Booking Baru</span>
                </Link>
              </Button>
              <Button
                className="flex flex-col items-center justify-center h-auto gap-2 py-4"
                asChild
              >
                <Link href="/dashboard/my-packages">
                  <Car className="w-6 h-6" />
                  <span>Paket Saya</span>
                </Link>
              </Button>
              <Button
                className="flex flex-col items-center justify-center h-auto gap-2 py-4"
                asChild
              >
                <Link href="/dashboard/profile">
                  <Users className="w-6 h-6" />
                  <span>Profil Saya</span>
                </Link>
              </Button>
              <Button
                className="flex flex-col items-center justify-center h-auto gap-2 py-4"
                asChild
              >
                <Link href="/dashboard/history">
                  <Clock className="w-6 h-6" />
                  <span>Riwayat</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paket Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Paket Komplit</h3>
              <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                Aktif
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div>
                <p className="text-gray-500">Berlaku Hingga</p>
                <p>10 Sep 2023</p>
              </div>
              <div>
                <p className="text-gray-500">Sisa Layanan</p>
                <p>3 layanan</p>
              </div>
            </div>
            <Button className="w-full mt-2" variant="outline">
              Gunakan Paket
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <BookingDetailModal
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        booking={selectedBooking}
      />
    </div>
  );
}
