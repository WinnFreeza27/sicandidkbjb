import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

import React from "react"
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

  export default function ProdukTable({data, handleEdit, handleDelete}) {
    return (
        <div className="mx-auto py-10">
        {data.length == 0 ? (
            <div className="text-center">Tidak Ada Data</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="">Produk</TableHead>
                <TableHead className="min-w-8">Kode Barang</TableHead>
                <TableHead className="">Harga</TableHead>
                <TableHead className="">Aksi</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <React.Fragment key={item.uuid}>
                  <TableRow className="bg-secondary/40 h-[70px]">
                    <TableCell className="font-medium text-center">{index + 1}</TableCell>
                    <TableCell className="min-w-8">{item.nama_produk}</TableCell>
                    <TableCell className="">{item.kode_barang}</TableCell>
                    <TableCell className="">{parseInt(item.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                    <TableCell>
                    <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(item.uuid)}
                                  className="bg-teal-400 text-white hover:bg-teal-500 rounded-sm"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(item.uuid)}
                                  className="bg-red-400 text-white hover:bg-red-500 rounded-sm"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>     
        )}
        </div>
      )
}