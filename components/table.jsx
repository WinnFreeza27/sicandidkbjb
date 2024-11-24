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

  export default function TabelRekening() {
    const [isOpen, setIsOpen] = useState([])

    const handleOpen = (index) => {
        if (isOpen.includes(index)) {
            setIsOpen( x => x.filter((item) => item !== index))
        } else {
            setIsOpen( x => [...x, index])
        }
    }
    
    const data = [
        {
          no: 1,
          kodeRekening: "1.1.01.01",
          uraian: "Belanja Alat/Bahan untuk Kegiatan Kantor-Perabot Kantor",
          volume: 12,
          satuan: "Bulan",
          hargaSatuan: 5000000,
          jumlah: 60000000,
          rincian: [
            {
              no: 1,
              uraian: "Sapu",
              volume: 5,
              satuan: "Buah",
              hargaSatuan: 10000,
              jumlah: 50000,
            },
            {
              no: 2,
              uraian: "Pengharum Ruangan",
              volume: 4,
              satuan: "Buah",
              hargaSatuan: 25000,
              jumlah: 100000,
            },
            {
              no: 3,
              uraian: "Pembersih Toilet",
              volume: 3,
              satuan: "Buah",
              hargaSatuan: 20000,
              jumlah: 60000,
            },
          ],
          open: false,
        },
        {
          no: 2,
          kodeRekening: "1.1.01.02",
          uraian: "Belanja Makanan dan Minuman Rapat",
          volume: 10,
          satuan: "Kegiatan",
          hargaSatuan: 1500000,
          jumlah: 15000000,
          rincian: [
            {
              no: 1,
              uraian: "Air Mineral",
              volume: 30,
              satuan: "Botol",
              hargaSatuan: 5000,
              jumlah: 150000,
            },
            {
              no: 2,
              uraian: "Snack Box",
              volume: 10,
              satuan: "Kotak",
              hargaSatuan: 20000,
              jumlah: 200000,
            },
            {
              no: 3,
              uraian: "Kopi dan Teh",
              volume: 10,
              satuan: "Cangkir",
              hargaSatuan: 10000,
              jumlah: 100000,
            },
          ],
          open: false,
        },
        {
          no: 3,
          kodeRekening: "1.1.01.03",
          uraian: "Belanja Listrik dan Air",
          volume: 12,
          satuan: "Bulan",
          hargaSatuan: 1000000,
          jumlah: 12000000,
          rincian: [
            {
              no: 1,
              uraian: "Tagihan Listrik",
              volume: 12,
              satuan: "Bulan",
              hargaSatuan: 800000,
              jumlah: 9600000,
            },
            {
              no: 2,
              uraian: "Tagihan Air",
              volume: 12,
              satuan: "Bulan",
              hargaSatuan: 200000,
              jumlah: 2400000,
            },
          ],
          open: false,
        },
        {
          no: 4,
          kodeRekening: "1.1.01.04",
          uraian: "Belanja Alat Tulis Kantor (ATK)",
          volume: 6,
          satuan: "Bulan",
          hargaSatuan: 300000,
          jumlah: 1800000,
          rincian: [
            {
              no: 1,
              uraian: "Pulpen",
              volume: 50,
              satuan: "Buah",
              hargaSatuan: 5000,
              jumlah: 250000,
            },
            {
              no: 2,
              uraian: "Kertas A4",
              volume: 10,
              satuan: "Rim",
              hargaSatuan: 50000,
              jumlah: 500000,
            },
            {
              no: 3,
              uraian: "Stempel",
              volume: 5,
              satuan: "Buah",
              hargaSatuan: 30000,
              jumlah: 150000,
            },
          ],
          open: false,
        },
        {
          no: 5,
          kodeRekening: "1.1.01.05",
          uraian: "Belanja Perawatan Kendaraan Dinas",
          volume: 4,
          satuan: "Kendaraan",
          hargaSatuan: 2500000,
          jumlah: 10000000,
          rincian: [
            {
              no: 1,
              uraian: "Servis Berkala",
              volume: 4,
              satuan: "Kali",
              hargaSatuan: 2000000,
              jumlah: 8000000,
            },
            {
              no: 2,
              uraian: "Penggantian Oli",
              volume: 4,
              satuan: "Kali",
              hargaSatuan: 500000,
              jumlah: 2000000,
            },
          ],
          open: false,
        },
      ];
      
  
    return (
        <div className="mx-auto py-10">
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
              {data.map((item) => (
                <React.Fragment key={Math.floor(Math.random() * 99999)}>
                  {/* Parent Row */}
                  <TableRow className={`${isOpen.includes(item.no) ? "bg-primary text-white" : "bg-secondary/40"} hover:bg-primary hover:text-white cursor-pointer h-[70px]`} onClick={() => handleOpen(item.no)}>
                    <TableCell className="font-medium text-center">{item.no}</TableCell>
                    <TableCell>{item.kodeRekening}</TableCell>
                    <TableCell className="min-w-8">{item.uraian}</TableCell>
                    <TableCell className="">{item.volume}</TableCell>
                    <TableCell>{item.satuan}</TableCell>
                    <TableCell className="">{item.hargaSatuan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                    <TableCell className="">{item.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                    <TableCell>
                      {
                        item.rincian?.length > 0 && (
                        <>
                            {isOpen.includes(item.no) ? (
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
                  {item.rincian && isOpen.includes(item.no) &&
                    item.rincian.map((rincian) => (
                      <TableRow key={Math.floor(Math.random() * 54321)} className="bg-white">
                        <TableCell />
                        <TableCell />
                        <TableCell>{rincian.uraian}</TableCell>
                        <TableCell>{rincian.volume}</TableCell>
                        <TableCell>{rincian.satuan}</TableCell>
                        <TableCell className="">
                          {rincian.hargaSatuan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </TableCell>
                        <TableCell className="">
                          {rincian.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )
}