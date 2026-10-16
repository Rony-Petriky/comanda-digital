'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Produto } from '@/types';

export default function AdminProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  // Formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('Lanches');
  const [salvando, setSalvando] = useState(false);

  const carregarProdutos = async () => {
    const { data, error } = await supabase.from('produtos').select('*').order('nome');
    if (!error && data) setProdutos(data);
    setLoading(false);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const salvarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !preco || salvando) return;

    setSalvando(true);
    const { error } = await supabase.from('produtos').insert([
      {
        nome,
        preco: parseFloat(preco),
        categoria,
      },
    ]);

    if (error) {
      alert('Erro ao cadastrar produto!');
    } else {
      setNome('');
      setPreco('');
      carregarProdutos();
    }
    setSalvando(false);
  };

  const excluirProduto = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este produto?')) return;

    const { error } = await supabase.from('produtos').delete().eq('id', id);
    if (!error) carregarProdutos();
  };

  if (loading) return <div className="text-zinc-400">Carregando cardápio...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Gestão de Cardápio</h1>
        <p className="text-sm text-zinc-400">Cadastre e gerencie os itens do menu</p>
      </div>

      {/* Formulário de Cadastro */}
      <form onSubmit={salvarProduto} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold text-white">Novo Produto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-emerald-500"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Preço (Ex: 25.90)"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-emerald-500"
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-emerald-500"
          >
            <option value="Lanches">Lanches</option>
            <option value="Acompanhamentos">Acompanhamentos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Sobremesas">Sobremesas</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={salvando}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          {salvando ? 'Salvando...' : 'Adicionar Produto'}
        </button>
      </form>

      {/* Tabela de Produtos */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-800/80 text-zinc-400 font-semibold border-b border-zinc-700">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Preço</th>
              <th className="p-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {produtos.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-850">
                <td className="p-3 font-medium text-white">{p.nome}</td>
                <td className="p-3">
                  <span className="bg-zinc-800 border border-zinc-700 text-xs px-2 py-1 rounded-md">
                    {p.categoria}
                  </span>
                </td>
                <td className="p-3 font-semibold text-emerald-400">R$ {p.preco.toFixed(2)}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => excluirProduto(p.id)}
                    className="text-red-400 hover:text-red-300 text-xs font-semibold px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}