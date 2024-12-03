import { stockStore } from "@/store/stock_store";

export const useStockStore = () => {
    const stock = stockStore((state) => state.stock);
    const addStock = stockStore((state) => state.addStock);
    const updateStock = stockStore((state) => state.updateStock);
    return { stock, addStock, updateStock };
}