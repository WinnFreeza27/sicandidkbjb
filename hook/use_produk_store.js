import { produkFormStore, produkTableStore } from "@/store/produk_store";

export const useProdukForm = () => {
    const produkForm = produkFormStore((state) => state.produkForm)
    const setProdukForm = produkFormStore((state) => state.setProdukForm)
    const clearProdukForm = produkFormStore((state) => state.clearProdukForm)
    const getProdukForm = produkFormStore((state) => state.getProdukForm)

    return {
        produkForm,
        setProdukForm,
        clearProdukForm,
        getProdukForm
    }
} 

export const useProdukTable = () => {
    const produkTable = produkTableStore((state) => state.produkTable)
    const addProdukTable = produkTableStore((state) => state.addProdukTable)
    const deleteProdukTable = produkTableStore((state) => state.deleteProdukTable)
    const updateProdukTable = produkTableStore((state) => state.updateProdukTable)
    const produkPagination = produkTableStore((state) => state.produkPagination)
    const setProdukPagination = produkTableStore((state) => state.setProdukPagination)
    const searchQuery = produkTableStore((state) => state.searchQuery)
    const setSearchQuery = produkTableStore((state) => state.setSearchQuery)

    return {produkTable, addProdukTable, deleteProdukTable, updateProdukTable, produkPagination, setProdukPagination, searchQuery, setSearchQuery}
}