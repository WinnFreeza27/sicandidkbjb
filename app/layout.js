import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Sicandi",
  description: "Aplikasi Inventarisasi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='bg-secondary'
      >
        {children}
      </body>
    </html>
  );
}
