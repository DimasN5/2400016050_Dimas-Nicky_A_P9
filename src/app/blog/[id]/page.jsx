// src/app/blog/[id]/page.jsx
import PocketBase from 'pocketbase';

// 1. Inisialisasi PocketBase (bisa dipisah ke file lib tersendiri jika mau)
const pb = new PocketBase('http://127.0.0.1:8090'); // Sesuaikan dengan URL PocketBase Anda

// 2. Fungsi untuk mengambil satu data spesifik berdasarkan ID
async function getPost(postId) {
  // Menggunakan getOne sesuai permintaan
  const data = await pb.collection('posts').getOne(postId);
  return data;
}

export default async function BlogDetailPage({ params }) {
  // 3. Menangkap ID dari parameter URL
  const { id } = params;
  
  // 4. Memanggil data
  const post = await getPost(id);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Tombol kembali sederhana */}
      <a href="/blog" className="text-blue-500 hover:underline mb-4 block">
        &larr; Kembali ke Blog
      </a>

      <article>
        {/* Tampilkan Judul */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {post.title}
        </h1>

        <div className="text-sm text-gray-500 mb-8">
          Created: {new Date(post.created).toLocaleDateString()}
        </div>

        {/* Tampilkan Konten */}
        {/* Menggunakan dangerouslySetInnerHTML jika konten berupa Rich Text/HTML */}
        <div 
          className="prose lg:prose-xl text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}