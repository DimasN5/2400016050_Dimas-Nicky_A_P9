// src/lib/pocketbase.js
import PocketBase from "pocketbase";
// Menghubungkan aplikasi ke server PocketBase lokal
export const pb = new PocketBase("http://127.0.0.1:8090");