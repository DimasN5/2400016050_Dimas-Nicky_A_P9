// src/app/layout.js
import "./globals.css";
import Link from "next/link"; // Import Link dari Next.js
export const metadata = {
  title: "Blog Next.js Saya",
  description: "Belajar Next.js App Router",
};
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">
        <nav className="p-4 bg-white shadow-md flex gap-4">
          <Link
            href="/"
            className="font-bold
text-blue-600"
          >
            Home
          </Link>
          <Link href="/blog" className="hover:text-blue-500">
            Blog
          </Link>
          <Link href="/about" className="hover:text-blue-500">
            About
          </Link>
        </nav>

        {/* 'children' adalah halaman (page.jsx) yang sedang
aktif */}
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
