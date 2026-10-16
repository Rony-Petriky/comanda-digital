import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Comanda Digital & KDS',
  description: 'Gerenciamento de pedidos em tempo real',
  manifest: '/manifest.json',
  themeColor: '#10b981',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}