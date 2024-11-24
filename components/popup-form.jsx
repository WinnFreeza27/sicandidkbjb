import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Separator } from "@radix-ui/react-separator";
import { X } from "lucide-react";
import {useState} from "react";
import { Save } from "lucide-react";

import {useRekeningBelanjaMainForm, useRekeningBelanjaDetailForm} from "@/hook/use-rekening-belanja-store";
import { v4 as uuidv4 } from 'uuid';
import TableRekeningForm from "./table-rekening-belanja-form";
export default function AlertDialogDemo({rekeningDialog, setRekeningDialog}) {

    const {mainForm, setMainForm, clearMainForm, getMainForm} = useRekeningBelanjaMainForm();
    const {detailForm, setDetailForm, clearDetailForm} = useRekeningBelanjaDetailForm();
    const [tableData, setTableData] = useState([
      { ...mainForm, details: [] }, // Initialize with the mainForm values and empty details
    ]);
    
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [editingDetailIndex, setEditingDetailIndex] = useState(null);
    
    const handleEditRincian = (uuid) => {
      const detailToEdit = tableData[0].details.find((detail) => detail.uuid === uuid);
      console.log(detailToEdit)
      setDetailForm(detailToEdit);
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
        setTableData([{...getMainForm(), details: []}])
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
                <RekeningMainForm setTableData={setTableData} setEditingDetailIndex={setEditingDetailIndex} setShowDetailDialog={setShowDetailDialog}/>
                <Separator orientation="horizontal" className="my-4" />
                <TableRekeningForm tableData={tableData} handleEditRincian={handleEditRincian} handleDeleteRincian={handleDeleteRincian}/>
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


  import { register } from "zod-metadata";
  import { useEffect, useCallback } from "react";
  import z from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  
  import { isEqual, debounce, omit } from "lodash";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  register(z);

  function Formaja({schema, formData, setFormData, handleForm, onDataChange, buttonProps}) {

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: {errors},
      reset

    } = useForm({
      resolver: zodResolver(schema),
    })

    const onSubmit = useCallback(() => {
      handleForm(reset)
    }, [reset]);

    const formValue = watch()

    const debouncedSetFormData = useCallback(
      debounce((data) => {
        if(onDataChange) {onDataChange(data)}
        setFormData(data)
      }, 300),
      [setFormData]
    );

    const isFormDataSame = (data) => {
      const currentDataWithoutUuid = omit(data, "uuid");
      const formDataWithoutUuid = omit(formData, "uuid");
      return isEqual(currentDataWithoutUuid, formDataWithoutUuid);
    }

    useEffect(() => {
      reset(formData); // Synchronize external state with the form
    }, [formData, reset]);

    useEffect(() => {
      if(!isFormDataSame(formValue)) {
        debouncedSetFormData(formValue)
      }
    }, [formValue, setFormData, debouncedSetFormData, onDataChange])
    console.log(formValue)
    console.log(formData)

    const formFields = Object.keys(schema.shape).map((key) => {
      const fieldSchema = schema.shape[key];
      const { label, type, placeholder, selectOptions} = fieldSchema._def.meta
      if(type === "select") return (
        <label className="flex items-center gap-3">
          <span className="whitespace-nowrap w-32">{label}</span>
          <span>:</span>
          <Select
            onValueChange={(value) => setValue("satuan", value)}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectOptions.map((option) => (
                  <SelectItem value={option} key={option}>{option}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

        </label>
      )
      return (
        <label htmlFor={key} className="flex items-center gap-3" key={label}>
          <span className="whitespace-nowrap w-32">{label}</span>
          <span>:</span>
          <div className="flex flex-col w-full">
            <input
              id={key}
              className="py-2 flex-1 rounded px-2 outline-none border border-primary"
              type={type}
              {...register(key)}
              placeholder={placeholder}
            />
            {errors[key] && <span className="text-red-500 text-sm">{errors[key].message}</span>}
          </div>
        </label>
      )
    })

    

    return (
            <>
            {formFields}
            <button type="submit" className="bg-accent text-white py-3 px-4 rounded-sm flex items-center justify-center gap-3 hover:bg-accentdarken transition-all" onClick={handleSubmit(onSubmit)}>{buttonProps.buttonText}
            {buttonProps.icon}
            </button>
            </>
    )
  }

  export function RekeningMainForm({setTableData, setEditingDetailIndex, setShowDetailDialog}) {
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
        <Formaja handleForm={handleTambahRincian} schema={schema} formData={mainForm} setFormData={setMainForm}
          onDataChange={onMainFormChange} buttonProps={{buttonText: "Tambah Rincian"}}
         />
      </form>
    )
  }

  export function RekeningDetailForm({setTableData, editingDetailIndex, setShowDetailDialog, setEditingDetailIndex}) {

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
    
    const handleSimpanRincian = () => {
      console.log(detailForm)
      const newDetail = {
        uuid: uuidv4(),
        ...detailForm,
        jumlah: parseInt(detailForm["volume"]) * parseInt(detailForm["harga-satuan"]),
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
                <form className="flex flex-col gap-4" onSubmit={handleSimpanRincian}>
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
                  <Formaja handleForm={handleSimpanRincian} schema={schema} formData={detailForm} setFormData={setDetailForm} 
                  buttonProps={{buttonText: editingDetailIndex !== null ? 'Update Rincian' : 'Simpan Rincian', icon: <Save className="size-5"/>}}/>
                </form>
              </div>
            </AlertDialogHeader>
    )
  }