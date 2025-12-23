import Link from "next/link";
import { posts } from "../../data/posts"; // Import data
export default function BlogList() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Daftar Artikel</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded
bg-white shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p
              className="text-gray-600
truncate"
            >
              {post.content}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-500 mt-2 inline-block
hover:underline"
            >
              Baca Selengkapnya &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
