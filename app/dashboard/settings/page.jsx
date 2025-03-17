"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Store,
  Clock,
  Bell,
  Save,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-gray-500">
          Kelola pengaturan aplikasi dan bisnis Anda
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full max-w-3xl grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Umum</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            <span>Bisnis</span>
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Jam Kerja</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            <span>Notifikasi</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Umum</CardTitle>
                <CardDescription>
                  Kelola pengaturan umum aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Nama Aplikasi</Label>
                  <Input id="app-name" defaultValue="SparkleWash" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="app-logo">Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 text-gray-400 bg-gray-100 rounded-md">
                      Logo
                    </div>
                    <Button variant="outline">Ganti Logo</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Mata Uang</Label>
                  <Select defaultValue="idr">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Pilih mata uang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idr">Rupiah (IDR)</SelectItem>
                      <SelectItem value="usd">US Dollar (USD)</SelectItem>
                      <SelectItem value="sgd">
                        Singapore Dollar (SGD)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Bahasa</Label>
                  <Select defaultValue="id">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Pilih bahasa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Mode Gelap</Label>
                    <p className="text-sm text-gray-500">
                      Aktifkan mode gelap untuk tampilan aplikasi
                    </p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>Menyimpan...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Bisnis</CardTitle>
                <CardDescription>Kelola informasi bisnis Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Nama Bisnis</Label>
                  <Input
                    id="business-name"
                    defaultValue="SparkleWash Car Wash"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-description">Deskripsi Bisnis</Label>
                  <Textarea
                    id="business-description"
                    defaultValue="Layanan cuci mobil dan detailing premium untuk menjaga kendaraan Anda tetap terlihat terbaik."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-email">Email Bisnis</Label>
                  <Input
                    id="business-email"
                    type="email"
                    defaultValue="info@sparklewash.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-phone">Telepon Bisnis</Label>
                  <Input id="business-phone" defaultValue="(021) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-address">Alamat</Label>
                  <Textarea
                    id="business-address"
                    defaultValue="Jl. Cuci Mobil No. 123, Kota Jakarta, 12345"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Media Sosial</Label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <Input
                        placeholder="URL Facebook"
                        defaultValue="https://facebook.com/sparklewash"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5 text-pink-600" />
                      <Input
                        placeholder="URL Instagram"
                        defaultValue="https://instagram.com/sparklewash"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Twitter className="w-5 h-5 text-blue-400" />
                      <Input
                        placeholder="URL Twitter"
                        defaultValue="https://twitter.com/sparklewash"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>Menyimpan...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle>Jam Kerja</CardTitle>
                <CardDescription>
                  Atur jam operasional bisnis Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Senin",
                    "Selasa",
                    "Rabu",
                    "Kamis",
                    "Jumat",
                    "Sabtu",
                    "Minggu",
                  ].map((day, index) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-24">
                        <Label>{day}</Label>
                      </div>
                      <div className="flex items-center flex-1 gap-2">
                        <div className="flex-1">
                          <Select
                            defaultValue={
                              index < 5
                                ? "08:00"
                                : index === 5
                                ? "08:00"
                                : "10:00"
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Jam Buka" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 13 }, (_, i) => i + 6).map(
                                (hour) => (
                                  <SelectItem
                                    key={hour}
                                    value={`${hour
                                      .toString()
                                      .padStart(2, "0")}:00`}
                                  >
                                    {hour.toString().padStart(2, "0")}:00
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <span>hingga</span>
                        <div className="flex-1">
                          <Select
                            defaultValue={
                              index < 5
                                ? "19:00"
                                : index === 5
                                ? "17:00"
                                : "16:00"
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Jam Tutup" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 14 }, (_, i) => i + 10).map(
                                (hour) => (
                                  <SelectItem
                                    key={hour}
                                    value={`${hour
                                      .toString()
                                      .padStart(2, "0")}:00`}
                                  >
                                    {hour.toString().padStart(2, "0")}:00
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`day-${index}`}
                            defaultChecked={index < 6}
                          />
                          <Label htmlFor={`day-${index}`}>Buka</Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>Menyimpan...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>Kelola preferensi notifikasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifikasi Email</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-bookings">Booking Baru</Label>
                        <p className="text-sm text-gray-500">
                          Dapatkan notifikasi saat ada booking baru
                        </p>
                      </div>
                      <Switch id="email-bookings" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-cancellations">Pembatalan</Label>
                        <p className="text-sm text-gray-500">
                          Dapatkan notifikasi saat ada pembatalan booking
                        </p>
                      </div>
                      <Switch id="email-cancellations" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-reminders">Pengingat</Label>
                        <p className="text-sm text-gray-500">
                          Dapatkan pengingat untuk booking yang akan datang
                        </p>
                      </div>
                      <Switch id="email-reminders" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifikasi SMS</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-bookings">Booking Baru</Label>
                        <p className="text-sm text-gray-500">
                          Dapatkan SMS saat ada booking baru
                        </p>
                      </div>
                      <Switch id="sms-bookings" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-cancellations">Pembatalan</Label>
                        <p className="text-sm text-gray-500">
                          Dapatkan SMS saat ada pembatalan booking
                        </p>
                      </div>
                      <Switch id="sms-cancellations" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-reminders">Pengingat</Label>
                        <p className="text-sm text-gray-500">
                          Dapatkan SMS pengingat untuk booking yang akan datang
                        </p>
                      </div>
                      <Switch id="sms-reminders" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifikasi Pelanggan</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="customer-confirmation">
                          Konfirmasi Booking
                        </Label>
                        <p className="text-sm text-gray-500">
                          Kirim email konfirmasi ke pelanggan saat booking
                          dibuat
                        </p>
                      </div>
                      <Switch id="customer-confirmation" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="customer-reminder">
                          Pengingat Booking
                        </Label>
                        <p className="text-sm text-gray-500">
                          Kirim pengingat ke pelanggan sebelum jadwal booking
                        </p>
                      </div>
                      <Switch id="customer-reminder" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="customer-feedback">
                          Permintaan Ulasan
                        </Label>
                        <p className="text-sm text-gray-500">
                          Kirim email permintaan ulasan setelah layanan selesai
                        </p>
                      </div>
                      <Switch id="customer-feedback" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>Menyimpan...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
