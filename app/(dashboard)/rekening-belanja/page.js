"use client"
import RekeningPopup from "@/components/rekening-belanja/rekening_popup";
import Pagination from "@/components/dynamic/pagination";
import TabelRekening from "@/components/rekening-belanja/rekening_table";
import {useState} from "react";
import { useRekeningBelanjaTable } from "@/hook/use-rekening-belanja-store";
import { paginateData } from "@/utils/paginate_data";
import DynamicSearch from "@/components/dynamic/search";
import { deepSearch } from "@/utils/search_and_filter";

export default function Rekeningbelanja() {  

  const [rekeningDialog, setRekeningDialog] = useState(false);
  const {rekeningTable, rekeningPagination, setRekeningPagination, searchQuery, setSearchQuery} = useRekeningBelanjaTable() 

    const searchedData = deepSearch(rekeningTable, searchQuery)
    const paginatedData = paginateData(searchedData, rekeningPagination.page, rekeningPagination.limit)

    console.log(paginatedData)
    return (
        <div className="mx-5 mt-5 bg-white p-5 text-accentdarken">
            <div className="flex flex-col xl:flex-row gap-5 justify-between">
                <h1 className="text-2xl">Rekening Belanja</h1>
                <DynamicSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <button type="submit" className="bg-accent text-white py-3 px-4 rounded-sm hover:bg-accentdarken transition-all" onClick={() => setRekeningDialog(true)}>Tambah Rekening</button>
            </div>
            <TabelRekening data={paginatedData}/>
            <Pagination paginationData={rekeningPagination} setPaginationData={setRekeningPagination}/>
            <RekeningPopup rekeningDialog={rekeningDialog} setRekeningDialog={setRekeningDialog}/>
        </div>
    );
}







