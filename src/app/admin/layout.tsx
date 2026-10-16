import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Barra Lateral / Topo */}
      <aside className="w-full md:w-64 bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 p-4 flex md:flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📊</span>
            <span className="font-bold text-lg text-white">Painel Admin</span>
          </div>

          <nav className="space-y-2 flex md:flex-col gap-2 md:gap-0">
            <Link
              href="/admin"
              className="flex-1 md:flex-none px-3 py-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-sm font-medium transition-colors"
            >
              📈 Dashboard
            </Link>
            <Link
              href="/admin/produtos"
              className="flex-1 md:flex-none px-3 py-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-sm font-medium transition-colors"
            >
              🍔 Produtos / Cardápio
            </Link>
          </nav>
        </div>

        <div className="hidden md:block pt-4 border-t border-zinc-800">
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300">
            ← Voltar para seleção de perfil
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 max-w-6xl">{children}</main>
    </div>
  );
}