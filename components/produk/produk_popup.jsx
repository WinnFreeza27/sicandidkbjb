import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { X } from "lucide-react";
import { Save } from "lucide-react";
import { z } from "zod";
import { register } from "zod-metadata";
register(z);

import DynamicForm from "@/components/dynamic/dynamic-form";
import { useProdukForm, useProdukTable } from "@/hook/use_produk_store";
import { v4 as uuidv4 } from 'uuid';

export default function ProdukPopup({produkDialog, setProdukDialog, editIndex, setEditIndex}) {

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