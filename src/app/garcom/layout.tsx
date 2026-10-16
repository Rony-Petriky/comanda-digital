import React from 'react';
import Link from 'next/link';

export default function GarcomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-emerald-600 text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <Link href="/garcom" className="font-bold text-lg flex items-center gap-2">
          <span>📲</span>
          <span>Comanda Digital</span>
        </Link>
        <span className="text-xs bg-emerald-700 px-2.5 py-1 rounded-full text-emerald-100 font-medium">
          Garçom
        </span>
      </header>
      <main className="flex-1 max-w-md w-full mx-auto p-4">{children}</main>
    </div>
  );
}