import Sidebar from "@/components/navigationSidebar";
import "./globals.css";

export const metadata = {
  title: "Sicandi",
  description: "Aplikasi Inventarisasi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='bg-secondary font-roboto'
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
