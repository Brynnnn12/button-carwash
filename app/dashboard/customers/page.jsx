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
  Eye,
  Filter,
  Calendar,
  Car,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomerFormModal from "@/components/dashboard/customer-form-modal";
import CustomerDetailModal from "@/components/dashboard/customer-detail-modal";
import DeleteConfirmationModal from "@/components/dashboard/delete-confirmation-modal";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Data pelanggan
  const customers = [
    {
      id: "C-1001",
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      phone: "081234567890",
      status: "active",
      joinDate: "10 Jan 2023",
      totalBookings: 8,
      cars: [{ type: "Toyota Avanza", plate: "B 1234 ABC" }],
    },
    {
      id: "C-1002",
      name: "Siti Rahayu",
      email: "siti.rahayu@example.com",
      phone: "081234567891",
      status: "active",
      joinDate: "15 Feb 2023",
      totalBookings: 5,
      cars: [{ type: "Honda Jazz", plate: "B 2345 DEF" }],
    },
    {
      id: "C-1003",
      name: "Ahmad Hidayat",
      email: "ahmad.hidayat@example.com",
      phone: "081234567892",
      status: "active",
      joinDate: "20 Mar 2023",
      totalBookings: 3,
      cars: [{ type: "Mitsubishi Xpander", plate: "B 3456 GHI" }],
    },
    {
      id: "C-1004",
      name: "Dewi Lestari",
      email: "dewi.lestari@example.com",
      phone: "081234567893",
      status: "inactive",
      joinDate: "05 Apr 2023",
      totalBookings: 1,
      cars: [{ type: "Daihatsu Terios", plate: "B 4567 JKL" }],
    },
    {
      id: "C-1005",
      name: "Rudi Hartono",
      email: "rudi.hartono@example.com",
      phone: "081234567894",
      status: "active",
      joinDate: "12 May 2023",
      totalBookings: 4,
      cars: [
        { type: "Suzuki Ertiga", plate: "B 5678 MNO" },
        { type: "Honda Brio", plate: "B 6789 PQR" },
      ],
    },
  ];

  // Filter berdasarkan pencarian dan status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      searchQuery === "" ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddCustomer = () => {
    setIsEditing(false);
    setSelectedCustomer(null);
    setShowCustomerModal(true);
  };

  const handleEditCustomer = (customer) => {
    setIsEditing(true);
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const handleDeleteCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Pelanggan</h1>
          <p className="text-gray-500">Kelola data pelanggan cuci mobil</p>
        </div>
        <Button onClick={handleAddCustomer}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pelanggan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari pelanggan..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="Filter Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Tanggal Bergabung</TableHead>
                  <TableHead>Total Booking</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${customer.name.charAt(
                                0
                              )}`}
                            />
                            <AvatarFallback>
                              {customer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500">
                              {customer.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{customer.email}</div>
                          <div className="text-gray-500">{customer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{customer.totalBookings}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            customer.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }
                        >
                          {customer.status === "active"
                            ? "Aktif"
                            : "Tidak Aktif"}
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
                              onClick={() => handleViewCustomer(customer)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditCustomer(customer)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteCustomer(customer)}
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
                      Tidak ada pelanggan yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <CustomerFormModal
        open={showCustomerModal}
        onOpenChange={setShowCustomerModal}
        customer={selectedCustomer}
        isEditing={isEditing}
      />
      <CustomerDetailModal
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        customer={selectedCustomer}
      />
      <DeleteConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Hapus Pelanggan"
        description={`Apakah Anda yakin ingin menghapus pelanggan "${selectedCustomer?.name}"? Semua data terkait pelanggan ini juga akan dihapus. Tindakan ini tidak dapat dibatalkan.`}
      />
    </div>
  );
}
