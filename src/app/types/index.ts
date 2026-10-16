export type StatusPedido = 'pendente' | 'preparando' | 'pronto' | 'entregue';

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  criado_em?: string;
}

export interface ItemPedido {
  id?: string;
  pedido_id?: string;
  produto_nome: string;
  quantidade: number;
  observacao?: string;
}

export interface Pedido {
  id: string;
  mesa: number;
  status: StatusPedido;
  criado_em: string;
  itens_pedido?: ItemPedido[];
}

// Tipo auxiliar para a montagem do carrinho pelo Garçom
export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  observacao: string;
}