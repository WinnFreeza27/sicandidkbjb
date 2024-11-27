"use client"
import Pagination from "@/components/dynamic/pagination";
import {useEffect, useState} from "react";
import { paginateData } from "@/utils/paginate_data";
import { deepSearch } from "@/utils/search_and_filter";
import { useProdukForm, useProdukTable } from "@/hook/use_produk_store";
import DynamicSearch from "@/components/dynamic/search";


export default function Penerimaan() {

    const [editIndex, setEditIndex] = useState(null)
    const [produkDialog, setProdukDialog] = useState(false)
    const {produkTable, deleteProdukTable, produkPagination, setProdukPagination, searchQuery, setSearchQuery} = useProdukTable()
    const {setProdukForm, clearProdukForm} = useProdukForm()

    const handleEdit = (id) => {
        setEditIndex(id)
        setProdukDialog(true)
        const dataToEdit = produkTable.find(produk => produk.uuid == id)
        console.log(dataToEdit)
        setProdukForm(dataToEdit)
    }

    const handleDelete = (id) => {
        console.log(id)
        deleteProdukTable(id)
    }
    
    const handleTambahProduk = () => {
      clearProdukForm()
      setProdukDialog(true)
    }

    const searchedData = deepSearch(produkTable, searchQuery)
    useEffect(() => {
      setProdukPagination({page: 1, limit: 2, total: searchedData.length})
    }, [searchQuery])

    const paginatedData = paginateData(searchedData, produkPagination.page, produkPagination.limit)
    return (
        <div className="mx-5 mt-5 bg-white p-5 text-accentdarken">
            <div className="flex flex-col xl:flex-row gap-5 justify-between">
                <h1 className="text-2xl">Penerimaan</h1>
                <DynamicSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <button type="submit" className="bg-accent text-white py-3 px-4 rounded-sm hover:bg-accentdarken transition-all" onClick={handleTambahProduk}>Tambah Penerimaan</button>
            </div>
            <PenerimaanTable data={paginatedData} handleEdit={handleEdit} handleDelete={handleDelete}/>
            <Pagination paginationData={produkPagination} setPaginationData={setProdukPagination}/>
            <PenerimaanPopup produkDialog={produkDialog} setProdukDialog={setProdukDialog} editIndex={editIndex} setEditIndex={setEditIndex}/>
        </div>
    );
}

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { X } from "lucide-react";
import { Save } from "lucide-react";
import { z } from "zod";
import { register } from "zod-metadata";
register(z);

import DynamicForm from "@/components/dynamic/dynamic-form";
import { v4 as uuidv4 } from 'uuid';

