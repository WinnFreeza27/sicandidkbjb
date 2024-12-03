import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import React from "react"
  import {useState} from "react"

  export default function TabelRekening({data}) {

    const [isOpen, setIsOpen] = useState([])

    const handleOpen = (index) => {
        if (isOpen.includes(index)) {
            setIsOpen( x => x.filter((item) => item !== index))
        } else {
            setIsOpen( x => [...x, index])
        }
    }
          
    
    return (
        <div className="mx-auto py-10">
        {data.length == 0 ? (
            <div className="text-center">Tidak Ada Data</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="">Kode Rekening</TableHead>
                <TableHead className="min-w-8">Uraian</TableHead>
                <TableHead className="">Volume</TableHead>
                <TableHead>Satuan</TableHead>
                <TableHead className="">Harga Satuan</TableHead>
                <TableHead className="">Jumlah</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <React.Fragment key={item.uuid}>
                  {/* Parent Row */}
                  <TableRow className={`${isOpen.includes(item.uuid) ? "bg-primary text-white" : "bg-secondary/40"} ${item.details.length > 0 ? "hover:bg-primary hover:text-white cursor-pointer" : ""} h-[70px]`} onClick={() => handleOpen(item.uuid)}>
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell>{item.kode_rekening}</TableCell>
                    <TableCell className="min-w-8">{item.uraian}</TableCell>
                    <TableCell className="">{item.volume}</TableCell>
                    <TableCell>{item.satuan}</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="">{parseInt(item.saldo).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                    <TableCell>
                      {
                        item.details?.length > 0 && (
                        <>
                            {isOpen.includes(item.uuid) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            )}
                        </>
                        )
                      }
                      
                    </TableCell>
                  </TableRow>
      
                  {/* Rincian Rows */}
                  {item.details && isOpen.includes(item.uuid) &&
                    item.details.map((detail) => (
                      <TableRow key={Math.floor(Math.random() * 54321)} className="bg-white">
                        <TableCell />
                        <TableCell />
                        <TableCell>{detail.nama_rincian}</TableCell>
                        <TableCell>{detail.volume}</TableCell>
                        <TableCell>{detail.satuan}</TableCell>
                        <TableCell className="">
                          {detail.harga_satuan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </TableCell>
                        <TableCell className="">
                          {detail.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
        </div>
      )
}