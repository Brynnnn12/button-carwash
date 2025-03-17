"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Simulasi role pengguna (true = admin, false = user)
  const pathname = usePathname();

  // Tutup menu mobile saat path berubah
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const adminNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Pelanggan",
      href: "/dashboard/customers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Booking",
      href: "/dashboard/bookings",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "Layanan",
      href: "/dashboard/services",
      icon: <Package className="w-5 h-5" />,
    },
    {
      name: "Pengaturan",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const userNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Profil",
      href: "/dashboard/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "Booking Saya",
      href: "/dashboard/my-bookings",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "Paket Saya",
      href: "/dashboard/my-packages",
      icon: <Car className="w-5 h-5" />,
    },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b lg:hidden">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
          <span className="ml-3 text-xl font-bold text-primary">
            SparkleWash
          </span>
        </div>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 bottom-0 left-0 w-64 p-4 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="pb-6 mb-6 border-b">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {isAdmin ? "Admin" : "Budi Santoso"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isAdmin ? "Administrator" : "Pelanggan"}
                    </p>
                  </div>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  className="justify-start w-full"
                  asChild
                >
                  <Link href="/">
                    <LogOut className="w-5 h-5 mr-2" />
                    Keluar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="fixed hidden w-64 min-h-screen bg-white border-r lg:block">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">
                  SparkleWash
                </span>
              </Link>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 pb-6 mb-6 border-b">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {isAdmin ? "Admin" : "Budi Santoso"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isAdmin ? "Administrator" : "Pelanggan"}
                  </p>
                </div>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 mt-auto border-t">
              <Button
                variant="outline"
                className="justify-start w-full"
                asChild
              >
                <Link href="/">
                  <LogOut className="w-5 h-5 mr-2" />
                  Keluar
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="sticky top-0 z-10 items-center justify-between hidden px-6 py-3 bg-white border-b lg:flex">
            <h1 className="text-xl font-semibold">
              {navItems.find((item) => item.href === pathname)?.name ||
                "Dashboard"}
            </h1>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {isAdmin ? "Admin" : "Budi Santoso"}
              </span>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
