import React from 'react';

export default function CozinhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
      <header className="bg-zinc-800 border-b border-zinc-700 p-4 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👨‍🍳</span>
          <h1 className="font-bold text-xl tracking-wide text-white">
            Painel da Cozinha (KDS)
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Realtime Ativo</span>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}