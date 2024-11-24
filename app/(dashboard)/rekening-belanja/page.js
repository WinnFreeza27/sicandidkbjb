"use client"
import { Search } from "lucide-react";
import AlertDialogDemo from "@/components/popup-form";
import Pagination from "@/components/pagination";
import TabelRekening from "@/components/table";
import {useState} from "react";

export default function Rekeningbelanja() {  

  const [rekeningDialog, setRekeningDialog] = useState(false);

    return (
        <div className="mx-5 mt-5 bg-white p-5 text-accentdarken">
            <div className="flex flex-col xl:flex-row gap-5 justify-between">
                <h1 className="text-2xl">Rekening Belanja</h1>
                <label htmlFor="search" className="flex xl:w-96 border border-primary items-center focus:border-accentdarken pr-4">
                <input type="search" placeholder="Cari Rekening Belanja..." className="text-sm  px-4 xl:w-96 py-2 rounded-sm outline-none text-accentdarken placeholder:text-secondary " />
                <Search />
                </label>
                <button type="submit" className="bg-accent text-white py-3 px-4 rounded-sm hover:bg-accentdarken transition-all" onClick={() => setRekeningDialog(true)}>Tambah Rekening</button>
            </div>
            <TabelRekening />
            <Pagination />
            <AlertDialogDemo rekeningDialog={rekeningDialog} setRekeningDialog={setRekeningDialog}/>
        </div>
    );
}







