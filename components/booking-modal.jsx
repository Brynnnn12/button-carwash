"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon, CheckCircle2 } from "lucide-react";

export default function BookingModal({ open, onOpenChange }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [carType, setCarType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi pengiriman data
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
    }, 1500);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCarType("");
    setLicensePlate("");
    setServiceType("");
    setDate(undefined);
    setTime("");
    setNotes("");
    setStep(1);
    setIsComplete(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const services = [
    {
      id: "basic-exterior",
      name: "Cuci Dasar",
      price: "Rp150.000",
      time: "15 menit",
    },
    {
      id: "premium-exterior",
      name: "Cuci Premium",
      price: "Rp250.000",
      time: "25 menit",
    },
    {
      id: "deluxe-exterior",
      name: "Cuci Deluxe",
      price: "Rp350.000",
      time: "35 menit",
    },
    {
      id: "basic-interior",
      name: "Interior Dasar",
      price: "Rp200.000",
      time: "20 menit",
    },
    {
      id: "premium-interior",
      name: "Interior Premium",
      price: "Rp400.000",
      time: "45 menit",
    },
    {
      id: "deluxe-interior",
      name: "Interior Deluxe",
      price: "Rp600.000",
      time: "60 menit",
    },
  ];

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {isComplete ? (
          <div className="py-6 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">
              Pemesanan Berhasil!
            </DialogTitle>
            <DialogDescription className="mb-6">
              Terima kasih telah memesan layanan kami. Kami akan menghubungi
              Anda untuk konfirmasi.
            </DialogDescription>
            <Button onClick={handleClose}>Tutup</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                {step === 1 ? "Pesan Layanan" : "Jadwal & Detail"}
              </DialogTitle>
              <DialogDescription className="text-center">
                {step === 1
                  ? "Pilih layanan yang Anda inginkan"
                  : "Lengkapi informasi untuk pemesanan Anda"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="py-4">
              {step === 1 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <RadioGroup
                      value={serviceType}
                      onValueChange={setServiceType}
                      className="space-y-3"
                    >
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={service.id} id={service.id} />
                          <Label
                            htmlFor={service.id}
                            className="flex flex-1 justify-between cursor-pointer"
                          >
                            <span>{service.name}</span>
                            <span className="flex space-x-4">
                              <span className="text-gray-500 text-sm">
                                {service.time}
                              </span>
                              <span className="font-medium">
                                {service.price}
                              </span>
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!serviceType}
                    >
                      Lanjutkan
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="carType">Jenis Mobil</Label>
                      <Input
                        id="carType"
                        placeholder="Contoh: Toyota Avanza"
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licensePlate">Plat Nomor</Label>
                      <Input
                        id="licensePlate"
                        placeholder="Contoh: B 1234 ABC"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tanggal</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date
                              ? format(date, "PPP", { locale: id })
                              : "Pilih tanggal"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Waktu</Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Pilih waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Informasi tambahan yang perlu kami ketahui"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Kembali
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Memproses..." : "Pesan Sekarang"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
