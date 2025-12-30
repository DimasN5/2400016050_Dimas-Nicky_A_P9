// src/app/dashboard/page.jsx
"use client";
import { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    // Cek apakah ada token login yang valid
    if (pb.authStore.isValid) {
      setUser(pb.authStore.model); // Ambil data user
    } else {
      router.push("/login"); // Jika tidak valid, tendang ke login
    }
  }, [router]);
  const handleLogout = () => {
    pb.authStore.clear(); // Hapus token dari browser
    router.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = await pb.collection("posts").create({
        title,
        content,
        user: user.id, // Asumsi user.id adalah ID dari user yang sedang login
      });
      console.log("Post created:", newPost);
      setTitle("");
      setContent("");
      alert("Artikel berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  // Tampilkan loading sederhana saat mengecek auth
  if (!user) {
    return <div className="p-10 text-center">Memeriksa akses...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-10">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm
hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <p className="text-lg">
          Selamat datang, <span className="font-bold">{user.email}</span>!
        </p>
        <p className="text-gray-600 mt-2">
          Halaman ini bersifat privat (Protected Route). Hanya user yang
          memiliki token valid yang bisa melihat ini.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Buat Artikel Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Judul Artikel
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Konten Artikel
            </label>
            <textarea
              id="content"
              rows="8"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit" // Mengubah type menjadi submit
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Publikasikan Artikel
          </button>
        </form>
 </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Kelola Artikel</h2>
        <Link
          href="/blog"
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Lihat Semua Artikel
        </Link>
        {/* Di sini Anda bisa menambahkan daftar artikel yang sudah ada dan opsi untuk mengedit/menghapus */}
        <p className="text-gray-600 mt-4">
          Fitur pengelolaan artikel (edit/hapus) akan ditambahkan di kemudian
          hari.
        </p>
      </div>
    </div>
  );
}
