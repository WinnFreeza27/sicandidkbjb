import {create} from 'zustand'

export const produkFormStore = create((set, get) => ({
    produkForm: {
        nama_produk: "",
        kode_barang: "",
        harga: ""
    },
    setProdukForm: (data) => set((state) => ({ produkForm: { ...state.produkForm, ...data } })),
    clearProdukForm: () =>
        set(() => ({
            produkForm: { nama_produk: "",
                        kode_barang: "",
                        harga: ""}
        })),
    getProdukForm: () => get().produkForm, // Function to retrieve the updated state
}));

export const produkTableStore = create((set) => ({
    produkTable: [],
    setProdukTable: (data) => set((state) => ({produkTable: [data, ...state.produkTable]}))
}))