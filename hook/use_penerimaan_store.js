import { penerimaanFormStore, penerimaanTableStore } from "@/store/penerimaan_store";

export const usePenerimaanForm = () => {
    const penerimaanForm = penerimaanFormStore((state) => state.penerimaanForm);
    const setPenerimaanForm = penerimaanFormStore((state) => state.setPenerimaanForm);
    const clearPenerimaanForm = penerimaanFormStore((state) => state.clearPenerimaanForm);
    return { penerimaanForm, setPenerimaanForm, clearPenerimaanForm }
};

export const usePenerimaanTable = () => {
    const penerimaanTable = penerimaanTableStore((state) => state.penerimaanTable);
    const addPenerimaanTable = penerimaanTableStore((state) => state.addPenerimaanTable);
    const penerimaanPagination = penerimaanTableStore((state) => state.penerimaanPagination);
    const setPenerimaanPagination = penerimaanTableStore((state) => state.setPenerimaanPagination);
    return { penerimaanTable, addPenerimaanTable, penerimaanPagination, setPenerimaanPagination };
}