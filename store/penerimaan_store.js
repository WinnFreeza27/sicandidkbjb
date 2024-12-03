import {create} from "zustand";

export const penerimaanFormStore = create((set, get) => ({
    penerimaanForm: {
        uuid: null,
        nama_produk: {},
        rekening_belanja: {},
        rincian: {},
        volume: "",
        tanggal: ""
    },
    setPenerimaanForm: (data) => set(() => ({ penerimaanForm: data })),
    clearPenerimaanForm: () => set(() => ({ penerimaanForm: { uuid: null, nama_produk: {}, kode_produk: {}, rincian: {}, volume: "", tanggal: "" } }))
}));

export const penerimaanTableStore = create((set, get) => ({
    penerimaanTable: [],
    penerimaanPagination: { page: 1, limit: 5, total: 0 },
    addPenerimaanTable: (data) => set((state) => {
        const updatedData = [data, ...state.penerimaanTable]
        return { penerimaanTable: updatedData, penerimaanPagination: { ...state.penerimaanPagination, total: updatedData.length } }
    }),
    setPenerimaanPagination: (data) => set((state) => ({ penerimaanPagination: { ...state.penerimaanPagination, ...data } }))
}));