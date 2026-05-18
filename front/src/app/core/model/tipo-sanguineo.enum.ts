export enum TipoSanguineo {
  AP = 'AP',
  AN = 'AN',
  BP = 'BP',
  BN = 'BN',
  ABP = 'ABP',
  ABN = 'ABN',
  OP = 'OP',
  ON = 'ON'
}

export const TipoSanguineoLabel: Record<TipoSanguineo, string> = {
  [TipoSanguineo.AP]: 'A+',
  [TipoSanguineo.AN]: 'A-',
  [TipoSanguineo.BP]: 'B+',
  [TipoSanguineo.BN]: 'B-',
  [TipoSanguineo.ABP]: 'AB+',
  [TipoSanguineo.ABN]: 'AB-',
  [TipoSanguineo.OP]: 'O+',
  [TipoSanguineo.ON]: 'O-'
};

export const TipoSanguineoOptions: { text: string; value: TipoSanguineo }[] = Object.values(TipoSanguineo).map((value) => ({
  text: TipoSanguineoLabel[value],
  value
}));
