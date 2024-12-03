import { Search } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {useState,useEffect } from "react";
import DynamicSearch from "./dynamic/search";
import { deepSearch } from "@/utils/search_and_filter";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { X } from "lucide-react";
export default function FormField({ fieldKey, fieldSchema, register, setValue, formData, onDataChange, error, activeField, setActiveField, }) {
    const { label, type, placeholder, selectOptions, forms, value } = fieldSchema._def.meta;
    const handleChange = (value) => {
      setValue(fieldKey, value);
      if (onDataChange) onDataChange({ ...formData, [fieldKey]: value });
    };
    

    //type === "form"
  const [selectedValue, setSelectedValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredData = deepSearch(forms?.data || [], searchQuery);

  const handleRowClick = (data) => {
    const formattedValue = forms.name
      .map((key) => `[${data[key]}]`)
      .join(" ");
    setSelectedValue(formattedValue);

    setValue(fieldKey, data);
    if (onDataChange) onDataChange({ ...formData, [fieldKey]: data });

    setSearchQuery("");
    setIsDialogOpen(false);
  };

  const isEmpty = forms?.data.length === 0

  if (type === "form") {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={fieldKey} className="flex items-center gap-3">
          <span className="whitespace-nowrap w-40">{label}</span>
          <span>:</span>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
              <div className="flex flex-col w-full">
                <input
                  id={fieldKey}
                  type="text"
                  value={selectedValue}
                  readOnly
                  placeholder={placeholder}
                  className={`py-2 flex-1 rounded px-2 outline-none border border-primary cursor-pointer`}
                  onClick={() => setIsDialogOpen(true)}
                />
                {error?.message && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-full flex flex-col items-center justify-center text-center">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">{label}</AlertDialogTitle>
                  <AlertDialogDescription>
                    Pilih Item Dari Tabel Dibawah
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <DynamicSearch
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />

                <div className="overflow-y-auto w-full mt-4">
                <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsDialogOpen(false)}/>
                {isEmpty ? <div className="text-center w-full items-center">Tidak Ada Data Tersedia...</div> : (

                  <Table className="w-full text-left">
                    <TableHeader>
                      <TableRow>
                        {forms.label.map((header) => (
                          <TableHead
                            key={header}
                            className="border-b py-2 px-4"
                          >
                            {header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    
                      {filteredData.map((item, index) => (
                        <TableRow
                          key={index}
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => handleRowClick(item)}
                        >
                          {forms.name.map((key) => (
                            <TableCell key={`${index}-${key}`} className="py-2 px-4">
                              {item[key]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                  
                </div>
              </AlertDialogContent>
            </AlertDialog>
        </label>
      </div>
    );
  }

  if (type === "disabled") {
    useEffect(() => {
      handleChange(value); // This will only run when `value` changes
    }, [value]);
    return (
      <label htmlFor={fieldKey} className="flex items-center gap-3 opacity-50" key={fieldKey}>
        <span className="whitespace-nowrap w-40">{label}</span>
        <span>:</span>
        <div className="flex flex-col w-full">
          <input
            id={fieldKey}
            className="py-2 flex-1 rounded px-2 outline-none border border-primary cursor-not-allowed"
            type={type}
            {...register(fieldKey)}
            placeholder={placeholder}
            value={value}
            readOnly
          />
          {error && <span className="text-red-500 text-sm">{error.message}</span>}
        </div>
      </label>
    );
  }

  
  
    
    if (type === "select") {
      return (
        <label className="flex items-center gap-3" htmlFor={fieldKey} key={fieldKey}>
          <span className="whitespace-nowrap w-40">{label}</span>
          <span>:</span>
          <Select onValueChange={handleChange} defaultValue={formData[fieldKey]}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectOptions.map((option) => (
                  <SelectItem value={option} key={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {error && <span className="text-red-500 text-sm">{error.message}</span>}
        </label>
      );
    }
  
    return (
      <label htmlFor={fieldKey} className="flex items-center gap-3" key={fieldKey}>
        <span className="whitespace-nowrap w-40">{label}</span>
        <span>:</span>
        <div className="flex flex-col w-full">
          <input
            id={fieldKey}
            className="py-2 flex-1 rounded px-2 outline-none border border-primary"
            type={type}
            {...register(fieldKey)}
            placeholder={placeholder}
          />
          {error && <span className="text-red-500 text-sm">{error.message}</span>}
        </div>
      </label>
    );
  }