export function PenerimaanPopup({produkDialog, setProdukDialog, editIndex, setEditIndex}) {

    const {produkForm, setProdukForm, clearProdukForm} = useProdukForm()
    const {addProdukTable, updateProdukTable} = useProdukTable()

    const schema = z.object({
        nama_produk: z.string().min(1, "Produk is required").meta({label: "Nama Produk", type: "text", placeholder: "Masukkan Name Produk"}),
        kode_barang: z.string().min(1, "Kode Barang is required").meta({label: "Kode Produk", type: "text", placeholder: "Masukkan Kode Barang"}),
        harga: z.string("Must be a number").min(0, "Must be a positive number").
                regex(/^\d+$/, "Harga must be a valid number").transform((val) => parseInt(val)).
                meta({label: "Harga", type: "number", placeholder: "Masukkan Saldo"}),
    });


    const generateUuid = (data) => {
      const uuid = uuidv4()
      return {...data, uuid: uuid}
    }

    const handleForm = (data) => {
        if(editIndex) {
          updateProdukTable(editIndex, data)
          setEditIndex(null)
        } else {
          const newData = generateUuid(data)
          addProdukTable(newData)
        }
        setProdukDialog(false)
        clearProdukForm()
    }
    return (
      <>
        <AlertDialog open={produkDialog} onOpenChange={setProdukDialog}>
          <AlertDialogContent className="bg-white text-accentdarken">
            <AlertDialogHeader>
              <AlertDialogTitle className="mx-auto mb-5">{editIndex ? "Edit Produk" : "Tambah Produk"}</AlertDialogTitle>
                <X className="absolute cursor-pointer right-3 top-3" onClick={() => setProdukDialog(false)}/>
              <form className="flex flex-col gap-4">
                <DynamicForm schema={schema} formData={produkForm} setFormData={setProdukForm} handleForm={handleForm} 
                buttonProps={{buttonText: "Simpan", icon: <Save />}}/>
            </form>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

import React from "react"
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

  export function PenerimaanTable({data, handleEdit, handleDelete}) {

    const tableData = [
        {
          kode_barang: "BRG001",
          nama_barang: "Laptop",
          kode_belanja: "KB001",
          rekening_belanja: "RB001",
          spesifikasi: "Intel i7, 16GB RAM, 512GB SSD",
          uraian_belanja: "Pembelian Laptop untuk kantor",
          volume_awal: 10,
          jumlah_awal: 15000000,
          volume_terima: 5,
          jumlah_terima: 7500000,
          tanggal: "2024-11-01",
          volume_total: 15,
          jumlah_total: 22500000,
        },
        {
          kode_barang: "BRG002",
          nama_barang: "Printer",
          kode_belanja: "KB002",
          rekening_belanja: "RB002",
          spesifikasi: "Laserjet, Duplex, Wireless",
          uraian_belanja: "Pembelian printer untuk kantor",
          volume_awal: 2,
          jumlah_awal: 3000000,
          volume_terima: 1,
          jumlah_terima: 1500000,
          tanggal: "2024-11-03",
          volume_total: 3,
          jumlah_total: 4500000,
        },
        {
          kode_barang: "BRG003",
          nama_barang: "Meja Kantor",
          kode_belanja: "KB003",
          rekening_belanja: "RB003",
          spesifikasi: "Kayu Jati, 120x60 cm",
          uraian_belanja: "Pembelian meja untuk staf",
          volume_awal: 20,
          jumlah_awal: 5000000,
          volume_terima: 10,
          jumlah_terima: 2500000,
          tanggal: "2024-11-05",
          volume_total: 30,
          jumlah_total: 7500000,
        },
        {
          kode_barang: "BRG004",
          nama_barang: "Kursi Kantor",
          kode_belanja: "KB004",
          rekening_belanja: "RB004",
          spesifikasi: "Ergonomis, Hitam",
          uraian_belanja: "Pembelian kursi untuk staf",
          volume_awal: 15,
          jumlah_awal: 6000000,
          volume_terima: 5,
          jumlah_terima: 2000000,
          tanggal: "2024-11-07",
          volume_total: 20,
          jumlah_total: 8000000,
        },
        {
          kode_barang: "BRG005",
          nama_barang: "Proyektor",
          kode_belanja: "KB005",
          rekening_belanja: "RB005",
          spesifikasi: "Full HD, 3000 Lumens",
          uraian_belanja: "Pembelian proyektor untuk rapat",
          volume_awal: 3,
          jumlah_awal: 12000000,
          volume_terima: 2,
          jumlah_terima: 8000000,
          tanggal: "2024-11-09",
          volume_total: 5,
          jumlah_total: 20000000,
        },
      ];

    return (
        <div className="mx-auto py-10">
        {tableData.length == 0 ? (
            <div className="text-center">Tidak Ada Data</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="min-w-8">Nama Barang</TableHead>
                <TableHead className="min-w-8">Kode Belanja</TableHead>
                <TableHead className="min-w-8">Rekening Belanja</TableHead>
                <TableHead className="min-w-8">Spesifikasi</TableHead>
                <TableHead className="min-w-8">Uraian Belanja</TableHead>
                <TableHead className="min-w-8">Volume Awal</TableHead>
                <TableHead className="min-w-8">Jumlah Awal</TableHead>
                <TableHead className="min-w-8">Volume Terima</TableHead>
                <TableHead className="min-w-8">Jumlah Terima</TableHead>
                <TableHead className="min-w-8">Tanggal</TableHead>
                <TableHead className="min-w-8">Volume Total</TableHead>
                <TableHead className="min-w-8">Jumlah Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item, index) => (
                <React.Fragment key={item.uuid}>
                  <TableRow className="bg-secondary/40 h-[70px]">
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell className="w-64">{item.kode_barang}</TableCell>
                    <TableCell className="min-w-8">{item.nama_barang}</TableCell>
                    <TableCell className="min-w-8">{item.kode_belanja}</TableCell>
                    <TableCell className="min-w-8">{item.rekening_belanja}</TableCell>
                    <TableCell className="min-w-8">{item.spesifikasi}</TableCell>
                    <TableCell className="min-w-8">{item.uraian_belanja}</TableCell>
                    <TableCell className="min-w-8">{item.volume_awal}</TableCell>
                    <TableCell className="min-w-8">
                    {parseInt(item.jumlah_awal).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </TableCell>
                    <TableCell className="">{item.volume_terima}</TableCell>
                    <TableCell className="">
                    {parseInt(item.jumlah_terima).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </TableCell>
                    <TableCell className="">{item.tanggal}</TableCell>
                    <TableCell className="">{item.volume_total}</TableCell>
                    <TableCell className="">
                    {parseInt(item.jumlah_total).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </TableCell>
                    <TableCell>
                    <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(item.uuid)}
                                  className="bg-red-400 text-white hover:bg-red-500 rounded-sm"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(item.uuid)}
                                  className="bg-teal-400 text-white hover:bg-teal-500 rounded-sm"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>     
        )}
        </div>
      )
}



