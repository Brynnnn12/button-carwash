"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function CancelBookingModal({ open, onOpenChange, bookingId }) {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    setIsLoading(true);

    // Simulasi pembatalan
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      setReason("");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Batalkan Booking</span>
          </DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin membatalkan booking ini? Tindakan ini tidak
            dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Alasan Pembatalan</Label>
              <Textarea
                id="reason"
                placeholder="Masukkan alasan pembatalan"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Kembali
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {isLoading ? "Membatalkan..." : "Ya, Batalkan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
