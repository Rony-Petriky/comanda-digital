import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
      {/* Container Principal */}
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Branding e Logo */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl text-4xl shadow-inner">
            🍽️
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Comanda Digital & KDS
          </h1>
          <p className="text-sm text-zinc-400">
            Selecione o seu perfil para acessar a interface do sistema em tempo real
          </p>
        </div>

        {/* Cards de Seleção de Perfil */}
        <div className="grid grid-cols-1 gap-4 pt-2">
          {/* Perfil: Garçom */}
          <Link
            href="/garcom"
            className="group relative flex items-center p-5 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg hover:border-emerald-500/50 hover:bg-zinc-850 transition-all active:scale-98"
          >
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl text-emerald-400 group-hover:scale-110 transition-transform">
              📲
            </div>
            <div className="ml-4 text-left">
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Módulo do Garçom
              </h2>
              <p className="text-xs text-zinc-400">
                Seleção de mesas, cardápio digital e lançamento de pedidos (Mobile)
              </p>
            </div>
          </Link>

          {/* Perfil: Cozinha / KDS */}
          <Link
            href="/cozinha"
            className="group relative flex items-center p-5 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg hover:border-amber-500/50 hover:bg-zinc-850 transition-all active:scale-98"
          >
            <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-2xl text-amber-400 group-hover:scale-110 transition-transform">
              👨‍🍳
            </div>
            <div className="ml-4 text-left">
              <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Painel da Cozinha (KDS)
              </h2>
              <p className="text-xs text-zinc-400">
                Acompanhamento em tempo real, aviso sonoro e gestão de preparo (Desktop/TV)
              </p>
            </div>
          </Link>
          <Link
            href="/admin"
            className="group relative flex items-center p-5 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg hover:border-purple-500/50 hover:bg-zinc-850 transition-all active:scale-98"
          >
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center text-2xl text-purple-400 group-hover:scale-110 transition-transform">
              📊
            </div>
            <div className="ml-4 text-left">
              <h2 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                Painel Gerencial / Admin
              </h2>
              <p className="text-xs text-zinc-400">
                Cadastro de produtos, gestão de preços e histórico de comandas
              </p>
            </div>
          </Link>
        </div>

        {/* Status do Sistema */}
        <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sistema pronto • Supabase Realtime Ativo</span>
        </div>
      </div>
    </div>
  );
}