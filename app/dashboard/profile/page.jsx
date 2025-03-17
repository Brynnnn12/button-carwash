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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Save, Upload, Eye, EyeOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profil Saya</h1>
        <p className="text-gray-500">
          Kelola informasi profil dan preferensi Anda
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Foto Profil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src="/placeholder.svg?height=128&width=128" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Ganti Foto
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Informasi Pribadi</span>
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="flex items-center gap-2"
              >
                <Bell className="w-4 h-4" />
                <span>Preferensi</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Pribadi</CardTitle>
                    <CardDescription>
                      Perbarui informasi pribadi Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Nama Depan</Label>
                        <Input id="first-name" defaultValue="Admin" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Nama Belakang</Label>
                        <Input id="last-name" defaultValue="SparkleWash" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="admin@sparklewash.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input id="phone" defaultValue="081234567890" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Jabatan</Label>
                      <Input id="position" defaultValue="Administrator" />
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

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Ubah Password</CardTitle>
                    <CardDescription>
                      Perbarui password akun Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">
                        Password Saat Ini
                      </Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">Password Baru</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Konfirmasi Password Baru
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
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
                          Perbarui Password
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferensi</CardTitle>
                    <CardDescription>
                      Kelola preferensi notifikasi dan tampilan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notifikasi</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">
                              Notifikasi Email
                            </Label>
                            <p className="text-sm text-gray-500">
                              Terima notifikasi melalui email
                            </p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="sms-notifications">
                              Notifikasi SMS
                            </Label>
                            <p className="text-sm text-gray-500">
                              Terima notifikasi melalui SMS
                            </p>
                          </div>
                          <Switch id="sms-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="browser-notifications">
                              Notifikasi Browser
                            </Label>
                            <p className="text-sm text-gray-500">
                              Terima notifikasi di browser
                            </p>
                          </div>
                          <Switch id="browser-notifications" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Tampilan</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="dark-mode">Mode Gelap</Label>
                            <p className="text-sm text-gray-500">
                              Gunakan tema gelap untuk aplikasi
                            </p>
                          </div>
                          <Switch id="dark-mode" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="compact-view">
                              Tampilan Kompak
                            </Label>
                            <p className="text-sm text-gray-500">
                              Tampilkan lebih banyak konten dalam satu layar
                            </p>
                          </div>
                          <Switch id="compact-view" />
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
                          Simpan Preferensi
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
