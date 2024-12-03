"use client"
import Pagination from "@/components/dynamic/pagination";
import {useEffect, useState} from "react";
import { paginateData } from "@/utils/paginate_data";
import { deepSearch } from "@/utils/search_and_filter";
import { useProdukForm, useProdukTable } from "@/hook/use_produk_store";
import DynamicSearch from "@/components/dynamic/search";


export default function Penerimaan() {

    const [editIndex, setEditIndex] = useState(null)
    const [penerimaanDialog, setPenerimaanDialog] = useState(false)
    const {produkTable, deleteProdukTable, produkPagination, setProdukPagination, searchQuery, setSearchQuery} = useProdukTable()
    const {clearPenerimaanForm} = usePenerimaanForm()
    const {penerimaanTable, setPenerimaanPagination, penerimaanPagination} = usePenerimaanTable()

    // const handleEdit = (id) => {
    //     setEditIndex(id)
    //     setProdukDialog(true)
    //     const dataToEdit = produkTable.find(produk => produk.uuid == id)
    //     console.log(dataToEdit)
    //     setProdukForm(dataToEdit)
    // }

    // const handleDelete = (id) => {
    //     console.log(id)
    //     deleteProdukTable(id)
    // }
    
    const handleTambahProduk = () => {
      clearPenerimaanForm()
      setPenerimaanDialog(true)
    }

    const searchedData = deepSearch(penerimaanTable, searchQuery)
    useEffect(() => {
      setPenerimaanPagination({total: searchedData.length})
    }, [searchQuery])

    const paginatedData = paginateData(searchedData, penerimaanPagination.page, penerimaanPagination.limit)
    return (
        <div className="mx-5 mt-5 bg-white p-5 text-accentdarken">
            <div className="flex flex-col xl:flex-row gap-5 justify-between">
                <h1 className="text-2xl">Penerimaan</h1>
                <DynamicSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <button type="submit" className="bg-accent text-white py-3 px-4 rounded-sm hover:bg-accentdarken transition-all" onClick={handleTambahProduk}>Tambah Penerimaan</button>
            </div>
            <PenerimaanTable tableData={paginatedData}/>
            <Pagination paginationData={penerimaanPagination} setPaginationData={setPenerimaanPagination}/>
            <PenerimaanPopup penerimaanDialog={penerimaanDialog} setPenerimaanDialog={setPenerimaanDialog} editIndex={editIndex} setEditIndex={setEditIndex}/>
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

export function PenerimaanPopup({ penerimaanDialog, setPenerimaanDialog, editIndex, setEditIndex }) {
  const { penerimaanForm, setPenerimaanForm, clearPenerimaanForm } = usePenerimaanForm();
  const { produkTable } = useProdukTable();
  const { rekeningTable } = useRekeningBelanjaTable();
  const { stock, addStock, updateStock } = useStockStore();
  const { penerimaanTable, addPenerimaanTable } = usePenerimaanTable();

  const rincianTable = penerimaanForm.rekening_belanja?.details || [];
  const checkStock = () => {
    function isNotEmptyObject(obj) {
      return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
    }

    if (
      isNotEmptyObject(penerimaanForm?.nama_produk) &&
      isNotEmptyObject(penerimaanForm?.rekening_belanja) &&
      isNotEmptyObject(penerimaanForm?.rincian)
    ) {
      const stockFind = stock.find(
        (item) =>
          item?.nama_produk?.uuid === penerimaanForm?.nama_produk?.uuid &&
          item?.rekening_belanja?.uuid === penerimaanForm?.rekening_belanja?.uuid &&
          item?.rincian?.uuid === penerimaanForm?.rincian?.uuid
      );
      return {
        volume_awal: stockFind?.volume || "0",
        stock_find: !!stockFind,
        uuid: stockFind?.uuid || null,
      };
    }
    return {
      volume_awal: "0",
      stock_find: false,
      uuid: null,
    };
  };

  const schema = z.object({
    nama_produk: z
      .object({
        nama_produk: z.string().optional(),
        kode_barang: z.string().optional(),
        harga: z.string().optional(),
      })
      .refine((data) => Object.keys(data).length > 0 && Object.values(data).some((value) => value), {
        message: "Nama Barang cannot be empty",
      })
      .meta({
        label: "Nama Barang",
        type: "form",
        placeholder: "Masukkan Nama Barang",
        forms: {
          data: produkTable,
          name: ["nama_produk", "kode_barang", "harga"],
          label: ["Nama Produk", "Kode Barang", "Harga"],
        },
      }),
    kode_barang: z
      .string()
      .optional()
      .meta({
        label: "Kode Barang",
        type: "disabled",
        placeholder: "",
        value: penerimaanForm.nama_produk?.kode_barang || "",
      }),
    harga: z
      .string()
      .optional()
      .meta({
        label: "Harga Barang",
        type: "disabled",
        placeholder: "",
        value: penerimaanForm.nama_produk?.harga || "",
      }),
    rekening_belanja: z
      .object({
        kode_rekening: z.string().optional(),
        uraian: z.string().optional(),
        saldo: z.string().optional(),
      })
      .refine((data) => Object.keys(data).length > 0 && Object.values(data).some((value) => value), {
        message: "Rekening Belanja cannot be empty",
      })
      .meta({
        label: "Rekening Belanja",
        type: "form",
        placeholder: "Masukkan Rekening Belanja",
        forms: {
          data: rekeningTable,
          name: ["uraian", "kode_rekening", "saldo"],
          label: ["Rekening Belanja", "Kode Rekening", "Jumlah"],
        },
      }),
    kode_rekening: z
      .string()
      .optional()
      .meta({
        label: "Kode Rekening",
        type: "disabled",
        placeholder: "",
        value: penerimaanForm.rekening_belanja?.kode_rekening || "",
      }),
    saldo: z
      .string()
      .optional()
      .meta({
        label: "Saldo Rekening",
        type: "disabled",
        placeholder: "",
        value: penerimaanForm.rekening_belanja?.saldo || "",
      }),
    rincian: z
      .object({
        nama_rincian: z.string().optional(),
        harga_satuan: z.string().optional(),
        volume: z.string().optional(),
        satuan: z.string().optional(),
      })
      .refine((data) => Object.keys(data).length > 0 && Object.values(data).some((value) => value), {
        message: "Rincian cannot be empty",
      })
      .meta({
        label: "Rincian",
        type: "form",
        placeholder: "Masukkan Rincian",
        forms: {
          data: rincianTable,
          name: ["nama_rincian", "harga_satuan", "volume", "satuan"],
          label: ["Nama Rincian", "Harga Satuan", "Volume", "Satuan"],
        },
      }),
    harga_satuan: z
      .string()
      .optional()
      .meta({
        label: "Harga Rincian",
        type: "disabled",
        placeholder: "",
        value: penerimaanForm.rincian?.harga_satuan || "",
      }),
    volume_awal: z
      .string()
      .optional()
      .meta({
        label: "Volume Awal",
        type: "disabled",
        placeholder: "",
        value: checkStock().volume_awal.toString() || "0",
      }),
    volume_terima: z.string().min(1, "Volume Terima is required").meta({
      label: "Volume Terima",
      type: "number",
      placeholder: "Masukkan Volume Terima",
    }),
    tanggal_terima: z.string().min(1, "Tanggal Terima is required").meta({
      label: "Tanggal Terima",
      type: "date",
      placeholder: "Masukkan Tanggal Terima",
    }),
    jumlah_terima: z
      .string()
      .optional()
      .meta({
        label: "Jumlah Terima",
        type: "disabled",
        placeholder: "",
        value: (
          parseInt(penerimaanForm.volume_terima || "0") * parseInt(penerimaanForm.harga || "0")
        ).toString() || "0",
      }),
  });

  const transformAndGenerate = (data) => {
    const dataToTake = ["nama_produk", "rekening_belanja", "rincian", "volume_terima", "tanggal_terima", "volume_awal"]
    const newData = dataToTake.reduce((acc, key) => ({...acc, [key]: data[key]}), {})
    return {
      uuid: uuidv4(),
      ...newData
    }
  }

  const handleForm = (data) => {
    const newData = transformAndGenerate(data);
    const stockNow = checkStock();
    const dataStock = removeKeys(newData, ["volume_terima", "tanggal_terima", "volume_awal"]);
    if (stockNow.stock_find) {
      const dataToUpdate = {
        ...dataStock,
        volume: parseInt(newData.volume_terima) + parseInt(stockNow.volume_awal),
      };
      updateStock(stockNow.uuid, dataToUpdate);
    } else {
      const addStockData = {
        ...dataStock,
        volume: parseInt(newData.volume_terima),
      };
      addStock(addStockData);
    }
    addPenerimaanTable(newData);
    setPenerimaanDialog(false);
    clearPenerimaanForm();
  };

  return (
    <AlertDialog open={penerimaanDialog} onOpenChange={setPenerimaanDialog}>
      <AlertDialogContent className="bg-white text-accentdarken">
        <AlertDialogHeader>
          <AlertDialogTitle className="mx-auto mb-5">
            {editIndex ? "Edit Produk" : "Tambah Penerimaan"}
          </AlertDialogTitle>
          <X
            className="absolute cursor-pointer right-3 top-3"
            onClick={() => setPenerimaanDialog(false)}
          />
          <form className="flex flex-col gap-4 relative">
            <DynamicForm
              schema={schema}
              formData={penerimaanForm}
              setFormData={setPenerimaanForm}
              handleForm={handleForm}
              buttonProps={{ buttonText: "Simpan", icon: <Save /> }}
            />
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

  

  import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

import React from "react"
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePenerimaanForm, usePenerimaanTable } from "@/hook/use_penerimaan_store";
import { useRekeningBelanjaTable } from "@/hook/use-rekening-belanja-store";
import { useStockStore } from "@/hook/use_stock_store";
import { update } from "lodash";
import { removeKeys } from "@/utils/remove_keys";

  export function PenerimaanTable({tableData, handleEdit, handleDelete}) {

    
    

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item, index) => (
                <React.Fragment key={item.uuid}>
                  <TableRow className="bg-secondary/40 h-[70px]">
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell className="">{item.nama_produk.kode_barang}</TableCell>
                    <TableCell className="">{item.nama_produk.nama_produk}</TableCell>
                    <TableCell className="">{item.rekening_belanja.kode_rekening}</TableCell>
                    <TableCell className="">{item.rekening_belanja.uraian}</TableCell>
                    <TableCell className="">{item.rincian.nama_rincian}</TableCell>
                    <TableCell className="">{item.volume_awal}</TableCell>
                    <TableCell className="">
                    {(parseInt(item.volume_awal) * parseInt(item.nama_produk.harga)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </TableCell>
                    <TableCell className="">{item.volume_terima}</TableCell>
                    <TableCell className="">
                    {(parseInt(item.volume_terima) * parseInt(item.nama_produk.harga)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </TableCell>
                    <TableCell className="">{item.tanggal_terima}</TableCell>
                    <TableCell className="">{parseInt(item.volume_terima) + parseInt(item.volume_awal)}</TableCell>
                    <TableCell className="">
                    {((parseInt(item.volume_terima) + parseInt(item.volume_awal)) * parseInt(item.nama_produk.harga)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </TableCell>
                    {/* <TableCell>
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
                    </TableCell> */}
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



