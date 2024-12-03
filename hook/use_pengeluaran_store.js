import { pengeluaranFormStore, pengeluaranTableStore } from "@/store/pengeluaran_store";

export const usePengeluaranFormStore = () => {
    const pengeluaranForm = pengeluaranFormStore((state) => state.pengeluaranForm);
    const setPengeluaranForm = pengeluaranFormStore((state) => state.setPengeluaranForm);
    const clearPengeluaranForm = pengeluaranFormStore((state) => state.clearPengeluaranForm);
    return { pengeluaranForm, setPengeluaranForm, clearPengeluaranForm }
}

export const usePengeluaranTable = () => {
    const pengeluaranTable = pengeluaranTableStore((state) => state.pengeluaranTable);
    const addPengeluaranTable = pengeluaranTableStore((state) => state.addPengeluaranTable);
    const pengeluaranPagination = pengeluaranTableStore((state) => state.pengeluaranPagination);
    const setPengeluaranPagination = pengeluaranTableStore((state) => state.setPengeluaranPagination);
    return { pengeluaranTable, addPengeluaranTable, pengeluaranPagination, setPengeluaranPagination };
}