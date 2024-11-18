import Image from "next/image"

export default function Hero() {
    return (
        <div className="flex flex-col md:grid grid-cols-2 justify-center justify-items-center items-center bg-white font-roboto text-accentdarken p-10">
        <div className="max-w-[50ch] flex flex-col gap-5">
          <h1 className="font-extrabold text-7xl sm:text-8xl">SICANDI</h1>
          <p className="font-light text-primary">Mudah, cepat, dan aman – optimalkan manajemen pencatatan data pada instansi Anda dengan Sicandi, aplikasi berbasis digital yang dirancang untuk mendukung  pencatatan modern dan efisien.</p>
          <button className="justify-self-start w-full sm:w-max px-10 py-3 bg-accent text-white rounded-md hover:bg-accentdarken transition-all">Dashboard</button>
        </div>
        <div>
          <Image
            src="/hero.png"
            alt="hero"
            width={400}
            height={400}
          />
        </div>
      </div>
    )
}