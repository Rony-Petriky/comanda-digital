'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { playAlertSound } from '@/src/lib/sound';
import { Pedido, StatusPedido } from '@/types';
import { PedidoCard } from '@/src/components/cozinha/PedidoCard';

export default function CozinhaPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca inicial dos pedidos com os itens vinculados
  const carregarPedidos = async () => {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*, itens_pedido(*)')
      .in('status', ['pendente', 'preparando', 'pronto'])
      .order('criado_em', { ascending: true });

    if (!error && data) {
      setPedidos(data as Pedido[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarPedidos();

    // Inscrição em tempo real na tabela 'pedidos' via Supabase WebSockets
    const canalPedidos = supabase
      .channel('kds-pedidos-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'pedidos' },
        () => {
          playAlertSound(); // Toca som ao chegar novo pedido
          carregarPedidos(); // Recarrega com os itens
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'pedidos' },
        () => {
          carregarPedidos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canalPedidos);
    };
  }, []);

  // Função para mudar status de um pedido
  const atualizarStatus = async (pedidoId: string, novoStatus: StatusPedido) => {
    // Atualização otimista local
    setPedidos((prev) =>
      prev
        .map((p) => (p.id === pedidoId ? { ...p, status: novoStatus } : p))
        .filter((p) => (novoStatus === 'entregue' ? p.id !== pedidoId : true))
    );

    const { error } = await supabase
      .from('pedidos')
      .update({ status: novoStatus })
      .eq('id', pedidoId);

    if (error) {
      console.error('Erro ao atualizar status:', error);
      carregarPedidos(); // Reverte se der erro
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-400">
        Carregando pedidos da cozinha...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pedidos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-2xl">
          <span className="text-5xl mb-2">☕</span>
          <p className="text-lg font-medium">Nenhum pedido pendente no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pedidos.map((pedido) => (
            <PedidoCard
              key={pedido.id}
              pedido={pedido}
              onAtualizarStatus={atualizarStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}