'use client';

import { useEffect, useState } from 'react';
import { Pedido, StatusPedido } from '@/types';

interface PedidoCardProps {
  pedido: Pedido;
  onAtualizarStatus: (id: string, novoStatus: StatusPedido) => void;
}

export function PedidoCard({ pedido, onAtualizarStatus }: PedidoCardProps) {
  const [minutosDecorridos, setMinutosDecorridos] = useState(0);

  // Atualiza o tempo decorrido a cada minuto
  useEffect(() => {
    const calcularTempo = () => {
      const inicio = new Date(pedido.criado_em).getTime();
      const agora = new Date().getTime();
      const diffMinutos = Math.floor((agora - inicio) / 60000);
      setMinutosDecorridos(diffMinutos >= 0 ? diffMinutos : 0);
    };

    calcularTempo();
    const interval = setInterval(calcularTempo, 60000); // 1 min

    return () => clearInterval(interval);
  }, [pedido.criado_em]);

  // Estilos de status
  const statusStyles: Record<StatusPedido, { border: string; bgBadge: string; textBadge: string; label: string }> = {
    pendente: {
      border: 'border-amber-400 bg-amber-50/50',
      bgBadge: 'bg-amber-100 text-amber-800',
      label: 'PENDENTE',
    },
    preparando: {
      border: 'border-blue-400 bg-blue-50/50',
      bgBadge: 'bg-blue-100 text-blue-800',
      label: 'EM PREPARO',
    },
    pronto: {
      border: 'border-emerald-500 bg-emerald-50/50',
      bgBadge: 'bg-emerald-100 text-emerald-800',
      label: 'PRONTO',
    },
    entregue: {
      border: 'border-gray-300 bg-gray-50',
      bgBadge: 'bg-gray-200 text-gray-700',
      label: 'ENTREGUE',
    },
  };

  const currentStyle = statusStyles[pedido.status];

  return (
    <div className={`bg-white rounded-2xl border-2 shadow-md p-4 flex flex-col justify-between ${currentStyle.border}`}>
      <div>
        {/* Cabeçalho do Card */}
        <div className="flex justify-between items-start border-b pb-3 mb-3">
          <div>
            <span className="text-2xl font-black text-zinc-900">Mesa {pedido.mesa}</span>
            <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
              <span>⏱️</span>
              <span className={minutosDecorridos > 15 ? 'text-red-600 font-bold' : ''}>
                {minutosDecorridos} min atrás
              </span>
            </div>
          </div>

          <span className={`text-xs font-black px-2.5 py-1 rounded-full ${currentStyle.bgBadge}`}>
            {currentStyle.label}
          </span>
        </div>

        {/* Lista de Itens */}
        <div className="space-y-2 mb-4">
          {pedido.itens_pedido?.map((item, idx) => (
            <div key={item.id || idx} className="text-sm">
              <div className="flex justify-between font-bold text-zinc-800">
                <span>{item.quantidade}x {item.produto_nome}</span>
              </div>
              {item.observacao && (
                <p className="text-xs text-amber-700 font-medium italic bg-amber-100/60 p-1.5 rounded-md mt-1">
                  ⚠️ Obs: {item.observacao}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="pt-2 border-t flex gap-2">
        {pedido.status === 'pendente' && (
          <button
            onClick={() => onAtualizarStatus(pedido.id, 'preparando')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
          >
            👨‍🍳 Iniciar Preparo
          </button>
        )}

        {pedido.status === 'preparando' && (
          <button
            onClick={() => onAtualizarStatus(pedido.id, 'pronto')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
          >
            ✅ Marcar como Pronto
          </button>
        )}

        {pedido.status === 'pronto' && (
          <button
            onClick={() => onAtualizarStatus(pedido.id, 'entregue')}
            className="w-full bg-zinc-800 hover:bg-zinc-900 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
          >
            🚀 Finalizar / Entregue
          </button>
        )}
      </div>
    </div>
  );
}