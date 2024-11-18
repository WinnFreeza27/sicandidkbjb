"use client"
import { useState } from "react"
import Image from "next/image"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
        <div className="fixed top-10 right-5 z-50 p- md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      {
        isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )
      }
    </div>
    <nav className="font-roboto flex justify-between p-5 items-center text-accentdarken bg-white mb-20 transition-all">
      <div className="flex gap-5 items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
        />
        <div className="font-bold max-w-[20ch]">DINAS KESEHATAN KOTA BANJARBARU</div>
      </div>
      <ul className={`${isOpen ? "fixed w-full h-screen top-0 left-0 bg-white flex flex-col justify-center items-center" : "hidden"} md:relative md:flex md:flex-row gap-5 md:w-max md:h-auto`}>
        <li><a className="cursor-pointer hover:underline">Website Resmi</a></li>
        <li><a className="cursor-pointer hover:underline">Hubungi Kami</a></li>
      </ul>
    </nav>
    </>
    )
}