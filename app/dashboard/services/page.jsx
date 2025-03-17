"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Droplets,
  Sparkles,
  Shield,
  Brush,
  Car,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ServiceFormModal from "@/components/dashboard/service-form-modal";
import DeleteConfirmationModal from "@/components/dashboard/delete-confirmation-modal";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Data layanan
  const services = [
    {
      id: "basic-wash",
      name: "Cuci Dasar",
      category: "exterior",
      description:
        "Cuci eksterior dengan sabun berkualitas tinggi, pembersihan roda, dan pengeringan manual",
      price: "Rp150.000",
      duration: "15 menit",
      icon: <Droplets className="w-4 h-4" />,
      status: "active",
    },
    {
      id: "premium-wash",
      name: "Cuci Premium",
      category: "exterior",
      description:
        "Cuci dasar plus semir ban, perlindungan lilin, dan cuci bagian bawah mobil",
      price: "Rp250.000",
      duration: "25 menit",
      icon: <Sparkles className="w-4 h-4" />,
      status: "active",
    },
    {
      id: "deluxe-wash",
      name: "Cuci Deluxe",
      category: "exterior",
      description:
        "Cuci premium plus sealant cat, pelindung hujan, dan poles busa tiga lapis",
      price: "Rp350.000",
      duration: "35 menit",
      icon: <Shield className="w-4 h-4" />,
      status: "active",
    },
    {
      id: "basic-interior",
      name: "Interior Dasar",
      category: "interior",
      description: "Vakum, pembersihan dashboard, dan pembersihan jendela",
      price: "Rp200.000",
      duration: "20 menit",
      icon: <Brush className="w-4 h-4" />,
      status: "active",
    },
    {
      id: "premium-interior",
      name: "Interior Premium",
      category: "interior",
      description:
        "Interior dasar plus pembersihan kursi, shampo karpet, dan pengharum",
      price: "Rp400.000",
      duration: "45 menit",
      icon: <Car className="w-4 h-4" />,
      status: "active",
    },
  ];

  // Filter berdasarkan pencarian dan kategori
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleAddService = () => {
    setIsEditing(false);
    setSelectedService(null);
    setShowServiceModal(true);
  };

  const handleEditService = (service) => {
    setIsEditing(true);
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleDeleteService = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Layanan</h1>
          <p className="text-gray-500">
            Kelola layanan cuci mobil yang ditawarkan
          </p>
        </div>
        <Button onClick={handleAddService}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Layanan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Layanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari layanan..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="Filter Kategori" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="exterior">Eksterior</SelectItem>
                  <SelectItem value="interior">Interior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Layanan</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Durasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                            {service.icon}
                          </div>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="max-w-xs text-sm text-gray-500 truncate">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {service.category === "exterior"
                            ? "Eksterior"
                            : "Interior"}
                        </Badge>
                      </TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            service.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }
                        >
                          {service.status === "active" ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditService(service)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteService(service)}
                            >
                              <Trash className="w-4 h-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
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
                      Tidak ada layanan yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ServiceFormModal
        open={showServiceModal}
        onOpenChange={setShowServiceModal}
        service={selectedService}
        isEditing={isEditing}
      />
      <DeleteConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Hapus Layanan"
        description={`Apakah Anda yakin ingin menghapus layanan "${selectedService?.name}"? Tindakan ini tidak dapat dibatalkan.`}
      />
    </div>
  );
}
