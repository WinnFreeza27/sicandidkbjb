"use client"
import Pagination from "@/components/dynamic/pagination";
import {useEffect, useState} from "react";
import { paginateData } from "@/utils/paginate_data";
import { deepSearch } from "@/utils/search_and_filter";
import { useProdukForm, useProdukTable } from "@/hook/use_produk_store";
import DynamicSearch from "@/components/dynamic/search";


export default function Pengeluaran() {

    const [editIndex, setEditIndex] = useState(null)
    const [penerimaanDialog, setPenerimaanDialog] = useState(false)
    const {produkTable, deleteProdukTable, produkPagination, setProdukPagination, searchQuery, setSearchQuery} = useProdukTable()
    const {clearPengeluaranForm} = usePengeluaranFormStore()
    const {pengeluaranTable, pengeluaranPagination, setPengeluaranPagination} = usePengeluaranTable()

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
      clearPengeluaranForm()
      setPenerimaanDialog(true)
    }

    const searchedData = deepSearch(pengeluaranTable, searchQuery)
    useEffect(() => {
      setPengeluaranPagination({total: searchedData.length})
    }, [searchQuery])

    const paginatedData = paginateData(searchedData, pengeluaranPagination.page, pengeluaranPagination.limit)
    return (
        <div className="mx-5 mt-5 bg-white p-5 text-accentdarken">
            <div className="flex flex-col xl:flex-row gap-5 justify-between">
                <h1 className="text-2xl">Penerimaan</h1>
                <DynamicSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <button type="submit" className="bg-accent text-white py-3 px-4 rounded-sm hover:bg-accentdarken transition-all" onClick={handleTambahProduk}>Tambah Pengeluaran</button>
            </div>
            <PenerimaanTable tableData={paginatedData}/>
            <Pagination paginationData={pengeluaranPagination} setPaginationData={setPengeluaranPagination}/>
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
  const { pengeluaranForm, setPengeluaranForm, clearPengeluaranForm } = usePengeluaranFormStore();
  const { produkTable } = useProdukTable();
  const { rekeningTable } = useRekeningBelanjaTable();
  const { stock, updateStock } = useStockStore();
  const { pengeluaranTable, addPengeluaranTable } = usePengeluaranTable();

  // Filter and format stock data for use in forms
  const pengeluaranData = filterObjectList(stock, ["uuid", "nama_produk", "volume"]);
  const formattedPengeluaranData = pengeluaranData
    ?.filter((item) => parseInt(item.volume || "0") > 0) // Skip items with volume 0
    .map((item) => ({
        ...item.nama_produk,
        volume: item.volume?.toString() || "0",
        stock_uuid: item.uuid || "",
    }));


  const selectedStockUUID = pengeluaranForm.nama_produk?.stock_uuid || "";
  const findStock = stock.find((item) => item.uuid === selectedStockUUID) || {};

  const schema = z.object({
      nama_produk: z
          .object({
              nama_produk: z.string().optional(),
              kode_barang: z.string().optional(),
              harga: z.string().optional(),
              volume: z.string().optional(),
          })
          .refine(
              (data) =>
                  Object.keys(data).length > 0 &&
                  Object.values(data).some((value) => value),
              { message: "Nama Barang cannot be empty" }
          )
          .meta({
              label: "Nama Barang",
              type: "form",
              placeholder: "Masukkan Nama Barang",
              forms: {
                  data: formattedPengeluaranData || [],
                  name: ["nama_produk", "kode_barang", "harga", "volume"],
                  label: ["Nama Produk", "Kode Barang", "Harga", "Stock"],
              },
          }),
      kode_barang: z
          .string()
          .optional()
          .meta({
              label: "Kode Produk",
              type: "disabled",
              placeholder: "",
              value: pengeluaranForm.nama_produk?.kode_barang || "",
          }),
      harga: z
          .string()
          .optional()
          .meta({
              label: "Harga Produk",
              type: "disabled",
              placeholder: "",
              value: pengeluaranForm.nama_produk?.harga || "",
          }),
      rekening_belanja: z
          .string()
          .optional()
          .meta({
              label: "Rekening Belanja",
              type: "disabled",
              placeholder: "",
              value: findStock?.rekening_belanja?.uraian || "",
          }),
      kode_belanja: z
          .string()
          .optional()
          .meta({
              label: "Kode Belanja",
              type: "disabled",
              placeholder: "",
              value: findStock?.rekening_belanja?.kode_rekening || "",
          }),
      saldo: z
          .string()
          .optional()
          .meta({
              label: "Saldo Rekening",
              type: "disabled",
              placeholder: "",
              value: findStock?.rekening_belanja?.saldo?.toString() || "0",
          }),
      rincian: z
          .string()
          .optional()
          .meta({
              label: "Nama Rincian",
              type: "disabled",
              placeholder: "",
              value: findStock?.rincian?.nama_rincian || "",
          }),
      harga_rincian: z
          .string()
          .optional()
          .meta({
              label: "Harga Rincian",
              type: "disabled",
              placeholder: "",
              value: findStock?.rincian?.harga_satuan?.toString() || "0",
          }),
      volume_awal: z
          .string()
          .optional()
          .meta({
              label: "Volume Awal",
              type: "disabled",
              placeholder: "",
              value: findStock?.volume?.toString() || "0",
          }),
      volume_keluar: z
          .string()
          .min(1, "Volume keluar is required")
          .meta({
              label: "Volume keluar",
              type: "number",
              placeholder: "Masukkan Volume keluar",
          }),
      tanggal_keluar: z
          .string()
          .min(1, "Tanggal keluar is required")
          .meta({
              label: "Tanggal keluar",
              type: "date",
              placeholder: "Masukkan Tanggal keluar",
          }),
      jumlah_keluar: z
          .string()
          .optional()
          .meta({
              label: "Jumlah keluar",
              type: "disabled",
              placeholder: "",
              value: (
                  parseInt(pengeluaranForm.volume_keluar || "0") *
                  parseInt(pengeluaranForm.harga || "0")
              ).toString() || "0",
          }),
  });

  const transformAndGenerate = (data) => {
      const dataToTake = [
          "nama_produk",
          "rekening_belanja",
          "kode_belanja",
          "rincian",
          "volume_keluar",
          "tanggal_keluar",
          "volume_awal",
      ];
      const newData = dataToTake.reduce(
          (acc, key) => ({ ...acc, [key]: data[key] || "" }),
          {}
      );
      return {
          ...newData,
          uuid: uuidv4(),
      };
  };

  const handleForm = (data) => {
      const newData = transformAndGenerate(data);
      const totalVolume =
          parseInt(newData.volume_awal || "0") -
          parseInt(newData.volume_keluar || "0");

      const dataToUpdate = {
          volume: totalVolume.toString(),
      };

      updateStock(newData.nama_produk?.stock_uuid, dataToUpdate);
      addPengeluaranTable(newData);
      setPenerimaanDialog(false);
      clearPengeluaranForm();
  };

  return (
      <>
          <AlertDialog open={penerimaanDialog} onOpenChange={setPenerimaanDialog}>
              <AlertDialogContent className="bg-white text-accentdarken">
                  <AlertDialogHeader>
                      <AlertDialogTitle className="mx-auto mb-5">
                          {editIndex ? "Edit Pengeluaran" : "Tambah Pengeluaran"}
                      </AlertDialogTitle>
                      <X
                          className="absolute cursor-pointer right-3 top-3"
                          onClick={() => setPenerimaanDialog(false)}
                      />
                      <form className="flex flex-col gap-4 relative">
                          <DynamicForm
                              schema={schema}
                              formData={pengeluaranForm}
                              setFormData={setPengeluaranForm}
                              handleForm={handleForm}
                              buttonProps={{
                                  buttonText: "Simpan",
                                  icon: <Save />,
                              }}
                          />
                      </form>
                  </AlertDialogHeader>
              </AlertDialogContent>
          </AlertDialog>
      </>
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
import { filterObjectList } from "@/utils/filter_object";
import { restructureObjectList } from "@/utils/restructure_object";
import { usePengeluaranFormStore, usePengeluaranTable } from "@/hook/use_pengeluaran_store";

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
                <TableHead className="w-32">Volume Keluar</TableHead>
                <TableHead className="w-32">Jumlah Keluar</TableHead>
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
                    <TableCell className="">{item.kode_belanja}</TableCell>
                    <TableCell className="">{item.rekening_belanja}</TableCell>
                    <TableCell className="">{item.rincian}</TableCell>
                    <TableCell className="">{item.volume_awal}</TableCell>
                    <TableCell className="">
                    {(parseInt(item.volume_awal) * parseInt(item.nama_produk.harga)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </TableCell>
                    <TableCell className="">{item.volume_keluar}</TableCell>
                    <TableCell className="">
                    {(parseInt(item.volume_keluar) * parseInt(item.nama_produk.harga)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </TableCell>
                    <TableCell className="">{item.tanggal_keluar}</TableCell>
                    <TableCell className="">{parseInt(item.volume_awal) - parseInt(item.volume_keluar)}</TableCell>
                    <TableCell className="">
                    {((parseInt(item.volume_awal) - parseInt(item.volume_keluar)) * parseInt(item.nama_produk.harga)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
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