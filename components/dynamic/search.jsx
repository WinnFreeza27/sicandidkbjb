import { Search } from "lucide-react";
export default function DynamicSearch({searchQuery, setSearchQuery}) {
    return (
        <label htmlFor="search" className="flex xl:w-96 border border-primary items-center focus:border-accentdarken pr-4">
            <input type="search" placeholder="Cari Rekening Belanja..." className="text-sm  px-4 xl:w-96 py-2 rounded-sm outline-none text-accentdarken placeholder:text-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
             />
            <Search />
        </label>
    )
}