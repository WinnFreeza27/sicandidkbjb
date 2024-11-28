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

    const produkTable = [{
      nama_produk: "Wipol",
      kode_produk: "1.2.3.4.5.6",
      harga: "1000000",
    },
    {
      nama_produk: "Potabee",
      kode_produk: "6.9.0.4.5.6",
      harga: "500000",
    }
  ]

  const rekeningBelanjaTable = [
    {
        "kode_rekening": "1.005.5.01.01.01",
        "uraian": "Belanja Personal Computer",
        "saldo": "15000000",
        details: [
          {
            uuid: null,
            "nama_rincian": "Computer Core i7 16GB",
            "volume": "2",
            "satuan": "Unit",
            "harga_satuan": "5000000",
          },
          {
            uuid: null,
            "nama_rincian": "Printer Laserjet",
            "volume": "2",
            "satuan": "Unit",
            "harga_satuan": "2500000",
          }
        ]
    },
    {
      "kode_rekening": "1.005.5.01.01.02",
      "uraian": "Belanja ATK",
      "saldo": "15000000",
      details: [
        {
          uuid: null,
          "nama_rincian": "Pensil",
          "volume": "5",
          "satuan": "Kotak",
          "harga_satuan": "50000",
        },
        {
          uuid: null,
          "nama_rincian": "Penghapus",
          "volume": "3",
          "satuan": "Buah",
          "harga_satuan": "10000",
        }
      ]
  },
  ]

  const schema = z.object({
    nama_produk: z.object({
      nama_produk: z.string().optional(), // Optional here as we validate the whole object
      kode_produk: z.string().optional(),
      harga: z.string().optional(),
    })
      .refine(
        (data) => Object.keys(data).length > 0 && Object.values(data).some((value) => value), 
        { message: "Nama Produk cannot be empty" }
      )
      .meta({
        label: "Nama Produk",
        type: "form",
        placeholder: "Masukkan Nama Produk",
        forms: {
          data: produkTable,
          name: ["nama_produk", "kode_produk", "harga"], // Keys in the object
          label: ["Nama Produk", "Kode Produk", "Harga"], // Column labels
        },
      }),
      
  });
  


    const generateUuid = (data) => {
      const uuid = uuidv4()
      return {...data, uuid: uuid}
    }

    const handleForm = (data) => {
      console.log(data)
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
        kode_barang: "1.2.3.4.5.6",
        nama_barang: "Laptop",
        kode_belanja: "5.1.005.003",
        rekening_belanja: "Belanja Personal Komputer",
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
        kode_barang: "1.2.3.4.5.7",
        nama_barang: "Printer",
        kode_belanja: "5.1.006.004",
        rekening_belanja: "Belanja Mesin Cetak",
        spesifikasi: "Laserjet, Duplex, Wireless",
        uraian_belanja: "Pembelian printer untuk dokumen",
        volume_awal: 3,
        jumlah_awal: 4500000,
        volume_terima: 2,
        jumlah_terima: 3000000,
        tanggal: "2024-11-03",
        volume_total: 5,
        jumlah_total: 7500000,
      },
      {
        kode_barang: "1.2.3.4.5.8",
        nama_barang: "Meja Kantor",
        kode_belanja: "5.2.007.008",
        rekening_belanja: "Belanja Perlengkapan Kantor",
        spesifikasi: "Kayu Jati, 120x60 cm",
        uraian_belanja: "Pembelian meja untuk staf",
        volume_awal: 10,
        jumlah_awal: 7000000,
        volume_terima: 5,
        jumlah_terima: 3500000,
        tanggal: "2024-11-05",
        volume_total: 15,
        jumlah_total: 10500000,
      },
      {
        kode_barang: "1.2.3.4.5.9",
        nama_barang: "Kursi Kantor",
        kode_belanja: "5.2.007.009",
        rekening_belanja: "Belanja Perabot Kantor",
        spesifikasi: "Ergonomis, Roda Putar",
        uraian_belanja: "Pengadaan kursi untuk ruang meeting",
        volume_awal: 8,
        jumlah_awal: 3200000,
        volume_terima: 4,
        jumlah_terima: 1600000,
        tanggal: "2024-11-06",
        volume_total: 12,
        jumlah_total: 4800000,
      },
      {
        kode_barang: "1.2.3.4.6.0",
        nama_barang: "Proyektor",
        kode_belanja: "5.3.010.012",
        rekening_belanja: "Belanja Alat Presentasi",
        spesifikasi: "Full HD, 3000 Lumens",
        uraian_belanja: "Pembelian proyektor untuk rapat",
        volume_awal: 2,
        jumlah_awal: 20000000,
        volume_terima: 1,
        jumlah_terima: 10000000,
        tanggal: "2024-11-07",
        volume_total: 3,
        jumlah_total: 30000000,
      },
    ];
    

    return (
        <div className="mx-auto py-10 w-full overflow-auto">
        {tableData.length == 0 ? (
            <div className="text-center">Tidak Ada Data</div>
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
                <TableHead className="w-32">Volume Awal</TableHead>
                <TableHead className="w-32">Jumlah Awal</TableHead>
                <TableHead className="w-32">Volume Terima</TableHead>
                <TableHead className="w-32">Jumlah Terima</TableHead>
                <TableHead className="w-32">Tanggal</TableHead>
                <TableHead className="w-32">Volume Total</TableHead>
                <TableHead className="w-32">Jumlah Total</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item, index) => (
                <React.Fragment key={item.kode_barang}>
                  <TableRow className="bg-secondary/40 h-[70px]">
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell className="">{item.kode_barang}</TableCell>
                    <TableCell className="">{item.nama_barang}</TableCell>
                    <TableCell className="">{item.kode_belanja}</TableCell>
                    <TableCell className="">{item.rekening_belanja}</TableCell>
                    <TableCell className="">{item.uraian_belanja}</TableCell>
                    <TableCell className="">{item.volume_awal}</TableCell>
                    <TableCell className="">
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



