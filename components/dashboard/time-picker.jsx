"use client";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function TimePickerDemo({ label }) {
  return (
    <div className="flex flex-col space-y-2">
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Input type="time" className="pl-8" />
        <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      </div>
    </div>
  );
}
