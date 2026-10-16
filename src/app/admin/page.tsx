'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';

export default function AdminDashboardPage() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [pedidosHoje, setPedidosHoje] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarMetricas() {
      const { data, error } = await supabase
        .from('pedidos')
        .select('*, itens_pedido(*)')
        .order('criado_em', { ascending: false });

      if (!error && data) {
        setPedidosHoje(data);
        setTotalPedidos(data.length);
      }
      setLoading(false);
    }
    carregarMetricas();
  }, []);

  if (loading) return <div className="text-zinc-400">Carregando métricas...</div>;

  const concluidos = pedidosHoje.filter((p) => p.status === 'entregue').length;
  const emAndamento = pedidosHoje.filter((p) => p.status === 'pendente' || p.status === 'preparando').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Resumo Operacional</h1>
        <p className="text-sm text-zinc-400">Acompanhamento geral de comandas</p>
      </div>

      {/* Cards Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <span className="text-xs font-medium text-zinc-400">Total de Pedidos</span>
          <p className="text-3xl font-black text-white mt-1">{totalPedidos}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <span className="text-xs font-medium text-amber-400">Em Andamento</span>
          <p className="text-3xl font-black text-amber-400 mt-1">{emAndamento}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <span className="text-xs font-medium text-emerald-400">Finalizados / Entregues</span>
          <p className="text-3xl font-black text-emerald-400 mt-1">{concluidos}</p>
        </div>
      </div>

      {/* Histórico Recente */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-3">
        <h2 className="text-lg font-bold text-white">Últimas Comandas</h2>
        <div className="space-y-2">
          {pedidosHoje.slice(0, 5).map((p) => (
            <div key={p.id} className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg text-sm">
              <div>
                <span className="font-bold text-white">Mesa {p.mesa}</span>
                <span className="text-xs text-zinc-400 block">
                  {new Date(p.criado_em).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <span className="text-xs uppercase font-extrabold px-2.5 py-1 rounded-full bg-zinc-700 text-zinc-200">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}