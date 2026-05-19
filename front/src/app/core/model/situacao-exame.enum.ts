export enum SituacaoExame {
  SOLICITADO = 'SOLICITADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
  REJEITADO = 'REJEITADO',
  AGENDADO = 'AGENDADO',
  PROCESSANDO = 'PROCESSANDO',
}

export const SituacaoExameOptions = [
  { value: SituacaoExame.SOLICITADO, label: 'Solicitado' },
  { value: SituacaoExame.EM_ANDAMENTO, label: 'Em Andamento' },
  { value: SituacaoExame.CONCLUIDO, label: 'Concluído' },
  { value: SituacaoExame.CANCELADO, label: 'Cancelado' },
  { value: SituacaoExame.AGENDADO, label: 'Agendado' },
  { value: SituacaoExame.PROCESSANDO, label: 'Processando' },
];