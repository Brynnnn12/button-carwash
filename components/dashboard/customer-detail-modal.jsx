"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, Car, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomerDetailModal({ open, onOpenChange, customer }) {
  if (!customer) return null;

  // Dummy data untuk riwayat booking
  const bookingHistory = [
    {
      id: "B-1234",
      service: "Cuci Premium",
      date: "10 Jun 2023",
      time: "10:00",
      status: "completed",
      price: "Rp250.000",
    },
    {
      id: "B-1235",
      service: "Interior Dasar",
      date: "25 May 2023",
      time: "14:30",
      status: "completed",
      price: "Rp200.000",
    },
    {
      id: "B-1236",
      service: "Cuci Deluxe",
      date: "10 May 2023",
      time: "13:00",
      status: "completed",
      price: "Rp350.000",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            <span>Detail Pelanggan</span>
            <Badge
              className={
                customer.status === "active" ? "bg-green-500" : "bg-gray-500"
              }
            >
              {customer.status === "active" ? "Aktif" : "Tidak Aktif"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={`/placeholder.svg?height=64&width=64&text=${customer.name.charAt(
                  0
                )}`}
              />
              <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{customer.name}</h2>
              <p className="text-gray-500">{customer.id}</p>
            </div>
          </div>

          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Informasi</TabsTrigger>
              <TabsTrigger value="history">Riwayat Booking</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-700">{customer.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Telepon</p>
                    <p className="text-gray-700">{customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Tanggal Bergabung</p>
                    <p className="text-gray-700">{customer.joinDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Kendaraan</p>
                    <div className="mt-1 space-y-1">
                      {customer.cars.map((car, index) => (
                        <div key={index} className="p-2 rounded-md bg-gray-50">
                          <p className="font-medium">{car.type}</p>
                          <p className="text-sm text-gray-500">{car.plate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="pt-4">
              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{booking.service}</p>
                          <p className="text-sm text-gray-500">{booking.id}</p>
                        </div>
                        <Badge className="bg-green-500">Selesai</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>SparkleWash Pusat</span>
                        </div>
                        <div className="font-medium">{booking.price}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
