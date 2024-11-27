"use client"
import Pagination from "@/components/dynamic/pagination";
import {useEffect, useState} from "react";
import { paginateData } from "@/utils/paginate_data";
import { deepSearch } from "@/utils/search_and_filter";
import { useProdukForm, useProdukTable } from "@/hook/use_produk_store";

import ProdukTable from "@/components/produk/produk_table";
import ProdukPopup from "@/components/produk/produk_popup";
import DynamicSearch from "@/components/dynamic/search";



export default function Produk() {

    const [editIndex, setEditIndex] = useState(null)
    const [produkDialog, setProdukDialog] = useState(false)
    const {produkTable, deleteProdukTable, produkPagination, setProdukPagination, searchQuery, setSearchQuery} = useProdukTable()
    const {setProdukForm, clearProdukForm} = useProdukForm()

    const handleEdit = (id) => {
        setEditIndex(id)
        setProdukDialog(true)
        const dataToEdit = produkTable.find(produk => produk.uuid == id)
        console.log(dataToEdit)
        setProdukForm(dataToEdit)
    }

    const handleDelete = (id) => {
        console.log(id)
        deleteProdukTable(id)
    }
    
    const handleTambahProduk = () => {
      clearProdukForm()
      setProdukDialog(true)
    }

    const searchedData = deepSearch(produkTable, searchQuery)
    useEffect(() => {
      setProdukPagination({page: 1, limit: 2, total: searchedData.length})
    }, [searchQuery])

    const paginatedData = paginateData(searchedData, produkPagination.page, produkPagination.limit)
    return (
        <div className="mx-5 mt-5 bg-white p-5 text-accentdarken">
            <div className="flex flex-col xl:flex-row gap-5 justify-between">
                <h1 className="text-2xl">Produk</h1>
                <DynamicSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <button type="submit" className="bg-accent text-white py-3 px-4 rounded-sm hover:bg-accentdarken transition-all" onClick={handleTambahProduk}>Tambah Produk</button>
            </div>
            <ProdukTable data={paginatedData} handleEdit={handleEdit} handleDelete={handleDelete}/>
            <Pagination paginationData={produkPagination} setPaginationData={setProdukPagination}/>
            <ProdukPopup produkDialog={produkDialog} setProdukDialog={setProdukDialog} editIndex={editIndex} setEditIndex={setEditIndex}/>
        </div>
    );
}



