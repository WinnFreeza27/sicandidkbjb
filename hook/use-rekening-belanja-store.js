import { rekeningBelanjaMainForm, rekeningBelanjaDetailForm } from "@/store/rekening-belanja-store";

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