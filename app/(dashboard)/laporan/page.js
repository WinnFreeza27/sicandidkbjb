"use client"

import React, { useState, useEffect } from "react"
import { addDays, format, startOfMonth, endOfMonth, eachMonthOfInterval } from "date-fns"
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
import { usePenerimaanTable } from "@/hook/use_penerimaan_store"
import { usePengeluaranTable } from "@/hook/use_pengeluaran_store"
import { useStockStore } from "@/hook/use_stock_store"

export default function Laporan() {

  const {penerimaanTable: penerimaanData} = usePenerimaanTable()
  const {pengeluaranTable: pengeluaranData} = usePengeluaranTable()
  const {stock} = useStockStore()

  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  const [dataTrack, setDataTrack] = useState({
    penerimaan: [],
    pengeluaran: [],
  })

  const [mergedStock, setMergedStock] = useState([])

  useEffect(() => {
    const updatedPenerimaan = stock.map(item => findPenerimaan(item.nama_produk.uuid, item.rekening_belanja.uuid, item.rincian.uuid, date))
    const updatedPengeluaran = stock.map(item => findPengeluaran(item.uuid, date))

    setDataTrack({
      penerimaan: updatedPenerimaan.flat(),
      pengeluaran: updatedPengeluaran.flat(),
    })
  }, [date])

  useEffect(() => {
    // If no valid data or date range, reset mergedStock to an empty array
    if (
      !dataTrack.penerimaan.length || 
      !dataTrack.pengeluaran.length || 
      !date?.from || 
      !date?.to
    ) {
      setMergedStock([]);
      return;
    }
  
    // Generate a list of months within the date range
    const monthRange = eachMonthOfInterval({
      start: startOfMonth(date.from),
      end: endOfMonth(date.to),
    });
  
    const updatedStock = stock
      .map((item) => {
        let runningTotal = 0; // Initialize running total for volume_total
  
        const monthlyData = monthRange
          .map((month) => {
            const startOfMonthDate = startOfMonth(month);
            const endOfMonthDate = endOfMonth(month);
  
            // Filter penerimaan data for the current month
            const monthlyPenerimaan = dataTrack.penerimaan.filter(
              (p) =>
                p.nama_produk.uuid === item.nama_produk.uuid &&
                new Date(p.tanggal_terima) >= startOfMonthDate &&
                new Date(p.tanggal_terima) <= endOfMonthDate
            );
  
            // Filter pengeluaran data for the current month
            const monthlyPengeluaran = dataTrack.pengeluaran.filter(
              (p) =>
                p.nama_produk.uuid === item.nama_produk.uuid &&
                new Date(p.tanggal_keluar) >= startOfMonthDate &&
                new Date(p.tanggal_keluar) <= endOfMonthDate
            );
  
            const totalVolumeTerima = monthlyPenerimaan.reduce(
              (sum, p) => sum + Number(p.volume_terima),
              0
            );
            const totalVolumeKeluar = monthlyPengeluaran.reduce(
              (sum, p) => sum + Number(p.volume_keluar),
              0
            );
  
            // If both totalVolumeTerima and totalVolumeKeluar are 0 or less, skip updating
            if (totalVolumeTerima <= 0 && totalVolumeKeluar <= 0) {
              return null; // Skip this month's data
            }
  
            // Calculate current month's volume_total
            const currentMonthVolumeTotal =
              totalVolumeTerima - totalVolumeKeluar;
  
            // Update running total with current month's data
            runningTotal += currentMonthVolumeTotal;
  
            return {
              month: format(month, "yyyy-MM"),
              total_volume_terima: totalVolumeTerima,
              total_volume_keluar: totalVolumeKeluar,
              volume_total: runningTotal,
            };
          })
          .filter(Boolean); // Remove null values
  
        if (monthlyData.length === 0) return null; // Skip items with no valid monthly data
  
        const totalVolumeTerima = monthlyData.reduce(
          (sum, month) => sum + month.total_volume_terima,
          0
        );
        const totalVolumeKeluar = monthlyData.reduce(
          (sum, month) => sum + month.total_volume_keluar,
          0
        );
  
        return {
          ...item,
          total_volume_terima: totalVolumeTerima,
          total_volume_keluar: totalVolumeKeluar,
          monthly_data: monthlyData,
        };
      })
      .filter(Boolean); // Remove null values
  
    setMergedStock(updatedStock);
  }, [dataTrack, date]);
  
  
    

  const findPenerimaan = (produk_uuid, rekening_uuid, rincian_uuid, date_range) => {
    const filteredData = penerimaanData.filter((item) => {
      const matchesUUIDs = 
        item.nama_produk.uuid === produk_uuid && 
        item.rekening_belanja.uuid === rekening_uuid && 
        item.rincian.uuid === rincian_uuid;
      
      let withinDateRange = true;
      if (date_range && date_range.from && date_range.to) {
        const itemDate = new Date(item.tanggal_terima);
        const fromDate = new Date(date_range.from);
        const toDate = new Date(date_range.to);
        
        itemDate.setHours(0, 0, 0, 0);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(0, 0, 0, 0);
        
        withinDateRange = itemDate >= fromDate && itemDate <= toDate;
      }
      
      return matchesUUIDs && withinDateRange;
    });
    
    return filteredData;
  };

  const findPengeluaran = (stock_uuid, date_range) => {
    const filteredData = pengeluaranData.filter((item) => {
      const matchesUUIDs = item.nama_produk.stock_uuid === stock_uuid;
      
      let withinDateRange = true;
      if (date_range && date_range.from && date_range.to) {
        const itemDate = new Date(item.tanggal_keluar);
        const fromDate = new Date(date_range.from);
        const toDate = new Date(date_range.to);
        
        itemDate.setHours(0, 0, 0, 0);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(0, 0, 0, 0);
        
        withinDateRange = itemDate >= fromDate && itemDate <= toDate;
      }
      
      return matchesUUIDs && withinDateRange;
    });
    
    return filteredData;
  };
  console.log(date)
  console.log(mergedStock)

  return (
    <div className="mx-5 mt-5 bg-white p-5 text-accentdarken">
      <div className="flex flex-col xl:flex-row gap-5 justify-between items-center mb-5">
        <h1 className="text-2xl">Laporan</h1>
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal bg-white hover:bg-secondary",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="mx-auto py-10 w-full overflow-auto">
        {mergedStock.length == 0 ? (
            <div className="text-center">Tidak Ada Data Laporan Pada Periode Tanggal Tersebut.</div>
        ) : (
          <Table className="w-max">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="w-32">Kode Barang</TableHead>
                <TableHead className="w-32">Nama Barang</TableHead>
                <TableHead className="w-32">Kode Belanja</TableHead>
                <TableHead className="w-48">Rekening Belanja</TableHead>
                <TableHead className="w-48">Uraian Belanja</TableHead>
                <TableHead className="w-32">Volume Terima</TableHead>
                <TableHead className="w-32">Jumlah Terima</TableHead>
                <TableHead className="w-32">Volume Keluar</TableHead>
                <TableHead className="w-32">Jumlah Keluar</TableHead>
                <TableHead className="w-32">Bulan</TableHead>
                <TableHead className="w-32">Volume Total</TableHead>
                <TableHead className="w-32">Jumlah Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mergedStock.flatMap((item, index) => 
                item.monthly_data
                  .filter(month => month.total_volume_terima > 0 || month.total_volume_keluar > 0)
                  .map((monthData, monthIndex) => (
                    <TableRow key={`${item.uuid}-${monthData.month}`} className="bg-secondary/40 h-[70px]">
                      <TableCell className="font-medium text-center">{index + 1}</TableCell>
                      <TableCell>{item.nama_produk.kode_barang}</TableCell>
                      <TableCell>{item.nama_produk.nama_produk}</TableCell>
                      <TableCell>{item.rekening_belanja.kode_rekening}</TableCell>
                      <TableCell>{item.rekening_belanja.uraian}</TableCell>
                      <TableCell>{item.rincian.nama_rincian}</TableCell>
                      <TableCell>{monthData.total_volume_terima}</TableCell>
                      <TableCell>
                        {(monthData.total_volume_terima * parseInt(item.nama_produk.harga)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                      </TableCell>
                      <TableCell>{monthData.total_volume_keluar}</TableCell>
                      <TableCell>
                        {(monthData.total_volume_keluar * parseInt(item.nama_produk.harga)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date(`${monthData.month}-01`))}
                      </TableCell>

                      <TableCell>{monthData.volume_total}</TableCell>
                      <TableCell>
                        {(monthData.volume_total * parseInt(item.nama_produk.harga)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>     
        )}
        </div>
    </div>
  )
}

