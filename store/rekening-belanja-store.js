import { create } from "zustand";
import {v4 as uuidv4} from 'uuid'

export const rekeningBelanjaMainForm = create((set, get) => ({
    mainForm: {
        "kode_rekening": "",
        "uraian": "",
        "saldo": "0",
    },
    setMainForm: (data) => set((state) => ({ mainForm: { ...state.mainForm, ...data } })),
    clearMainForm: () =>
        set(() => ({
            mainForm: { "kode-rekening": "", "uraian": "", "saldo": '0' },
        })),
    getMainForm: () => get().mainForm, // Function to retrieve the updated state
}));


export const rekeningBelanjaDetailForm = create((set) => ({
    detailForm: {
        uuid: null,
        "nama_rincian": "",
        "volume": "0",
        "satuan": "",
        "harga_satuan": "0",
    },
    setDetailForm: (data) => set((state) => ({detailForm: { ...state.detailForm, ...data } })),    
    clearDetailForm: () => set(() => ({ detailForm: { uuid: null, "volume": "0", "satuan": "", "harga_satuan": "0", "nama_rincian": ""} })),
}));

export const rekeningBelanjaTable = create((set) => ({
    rekeningTable: [],
    rekeningPagination: { page: 1, limit: 2, total: 0 },

    setRekeningTable: (data) =>
        set((state) => {
            const updatedTable = [data, ...state.rekeningTable];
            return {
                rekeningTable: updatedTable,
                rekeningPagination: {
                    ...state.rekeningPagination,
                    total: updatedTable.length, // Update total based on new table length
                },
            };
        }),

    setRekeningPagination: (data) =>
        set((state) => ({
            rekeningPagination: {
                ...state.rekeningPagination,
                ...data,
            },
        })),
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
}));