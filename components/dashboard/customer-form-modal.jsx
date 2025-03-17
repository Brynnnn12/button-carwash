"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash } from "lucide-react";

export default function CustomerFormModal({
  open,
  onOpenChange,
  customer,
  isEditing,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [cars, setCars] = useState([{ type: "", plate: "" }]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (customer && isEditing) {
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone);
      setIsActive(customer.status === "active");
      setCars(
        customer.cars.length > 0 ? customer.cars : [{ type: "", plate: "" }]
      );
    } else {
      resetForm();
    }
  }, [customer, isEditing]);

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
    setName("");
    setEmail("");
    setPhone("");
    setIsActive(true);
    setCars([{ type: "", plate: "" }]);
  };

  const addCar = () => {
    setCars([...cars, { type: "", plate: "" }]);
  };

  const removeCar = (index) => {
    const newCars = [...cars];
    newCars.splice(index, 1);
    setCars(newCars.length > 0 ? newCars : [{ type: "", plate: "" }]);
  };

  const updateCar = (index, field, value) => {
    const newCars = [...cars];
    newCars[index][field] = value;
    setCars(newCars);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="space-y-2">
            <Label>Kendaraan</Label>
            <div className="space-y-3">
              {cars.map((car, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Jenis Mobil"
                    value={car.type}
                    onChange={(e) => updateCar(index, "type", e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Plat Nomor"
                    value={car.plate}
                    onChange={(e) => updateCar(index, "plate", e.target.value)}
                    required
                  />
                  {cars.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCar(index)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addCar}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Kendaraan
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="status">Status Aktif</Label>
              <p className="text-sm text-gray-500">
                Pelanggan dapat melakukan booking
              </p>
            </div>
            <Switch
              id="status"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
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
              {isLoading ? "Menyimpan..." : isEditing ? "Perbarui" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
