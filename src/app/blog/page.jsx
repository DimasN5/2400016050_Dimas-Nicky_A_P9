// src/app/blog/page.jsx
import Link from "next/link";
import { pb } from "../../lib/pocketbase";
// Fungsi Fetching Data (Berjalan di Server)
async function getPosts() {
  // Mengambil daftar data dari koleksi 'posts'
  // sort: '-created' artinya urutkan dari yang paling baru dibuat
  const records = await pb.collection("posts").getFullList({
    sort: "-created",
    requestKey: null, // Opsional: mencegah pembatalan request otomatis
  });
  return records;
}
// Memaksa halaman untuk selalu dirender ulang (Dynamic Rendering)
export const dynamic = "force-dynamic";
export default async function BlogList() {
  const posts = await getPosts(); // Tunggu data selesai diambil
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Artikel Terbaru</h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border p-6 rounded-lg
shadow-sm hover:shadow-md transition"
          >
            <h2
              className="text-xl font-bold mb-2
text-gray-900"
            >
              {post.title}
            </h2>
            {/* line-clamp-3 membatasi teks hanya 3 baris */}
            <p
              className="text-gray-600 mb-4
line-clamp-3"
            >
              {post.content}
            </p>

            <Link
              href={`/blog/${post.id}`}
              className="text-blue-600 font-medium hover:underline"
            >
              Baca Selengkapnya →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
