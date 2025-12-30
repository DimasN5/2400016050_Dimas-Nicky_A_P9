// src/app/login/page.jsx
"use client";
import { useState } from "react";
import { pb } from "../../lib/pocketbase";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsLoading(true);
    try {
      // Melakukan proses login ke PocketBase
      // Jika berhasil, token otomatis tersimpan di LocalStorage
      await pb.collection("users").authWithPassword(email, password);

      alert("Login Berhasil!");
      router.push("/dashboard"); // Redirect ke dashboard
    } catch (error) {
      console.error(error);
      alert("Email atau Password salah!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="flex justify-center items-center min-h-screen
bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Admin</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2
focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium
mb-1"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2
focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700
transition disabled:bg-gray-400"
          >
            {isLoading ? "Memuat..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
