import { create } from "zustand";
import {v4 as uuidv4} from 'uuid'

export const rekeningBelanjaMainForm = create((set, get) => ({
    mainForm: {
        uuid: uuidv4(),
        "kode-rekening": "",
        "uraian": "",
        "saldo": "0",
    },
    setMainForm: (data) => set((state) => ({ mainForm: { ...state.mainForm, ...data } })),
    clearMainForm: () =>
        set(() => ({
            mainForm: { "kode-rekening": "", "uraian": "", "saldo": 0, uuid: uuidv4() },
        })),
    getMainForm: () => get().mainForm, // Function to retrieve the updated state
}));


export const rekeningBelanjaDetailForm = create((set) => ({
    detailForm: {
        "nama-rincian": "",
        "volume": "0",
        "satuan": "",
        "harga-satuan": "0",
    },
    setDetailForm: (data) => set((state) => ({ detailForm: { ...data } })),
    clearDetailForm: () => set(() => ({ detailForm: { "volume": "", "satuan": "", "harga-satuan": "0", "nama-rincian": ""} })),
}));