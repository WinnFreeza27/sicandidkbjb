import {create} from "zustand";

export const zodTest = create((set) => ({
    formData: {},
    setFormData: (data) => set({ formData: data }),
    clearFormData: () => set({ formData: {} })
}));