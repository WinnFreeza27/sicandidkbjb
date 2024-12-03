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
    produkPagination: { page: 1, limit: 5, total: 0 },
    addProdukTable: (data) => set((state) => {
        const updatedData = [data, ...state.produkTable]
        return {produkTable: updatedData,
                produkPagination: { ...state.produkPagination, total: updatedData.length }
        }
    }),
    updateProdukTable: (id, data) => set((state) => {
        const updatedData = state.produkTable.map((item) => (item.uuid === id ? data : item))
        return {produkTable: updatedData,
                produkPagination: { ...state.produkPagination, total: updatedData.length }
        }
    }),
    deleteProdukTable: (id) => set((state) => {
        const updatedData = state.produkTable.filter((item) => item.uuid !== id)
        return {produkTable: updatedData,
                produkPagination: { ...state.produkPagination, total: updatedData.length }
        }
    }),
    setProdukPagination: (data) => set((state) => ({ produkPagination: { ...state.produkPagination, ...data } })),
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
}))