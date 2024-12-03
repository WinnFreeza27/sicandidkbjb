import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce, isEqual, omit } from "lodash";
import FormField from "../form-field";

export default function DynamicForm({
  schema,
  formData,
  setFormData,
  handleForm,
  onDataChange,
  buttonProps,
  resetRef,
}) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  const [activeField, setActiveField] = useState(null); // for the input type form/table

  const formValue = watch();
  const resetTriggeredRef = useRef(false);

  const onSubmit = useCallback(() => {
    handleForm(formValue);
  }, [formValue]);

  const debouncedSetFormData = useCallback(
    debounce((data) => {
      if (onDataChange) onDataChange(data);
      setFormData(data);
    }, 300),
    [setFormData, onDataChange]
  );

  const isFormDataSame = useCallback(
    (data) => {
      const currentDataWithoutUuid = omit(data, "uuid");
      const formDataWithoutUuid = omit(formData, "uuid");
      return isEqual(currentDataWithoutUuid, formDataWithoutUuid);
    },
    [formData]
  );

  useEffect(() => {
    if (resetRef) {
      resetRef.current = reset;
    }
  }, [resetRef, reset]);

  useEffect(() => {
    Object.keys(schema.shape).forEach((key) => {
      register(key);
    });
  }, [register, schema.shape]);

  useEffect(() => {
    if (!isFormDataSame(formData) && !resetTriggeredRef.current) {
      resetTriggeredRef.current = true;
      reset(formData);
    } else {
      resetTriggeredRef.current = false;
    }
  }, [formData, isFormDataSame, reset]);

  useEffect(() => {
    if (!isFormDataSame(formValue)) {
      debouncedSetFormData(formValue);
    }
  }, [formValue, debouncedSetFormData, isFormDataSame]);

  const renderFormFields = () =>
    Object.keys(schema.shape).map((key) => (
      <FormField
        key={key}
        fieldKey={key}
        fieldSchema={schema.shape[key]}
        register={register}
        setValue={setValue}
        formData={formValue}
        onDataChange={onDataChange}
        error={errors[key]}
        activeField={activeField}
        setActiveField={setActiveField}
      />
    ));
  return (
    <>
      {renderFormFields()}
      <button
        type="submit"
        className="bg-accent text-white py-3 px-4 rounded-sm flex items-center justify-center gap-3 hover:bg-accentdarken transition-all"
        onClick={handleSubmit(onSubmit)}
      >
        {buttonProps.buttonText}
        {buttonProps.icon}
      </button>
    </>
  );
}
