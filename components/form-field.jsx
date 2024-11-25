import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function FormField({ fieldKey, fieldSchema, register, setValue, formData, onDataChange, error }) {
    const { label, type, placeholder, selectOptions } = fieldSchema._def.meta;
  
    const handleChange = (value) => {
      setValue(fieldKey, value);
      if (onDataChange) onDataChange({ ...formData, [fieldKey]: value });
    };
  
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