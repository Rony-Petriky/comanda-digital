'use client';

import Link from 'next/link';

export default function SelecaoMesaPage() {
  // Exemplo com 12 mesas
  const mesas = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-zinc-800">Selecione a Mesa</h1>
        <p className="text-sm text-zinc-500">Escolha onde o pedido será lançado</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {mesas.map((mesa) => (
          <Link
            key={mesa}
            href={`/garcom/mesa/${mesa}`}
            className="flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-gray-200 shadow-sm active:scale-95 transition-transform hover:border-emerald-500"
          >
            <span className="text-2xl font-black text-zinc-800">{mesa}</span>
            <span className="text-xs text-zinc-400 mt-1">Mesa</span>
          </Link>
        ))}
      </div>
    </div>
  );
}