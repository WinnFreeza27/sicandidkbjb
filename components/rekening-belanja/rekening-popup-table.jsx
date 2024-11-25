  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { Edit, Trash2 } from 'lucide-react'
  import React from "react"

export default function TableRekeningPopup ({tableData, handleEditRincian, handleDeleteRincian}) {
    return (
        <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Kode Rekening</TableHead>
                      <TableHead className="min-w-8">Uraian</TableHead>
                      <TableHead className="">Volume</TableHead>
                      <TableHead>Satuan</TableHead>
                      <TableHead className="">Harga Satuan</TableHead>
                      <TableHead className="">Jumlah</TableHead>
                      <TableHead>Aksi</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((item) => (
                      <React.Fragment key={item["kode-rekening"]}>
                        <TableRow>
                          <TableCell>{item["kode-rekening"]}</TableCell>
                          <TableCell className="min-w-8 max-w-24">{item["uraian"]}</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell className="">{item["saldo"] == "" ? "Rp 0,00" : parseInt(item["saldo"]).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        {item.details.map((detail) => (
                          <TableRow key={detail.uuid}>
                            <TableCell></TableCell>
                            <TableCell>{detail["nama-rincian"]}</TableCell>
                            <TableCell>{detail["volume"]}</TableCell>
                            <TableCell>{detail["satuan"]}</TableCell>
                            <TableCell>{parseInt(detail["harga-satuan"]).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                            <TableCell className="">{parseInt(detail["volume"] * detail["harga-satuan"])?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                            
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditRincian(detail.uuid)}
                                  className="bg-red-400 text-white hover:bg-red-500 rounded-sm"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteRincian(detail.uuid)}
                                  className="bg-teal-400 text-white hover:bg-teal-500 rounded-sm"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
    )
}