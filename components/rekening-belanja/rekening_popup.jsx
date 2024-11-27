import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Separator } from "@radix-ui/react-separator";
import { v4 as uuidv4 } from "uuid";
import { X } from "lucide-react";
import {useState, useRef} from "react";
import { Save } from "lucide-react";
import { z } from "zod";
import { register } from "zod-metadata";
register(z);

import {useRekeningBelanjaMainForm, useRekeningBelanjaDetailForm, useRekeningBelanjaTable} from "@/hook/use-rekening-belanja-store";
import TableRekeningPopup from "./rekening_popup_table";
import RekeningMainForm from "./rekening_main_form";
import RekeningDetailForm from "./rekening_detail_form";

export default function RekeningPopup({rekeningDialog, setRekeningDialog}) {

    const resetMainFormRef = useRef(null);
    const {rekeningTable, setRekeningTable} = useRekeningBelanjaTable()
    const {mainForm, clearMainForm, getMainForm} = useRekeningBelanjaMainForm();
    const {setDetailForm, clearDetailForm} = useRekeningBelanjaDetailForm();
    const [tableData, setTableData] = useState(
      { ...mainForm, details: [] }, // Initialize with the mainForm values and empty details
    );
    
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [editingDetailIndex, setEditingDetailIndex] = useState(null);
    
    const handleEditRincian = (uuid) => {
      const detailToEdit = tableData.details.find((detail) => detail.uuid === uuid);
      console.log(detailToEdit)
      setDetailForm({...detailToEdit});
      setEditingDetailIndex(uuid);
      setShowDetailDialog(true);
    };
    
    const handleDeleteRincian = (uuid) => {
      setTableData((prev) => {
        const updatedDetails = prev.details.filter((detail) => detail.uuid !== uuid);
        return { ...prev, details: updatedDetails };
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
        setTableData({...clearedMainForm, details: []})
        setRekeningTable({...data, uuid: uuidv4()})
      }
      
      console.log(rekeningTable)
  
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