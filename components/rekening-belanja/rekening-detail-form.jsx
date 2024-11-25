import { AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { X } from "lucide-react";
import { Save } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";
import { register } from "zod-metadata";
register(z);

import {useRekeningBelanjaMainForm, useRekeningBelanjaDetailForm} from "@/hook/use-rekening-belanja-store";
import DynamicForm from "../dynamic/dynamic-form";

  

  export default function RekeningDetailForm({setTableData, editingDetailIndex, setShowDetailDialog, setEditingDetailIndex}) {

    const schema = z.object({
      "nama-rincian": z.string().min(1, "Nama Rincian is required").meta({label: "Nama Rincian", type: "text", placeholder: "Masukkan Nama Rincian"}),
      "volume": z.string("Must be a number").min(0, "Must be a positive number").
                regex(/^\d+$/, "Volume must be a valid number").transform((val) => parseInt(val)).
                meta({label: "Volume", type: "number", placeholder: "Masukkan Volume"}),
      "satuan": z.string().min(1, "Satuan is required").
                meta({label: "Satuan", type: "select", placeholder: "Pilih Satuan", selectOptions: ["Paket", "Kotak", "Buah", "Pcs", "Lusin", "Lembar", "Meter"]}),
      "harga-satuan": z.string("Must be a number").min(0, "Must be a positive number").
                regex(/^\d+$/, "Harga Satuan must be a valid number").transform((val) => parseInt(val)).
                meta({label: "Harga Satuan", type: "number", placeholder: "Masukkan Harga Satuan"}),
    })

    const {detailForm, setDetailForm, clearDetailForm} = useRekeningBelanjaDetailForm();
    const {mainForm} = useRekeningBelanjaMainForm();
    
    const handleSimpanRincian = (data) => {
      console.log(data)
      const newDetail = {
        ...data,
        uuid: uuidv4(),
      };
      setTableData((prev) => {
        console.log(prev)
        if (prev.length === 0) {
          // If no tableData exists, initialize it
          return [{ ...mainForm, details: [newDetail] }];
        }
        let updatedDetails = [...prev[0].details];
        if (editingDetailIndex !== null) {
          // Update an existing rincian
           updatedDetails = updatedDetails.map((detail) => {
              if(detail.uuid === editingDetailIndex) {
                detail = newDetail
              }
              return detail
          })
        } else {
          // Add a new rincian
          updatedDetails.unshift(newDetail);
        }
    
        return [{ ...prev[0], details: updatedDetails }];
      });
      setShowDetailDialog(false);
      clearDetailForm();
      setEditingDetailIndex(null);
    };

    return (
      <AlertDialogHeader>
              <AlertDialogTitle className="mx-auto mb-5">
                {editingDetailIndex !== null ? 'Edit Rincian' : 'Tambah Rincian'}
                <X className="absolute cursor-pointer right-3 top-3" onClick={() => setShowDetailDialog(false)}/>
              </AlertDialogTitle>
              <div>
                <form className="flex flex-col gap-4">
                  <label htmlFor="detail-kode-rekening" className="flex items-center gap-3">
                    <span className="whitespace-nowrap w-32">Kode Rekening</span>
                    <span>:</span>
                    <div className="flex flex-col w-full">
                      <input
                        id="detail-kode-rekening"
                        className="py-2 flex-1 rounded px-2 outline-none border border-primary bg-gray-100"
                        type="text"
                        readOnly
                        value={mainForm["kode-rekening"]}
                      />
                    </div>
                  </label>
                  <label htmlFor="detail-uraian" className="flex items-center gap-3">
                    <span className="whitespace-nowrap w-32">Uraian</span>
                    <span>:</span>
                    <div className="flex flex-col w-full">
                    <input
                      id="detail-uraian"
                      className="py-2 flex-1 rounded px-2 outline-none border border-primary bg-gray-100"
                      type="text"
                      readOnly
                      value={mainForm["uraian"]}
                    />
                    </div>
                  </label>
                  <DynamicForm handleForm={handleSimpanRincian} schema={schema} formData={detailForm} setFormData={setDetailForm} 
                  buttonProps={{buttonText: editingDetailIndex !== null ? 'Update Rincian' : 'Simpan Rincian', icon: <Save className="size-5"/>}}/>
                </form>
              </div>
            </AlertDialogHeader>
    )
  }