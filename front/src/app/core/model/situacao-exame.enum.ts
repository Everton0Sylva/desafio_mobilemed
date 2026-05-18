export enum SituacaoExame {
  SOLICITADO = 'SOLICITADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
  REJEITADO = 'REJEITADO'
}

export const SituacaoExameOptions = [
  { value: SituacaoExame.SOLICITADO, label: 'Solicitado' },
  { value: SituacaoExame.EM_ANDAMENTO, label: 'Em Andamento' },
  { value: SituacaoExame.CONCLUIDO, label: 'Concluído' },
  { value: SituacaoExame.CANCELADO, label: 'Cancelado' },
];