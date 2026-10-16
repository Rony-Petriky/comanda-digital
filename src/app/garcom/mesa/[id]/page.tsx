'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { Produto, ItemCarrinho } from '@/types';

// 1. Componente interno que consome os parâmetros e gerencia a lógica da mesa
function ConteudoMesa() {
  const params = useParams();
  const router = useRouter();
  const mesa = params.id;

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);

  // Buscar produtos do Supabase ao carregar a página
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const { data, error } = await supabase
          .from('produtos')
          .select('*');
        console.log("########")
        console.log(data)
        if (error) {
          console.warn('Aviso do Supabase (tabela produtos pode não existir ainda):', error.message);
          // Define dados vazios para não quebrar a tela
          setProdutos([]);
        } else if (data) {
          setProdutos(data);
        }
      } catch (err) {
        console.error('Erro inesperado:', err);
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    }
    carregarProdutos();
  }, []);

  // Adicionar item ao carrinho
  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.produto.id === produto.id);
      if (itemExistente) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  // Remover ou diminuir item do carrinho
  const removerDoCarrinho = (produtoId: string) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  // Calcular valor total do pedido
  const totalPedido = carrinho.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  // Enviar pedido para a Cozinha
  const enviarPedido = async () => {
    if (carrinho.length === 0) return;
    setEnviando(true);

    try {
      // Exemplo de salvamento na tabela 'pedidos' (ajuste conforme seu banco)
      const { error } = await supabase.from('pedidos').insert([
        {
          mesa: mesa,
          status: 'pendente',
          itens: carrinho,
          total: totalPedido,
          created_at: new Date(),
        },
      ]);

      if (error) {
        alert('Erro ao enviar pedido: ' + error.message);
      } else {
        alert('Pedido enviado para a cozinha com sucesso! 🍳');
        setCarrinho([]);
        router.push('/garcom'); // Volta para a tela de seleção de mesas
      }
    } catch (err) {
      console.error('Erro ao enviar pedido:', err);
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="text-amber-400 font-medium animate-pulse">Carregando cardápio...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white pb-32">
      {/* Cabeçalho */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold text-amber-400">Mesa {mesa}</h1>
          <p className="text-xs text-slate-400">Selecione os itens para o atendimento</p>
        </div>
        <button
          onClick={() => router.push('/garcom')}
          className="bg-slate-700 hover:bg-slate-600 text-sm px-3 py-1.5 rounded-lg transition-all"
        >
          Voltar às Mesas
        </button>
      </header>

      {/* Lista de Produtos do Cardápio */}
      <div className="p-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {produtos.length === 0 ? (
          <div className="col-span-full text-center py-10 bg-slate-800/50 rounded-xl border border-slate-800">
            <p className="text-slate-400">Nenhum produto cadastrado ou disponível no momento.</p>
            <p className="text-xs text-slate-500 mt-1">Cadastre itens na sua tabela 'produtos' no Supabase.</p>
          </div>
        ) : (
          produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-slate-800 border border-slate-700/60 rounded-xl p-4 flex justify-between items-center shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-slate-100">{produto.nome}</h3>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{produto.descricao}</p>
                <p className="text-amber-400 font-bold mt-2">
                  R$ {Number(produto.preco).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-all active:scale-95 shadow"
              >
                + Adicionar
              </button>
            </div>
          ))
        )}
      </div>

      {/* Carrinho Flutuante inferior */}
      {carrinho.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 p-4 shadow-2xl backdrop-blur-md bg-opacity-95">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-xs text-slate-400">Total Parcial ({carrinho.reduce((acc, i) => acc + i.quantidade, 0)} itens):</p>
              <p className="text-xl font-bold text-emerald-400">R$ {totalPedido.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700 max-h-12 overflow-x-auto max-w-[200px]">
                {carrinho.map((item) => (
                  <span key={item.produto.id} className="text-xs px-2 py-1 bg-slate-700 rounded mr-1 flex items-center gap-1 whitespace-nowrap">
                    {item.produto.nome} ({item.quantidade})
                    <button onClick={() => removerDoCarrinho(item.produto.id)} className="text-red-400 hover:text-red-300 font-bold ml-1">×</button>
                  </span>
                ))}
              </div>

              <button
                onClick={enviarPedido}
                disabled={enviando}
                className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {enviando ? 'Enviando...' : 'Enviar para Cozinha 🚀'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// 2. Componente principal exportado que envolve com o Suspense exigido pelo Next.js
export default function AtendimentoMesaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
          <p className="text-amber-400 font-medium animate-pulse">Carregando painel da mesa...</p>
        </div>
      }
    >
      <ConteudoMesa />
    </Suspense>
  );
}