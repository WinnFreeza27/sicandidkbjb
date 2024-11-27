import { rekeningBelanjaMainForm, rekeningBelanjaDetailForm, rekeningBelanjaTable } from "@/store/rekening-belanja-store";

export const useRekeningBelanjaMainForm = () => {
    const mainForm = rekeningBelanjaMainForm((state) => state.mainForm);
    const setMainForm = rekeningBelanjaMainForm((state) => state.setMainForm);
    const clearMainForm = rekeningBelanjaMainForm((state) => state.clearMainForm);
    const getMainForm = rekeningBelanjaMainForm((state) => state.getMainForm);
    return { mainForm, setMainForm, clearMainForm, getMainForm };
}

export const useRekeningBelanjaDetailForm = () => {
    const detailForm = rekeningBelanjaDetailForm((state) => state.detailForm);
    const setDetailForm = rekeningBelanjaDetailForm((state) => state.setDetailForm);
    const clearDetailForm = rekeningBelanjaDetailForm((state) => state.clearDetailForm);
    return { detailForm, setDetailForm, clearDetailForm };
}

export const useRekeningBelanjaTable = () => {
    const rekeningTable = rekeningBelanjaTable((state) => state.rekeningTable)
    const setRekeningTable = rekeningBelanjaTable((state) => state.setRekeningTable)
    const rekeningPagination = rekeningBelanjaTable((state) => state.rekeningPagination)
    const setRekeningPagination = rekeningBelanjaTable((state) => state.setRekeningPagination)
    const searchQuery = rekeningBelanjaTable((state) => state.searchQuery)
    const setSearchQuery = rekeningBelanjaTable((state) => state.setSearchQuery)

    return {rekeningTable, setRekeningTable, rekeningPagination, setRekeningPagination, searchQuery, setSearchQuery}
}