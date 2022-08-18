export type TPokemon = {
  id: string;
  name: string;
  types: TPokeType[];
  sprites: TPokeSprites;
  stats: TPokeStats[];
  abilities: TPokeAbilites[];
  moves: TPokeMoves[];
};

export type TPokeStats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};
export type TPokeMoves = {
  move: {
    name: string;
    url: string;
  };
};
export type TPokeMovesDetails = {
  id: number;
  name: string;
  accuracy: number;
  pp: number;
  power: number;
  damage_class: {
    name: string;
  };
  type: {
    name: string;
  };
};

export type TPokeAbilites = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: Boolean;
};

export type TPokeSprites = {
  front_default: string;
};

export type TPokeType = {
  type: {
    name: string;
  };
};
