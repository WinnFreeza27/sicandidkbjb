import { ChevronRight, ChevronLeft } from "lucide-react"

export default function Pagination({paginationData, setPaginationData}) {

    if(paginationData.total === 0) return null

    const handlePageNow = (item) => {
        setPaginationData({page: item})
    }

    console.log(paginationData)

    const totalPage = Math.ceil(paginationData.total / paginationData.limit)

    return (
        <div className="flex justify-center">
            <div className="flex gap-2">
                <button onClick={() => handlePageNow(paginationData.page - 1)} disabled={paginationData.page === 1}><ChevronLeft /></button>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map((item) => (
                    <button key={item} 
                    className={`${paginationData.page === item ? "bg-primary text-white" : ""} py-1 px-3 border border-primary rounded-md hover:bg-primary hover:text-white transition-all`}
                    onClick={() => handlePageNow(item)}
                    >{item}</button>
                ))}
                <button onClick={() => handlePageNow(paginationData.page + 1)} disabled={paginationData.page === totalPage}><ChevronRight /></button>
            </div>
        </div>
    )
}