import { Search } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {useState } from "react";
import DynamicSearch from "./dynamic/search";
import { deepSearch } from "@/utils/search_and_filter";
import { set } from "lodash";
export default function FormField({ fieldKey, fieldSchema, register, setValue, formData, onDataChange, error }) {
    const { label, type, placeholder, selectOptions, forms } = fieldSchema._def.meta;
    console.log(error)
    const handleChange = (value) => {
      setValue(fieldKey, value);
      if (onDataChange) onDataChange({ ...formData, [fieldKey]: value });
    };
    

    //type === "form"
    const [showTable, setShowTable] = useState(false); // Controls whether the table is visible
    const [selectedValue, setSelectedValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const formSearchedData = deepSearch(forms.data, searchQuery)

    const handleRowClick = (data) => {
      // Format the selected row's data
      const formattedValue = `[${data.nama_produk}] [${data.kode_produk}] [${parseInt(data.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}]`;
  
      // Update the input field with the formatted value
      setSelectedValue(formattedValue);
  
      // Set the raw data object to the form value
      setValue(fieldKey, data); // Set the value to the selected row's data object
      if (onDataChange) onDataChange({ ...formData, [fieldKey]: data });
      setSearchQuery('')
      setShowTable(false); // Hide the table after selection
    };
  
    if (type === "form") {
      return (
        <div className="flex flex-col gap-4">
          {/* Input Field with Search */}
          {!showTable && (
            <label htmlFor={fieldKey} className="flex items-center gap-3">
              <span className="whitespace-nowrap w-32">{label}</span>
              <div className="flex flex-col w-full">
              <div className="flex items-center border border-primary rounded w-full">
                <input
                  id={fieldKey}
                  type="text"
                  value={selectedValue} // Show the formatted value
                  readOnly // Make the input readonly to prevent manual editing
                  placeholder={placeholder}
                  className="flex-1 py-2 px-3 outline-none"
                  onFocus={() => setShowTable(true)} // Show the table when input is focused
                />
                <button
                  type="button"
                  onClick={() => setShowTable(true)} // Show the table when the icon is clicked
                  className="p-2 hover:bg-gray-100"
                >
                  <Search size={20} />
                </button>
              </div>
              {error && <span className="text-red-500 text-sm">{error.message}</span>}
              </div>
            </label>
          )}
  
          {/* Table for Selecting Data */}
          {showTable && (
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <DynamicSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            
            <Table>
            
              <TableHeader>
                <TableRow>
                  {forms.label.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {formSearchedData?.map((item, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => handleRowClick(item)}
                  >
                    {forms.name.map((key) => (
                      <TableCell key={`${index}-${key}`}>{item[key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          )}
        </div>
      );
    }
  
    
    if (type === "select") {
      return (
        <label className="flex items-center gap-3" htmlFor={fieldKey} key={fieldKey}>
          <span className="whitespace-nowrap w-32">{label}</span>
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
        <span className="whitespace-nowrap w-32">{label}</span>
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