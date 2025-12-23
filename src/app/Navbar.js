"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="p-4 bg-white shadow-md flex gap-4 dark:bg-gray-800 dark:text-white">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={isActive ? "font-bold text-blue-600 dark:text-blue-400" : "hover:text-blue-500 dark:hover:text-blue-300"}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}