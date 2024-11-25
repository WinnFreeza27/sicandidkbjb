import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Separator } from "@radix-ui/react-separator";
import { X } from "lucide-react";
import {useState, useRef} from "react";
import { Save } from "lucide-react";
import { z } from "zod";
import { register } from "zod-metadata";
register(z);

import {useRekeningBelanjaMainForm, useRekeningBelanjaDetailForm} from "@/hook/use-rekening-belanja-store";
import TableRekeningPopup from "./rekening-popup-table";
import RekeningMainForm from "./rekening-main-form";
import RekeningDetailForm from "./rekening-detail-form";

export default function RekeningPopup({rekeningDialog, setRekeningDialog}) {

    const resetMainFormRef = useRef(null);
    const {mainForm, clearMainForm, getMainForm} = useRekeningBelanjaMainForm();
    const {setDetailForm, clearDetailForm} = useRekeningBelanjaDetailForm();
    const [tableData, setTableData] = useState([
      { ...mainForm, details: [] }, // Initialize with the mainForm values and empty details
    ]);
    
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [editingDetailIndex, setEditingDetailIndex] = useState(null);
    
    const handleEditRincian = (uuid) => {
      const detailToEdit = tableData[0].details.find((detail) => detail.uuid === uuid);
      console.log(detailToEdit)
      setDetailForm({...detailToEdit});
      setEditingDetailIndex(uuid);
      setShowDetailDialog(true);
    };
    
    const handleDeleteRincian = (uuid) => {
      setTableData((prev) => {
        if (prev.length === 0) return prev;
    
        const updatedDetails = prev[0].details.filter((detail) => detail.uuid !== uuid);
        return [{ ...prev[0], details: updatedDetails }];
      });
    };

    const onSubmitRekening = (data) => {
        setRekeningDialog(false)
        clearDetailForm();
        clearMainForm();

        if (resetMainFormRef.current) {
          resetMainFormRef.current({});
        }

        const clearedMainForm = getMainForm();
        console.log(clearedMainForm)
        setTableData([{...clearedMainForm, details: []}])
        console.log(data)
      }
      
  
    return (
      <>
        <AlertDialog open={rekeningDialog} onOpenChange={setRekeningDialog}>
          <AlertDialogContent className="bg-white text-accentdarken">
            <AlertDialogHeader>
              <AlertDialogTitle className="mx-auto mb-5">Tambah Rekening</AlertDialogTitle>
                <X className="absolute cursor-pointer right-3 top-3" onClick={() => setRekeningDialog(false)}/>
              <div>
                <RekeningMainForm setTableData={setTableData} setEditingDetailIndex={setEditingDetailIndex} setShowDetailDialog={setShowDetailDialog} resetRef={resetMainFormRef}/>
                <Separator orientation="horizontal" className="my-4" />
                <TableRekeningPopup tableData={tableData} handleEditRincian={handleEditRincian} handleDeleteRincian={handleDeleteRincian}/>
            </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
                    <button className="bg-accent text-white py-3 px-4 rounded-sm hover:bg-accentdarken transition-all flex gap-3 items-center mx-auto" onClick={() => onSubmitRekening(tableData)}>Simpan
                      <Save className="size-5"/>
                    </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <AlertDialogContent className="bg-white text-accentdarken">
            <RekeningDetailForm setTableData={setTableData} editingDetailIndex={editingDetailIndex} setShowDetailDialog={setShowDetailDialog} setEditingDetailIndex={setEditingDetailIndex}/>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }