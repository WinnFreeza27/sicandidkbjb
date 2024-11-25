import { ChevronRight, ChevronLeft } from "lucide-react"
import {useState} from "react";

export default function Pagination() {
    const [pageNow, setPageNow] = useState(1)
    const handlePageNow = (item) => {
        setPageNow(item)
    }
    const totalPage = 5
    return (
        <div className="flex justify-center">
            <div className="flex gap-2">
                <button onClick={() => handlePageNow(pageNow - 1)} disabled={pageNow === 1}><ChevronLeft /></button>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map((item) => (
                    <button key={item} 
                    className={`${pageNow === item ? "bg-primary text-white" : ""} py-1 px-3 border border-primary rounded-md hover:bg-primary hover:text-white transition-all`}
                    onClick={() => handlePageNow(item)}
                    >{item}</button>
                ))}
                <button onClick={() => handlePageNow(pageNow + 1)} disabled={pageNow === totalPage}><ChevronRight /></button>
            </div>
        </div>
    )
}