"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon, Package } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function UsePackageModal({ open, onOpenChange, packageData }) {
  const [service, setService] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi pengiriman data
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setService("");
    setDate(undefined);
    setTime("");
  };

  const availableServices = [
    { id: "cuci-premium", name: "Cuci Premium", remaining: 1, total: 2 },
    { id: "interior-dasar", name: "Interior Dasar", remaining: 1, total: 1 },
    { id: "semir-ban", name: "Semir Ban", remaining: 1, total: 1 },
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Package className="w-5 h-5" />
            <span>Gunakan Paket</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="p-4 mb-4 rounded-lg bg-gray-50">
            <h3 className="mb-2 font-semibold">Paket Komplit</h3>
            <p className="mb-2 text-sm text-gray-500">
              Berlaku hingga: 10 Sep 2023
            </p>
            <div className="text-sm">
              <p className="font-medium">Layanan tersisa:</p>
              <ul className="mt-1 space-y-1">
                {availableServices.map((service) => (
                  <li key={service.id} className="flex justify-between">
                    <span>{service.name}</span>
                    <span>
                      {service.remaining} dari {service.total}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Pilih Layanan</Label>
            <RadioGroup value={service} onValueChange={setService} required>
              {availableServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center p-3 space-x-2 border rounded-md"
                >
                  <RadioGroupItem value={service.id} id={service.id} />
                  <Label
                    htmlFor={service.id}
                    className="flex justify-between flex-1 cursor-pointer"
                  >
                    <span>{service.name}</span>
                    <span className="text-sm text-gray-500">
                      Tersisa: {service.remaining}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tanggal</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start w-full font-normal text-left"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
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

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Gunakan Paket"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
