import {create} from "zustand";

export const pengeluaranFormStore = create((set, get) => ({
    pengeluaranForm: {
        uuid: null,
        nama_produk: {},
        rekening_belanja: {},
        rincian: {},
        volume_keluar: "",
        tanggal_keluar: ""
    },
    setPengeluaranForm: (data) => set(() => ({ pengeluaranForm: data })),
    clearPengeluaranForm: () => set(() => ({ pengeluaranForm: { uuid: null, nama_produk: {}, rekening_belanja: {}, rincian: {}, volume_keluar: "", tanggal_keluar: "" } })),
}))

export const pengeluaranTableStore = create((set, get) => ({
    pengeluaranTable: [],
    pengeluaranPagination: { page: 1, limit: 5, total: 0 },
    addPengeluaranTable: (data) => set((state) => ({ pengeluaranTable: [...state.pengeluaranTable, data], pengeluaranPagination: { ...state.pengeluaranPagination, total: state.pengeluaranTable.length } })),
    setPengeluaranPagination: (data) => set((state) => ({ pengeluaranPagination: { ...state.pengeluaranPagination, ...data } }))
}))