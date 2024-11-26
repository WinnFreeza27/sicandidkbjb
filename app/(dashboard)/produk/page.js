"use client"
import { Search } from "lucide-react";
import Pagination from "@/components/dynamic/pagination";
import {useState} from "react";
import { Button } from "@/components/ui/button";


export default function Produk() {

    const [editIndex, setEditIndex] = useState(null)
    const [produkDialog, setProdukDialog] = useState(false)
    const {produkTable} = useProdukTable()
    const {setProdukForm} = useProdukForm()

    const handleEdit = (id) => {
        setEditIndex(id)
        setProdukDialog(true)
        const dataToEdit = produkTable.find(produk => produk.kode_barang == id)
        console.log(dataToEdit)
        setProdukForm(dataToEdit)
    }

    const handleDelete()

    return (
        <div className="mx-5 mt-5 bg-white p-5 text-accentdarken">
            <div className="flex flex-col xl:flex-row gap-5 justify-between">
                <h1 className="text-2xl">Produk</h1>
                <label htmlFor="search" className="flex xl:w-96 border border-primary items-center focus:border-accentdarken pr-4">
                <input type="search" placeholder="Cari Produk..." className="text-sm  px-4 xl:w-96 py-2 rounded-sm outline-none text-accentdarken placeholder:text-secondary " />
                <Search />
                </label>
                <button type="submit" className="bg-accent text-white py-3 px-4 rounded-sm hover:bg-accentdarken transition-all" onClick={() => setProdukDialog(true)}>Tambah Produk</button>
            </div>
            
            <TabelProduk data={produkTable} handleEdit={handleEdit}/>
            <Pagination/>
            <ProdukPopup produkDialog={produkDialog} setProdukDialog={setProdukDialog} editIndex={editIndex} setEditIndex={setEditIndex}/>
        </div>
    );
}

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import React from "react"
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";

  export function TabelProduk({data, handleEdit}) {

    
  
    return (
        <div className="mx-auto py-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="">Produk</TableHead>
                <TableHead className="min-w-8">Kode Barang</TableHead>
                <TableHead className="">Harga</TableHead>
                <TableHead className="">Aksi</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <React.Fragment key={item.kode_barang}>
                  {/* Parent Row */}
                  <TableRow className="bg-secondary/40 h-[70px]">
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell className="min-w-8">{item.nama_produk}</TableCell>
                    <TableCell className="">{item.kode_barang}</TableCell>
                    <TableCell className="">{parseInt(item.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                    <TableCell>
                    <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(item.kode_barang)}
                                  className="bg-red-400 text-white hover:bg-red-500 rounded-sm"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteRincian(item.kode_barang)}
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
        </div>
      )
}

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { X } from "lucide-react";
import {useRef} from "react";
import { Save } from "lucide-react";
import { z } from "zod";
import { register } from "zod-metadata";
register(z);

import DynamicForm from "@/components/dynamic/dynamic-form";
import { useProdukForm, useProdukTable } from "@/hook/use_produk_store";

export function ProdukPopup({produkDialog, setProdukDialog, editIndex, setEditIndex}) {

    const {produkForm, setProdukForm, clearProdukForm} = useProdukForm()
    const {setProdukTable} = useProdukTable()

    const schema = z.object({
        nama_produk: z.string().min(1, "Produk is required").meta({label: "Nama Produk", type: "text", placeholder: "Masukkan Name Produk"}),
        kode_barang: z.string().min(1, "Kode Barang is required").meta({label: "Kode Produk", type: "text", placeholder: "Masukkan Kode Barang"}),
        harga: z.string("Must be a number").min(0, "Must be a positive number").
                regex(/^\d+$/, "Harga must be a valid number").transform((val) => parseInt(val)).
                meta({label: "Harga", type: "number", placeholder: "Masukkan Saldo"}),
    });

    const resetProdukFormRef = useRef(null);

    const handleForm = (data) => {
        console.log(data)
        setProdukDialog(false)
        clearProdukForm()
        if (resetProdukFormRef.current) {
                resetProdukFormRef.current({});
        }

        setProdukTable(data)
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
                buttonProps={{buttonText: "Simpan", icon: <Save />}} resetRef={resetProdukFormRef}/>
            </form>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }