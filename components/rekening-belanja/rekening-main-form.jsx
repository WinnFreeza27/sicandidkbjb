import { z } from "zod";
import { register } from "zod-metadata";
register(z);

import {useRekeningBelanjaMainForm, useRekeningBelanjaDetailForm} from "@/hook/use-rekening-belanja-store";
import DynamicForm from "../dynamic/dynamic-form";

export default function RekeningMainForm({setTableData, setEditingDetailIndex, setShowDetailDialog, resetRef}) {
    const schema = z.object({
      "kode-rekening": z.string().min(1, "Kode Rekening is required").meta({label: "Kode Rekening", type: "text", placeholder: "Masukkan Kode Rekening"}),
      "uraian": z.string().min(1, "Uraian is required").meta({label: "Uraian", type: "text", placeholder: "Masukkan Uraian"}),
      "saldo": z.string("Must be a number").min(0, "Must be a positive number").
                regex(/^\d+$/, "Saldo must be a valid number").transform((val) => parseInt(val)).
                meta({label: "Saldo", type: "number", placeholder: "Masukkan Saldo"}),
    })

    const {mainForm, setMainForm} = useRekeningBelanjaMainForm();
    const {clearDetailForm} = useRekeningBelanjaDetailForm();

    const onMainFormChange = (data) => {
      const updatedMainForm = { ...mainForm, ...data };
    
      setTableData((prevTableData) => {
        // Ensure tableData[0] always reflects the latest mainForm
        if (prevTableData.length === 0) {
          return [{ ...updatedMainForm, details: [] }];
        } else {
          return [{ ...updatedMainForm, details: prevTableData[0].details }];
        }
      });
    };

    const handleTambahRincian = () => {
      setEditingDetailIndex(null);
      clearDetailForm();
      setShowDetailDialog(true);
    };

    return (
      <form className="flex flex-col gap-4">
        <DynamicForm handleForm={handleTambahRincian} schema={schema} formData={mainForm} setFormData={setMainForm}
          onDataChange={onMainFormChange} buttonProps={{buttonText: "Tambah Rincian"}} resetRef={resetRef}
         />
      </form>
    )
  }