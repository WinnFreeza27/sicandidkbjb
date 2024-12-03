import {create} from "zustand";

export const stockStore = create((set) => ({
    stock: [],
    addStock: (data) => set((state) => ({ stock: [...state.stock, {...data}] })),
    updateStock: (id, data) => set((state) => ({ stock: state.stock.map((item) => (item.uuid == id ? {...item, ...data} : item)) })),
}));