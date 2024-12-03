"use client"

import React, { useState } from "react"
import { addDays, format, isWithinInterval, parse } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const tableData = [
  {
    no: 1,
    kodeBarang: "KB001",
    namaBarang: "Kertas A4",
    kodeBelanja: "BL001",
    rekeningBelanja: "5218",
    uraianBelanja: "Pengadaan Kertas Kantor",
    volumeTerima: 100,
    jumlahTerima: 500000,
    volumeKeluar: 40,
    jumlahKeluar: 200000,
    tanggal: "2024-12-01",
    volumeTotal: 60,
    jumlahTotal: 300000,
  },
  {
    no: 2,
    kodeBarang: "KB002",
    namaBarang: "Pulpen",
    kodeBelanja: "BL002",
    rekeningBelanja: "5218",
    uraianBelanja: "Pengadaan Alat Tulis",
    volumeTerima: 50,
    jumlahTerima: 250000,
    volumeKeluar: 20,
    jumlahKeluar: 100000,
    tanggal: "2024-12-02",
    volumeTotal: 30,
    jumlahTotal: 150000,
  },
  {
    no: 3,
    kodeBarang: "KB003",
    namaBarang: "Notebook",
    kodeBelanja: "BL003",
    rekeningBelanja: "5218",
    uraianBelanja: "Pengadaan Buku Catatan",
    volumeTerima: 30,
    jumlahTerima: 600000,
    volumeKeluar: 10,
    jumlahKeluar: 200000,
    tanggal: "2024-12-03",
    volumeTotal: 20,
    jumlahTotal: 400000,
  },
]

export default function Laporan() {

  return (
    <div className="mx-5 mt-5 bg-white p-5 text-accentdarken">
      <h1>Laporan Soon.</h1>
    </div>
  )
}

