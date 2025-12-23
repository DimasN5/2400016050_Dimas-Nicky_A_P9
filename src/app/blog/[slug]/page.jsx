import { posts } from "../../../data/posts";
export default async function BlogDetail({ params }) {
  // 1. Ambil slug dari URL
  const { slug } = await params;
  // 2. Cari data yang sesuai dengan slug
  const post = posts.find((p) => p.slug === slug);
  // 3. Handle jika data tidak ditemukan (404 sederhana)
  if (!post) {
    return (
      <div
        className="text-center text-red-500
mt-10"
      >
        Artikel tidak ditemukan!
      </div>
    );
  }
  return (
    <article className="max-w-2xl mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-8">
        ID Artikel: {post.id} | Slug: {slug}
      </div>
      <div className="prose lg:prose-xl">
        <p>{post.content}</p>
      </div>

      <br />
      <a
        href="/blog"
        className="text-blue-600
hover:underline"
      >
        &larr; Kembali ke Daftar
      </a>
    </article>
  );
}
