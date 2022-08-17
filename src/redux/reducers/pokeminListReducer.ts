import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TPokeAbilites,
  TPokemon,
  TPokeMovesDetails,
  TPokeSprites,
} from "../../model/pokemon";
import type { RootState } from "../store";

type PokemonSliceState = {
  pokemonList: TPokemon[];
  singlePokemon: TPokemon;
  previousPokemon: TPokemon;
  nextPokemon: TPokemon;
  pokemonMovesDetails: TPokeMovesDetails[];
  currentGen: number;
};

const defaultSprites: TPokeSprites = {
  front_default: "",
};

const defaultAbilites: TPokeAbilites[] = [];

const defaultPokemon: TPokemon = {
  id: "",
  name: "",
  sprites: defaultSprites,
  types: [],
  stats: [],
  abilities: [],
  moves: [],
};

const defaultMovesDetails: TPokeMovesDetails[] = [];

const initialState: PokemonSliceState = {
  pokemonList: [],
  singlePokemon: defaultPokemon,
  previousPokemon: defaultPokemon,
  nextPokemon: defaultPokemon,
  pokemonMovesDetails: defaultMovesDetails,
  currentGen: 1,
};

export const pokemonSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addPokemonList: (state, action: PayloadAction<TPokemon[]>) => {
      state.pokemonList = [...action.payload];
    },
    updateSinglePokemon: (state, action: PayloadAction<TPokemon>) => {
      state.singlePokemon = {
        ...action.payload,
      };
    },
    updatePreviousPokemon: (state, action: PayloadAction<TPokemon>) => {
      state.previousPokemon = { ...action.payload };
    },
    updateNextPokemon: (state, action: PayloadAction<TPokemon>) => {
      state.nextPokemon = { ...action.payload };
    },
    updatePokeMovesDetails: (
      state,
      action: PayloadAction<TPokeMovesDetails[]>
    ) => {
      state.pokemonMovesDetails = [...action.payload];
    },
    currentGeneration: (state, action: PayloadAction<number>) => {
      state.currentGen = action.payload;
    },
  },
});

export const {
  addPokemonList,
  updateSinglePokemon,
  updatePreviousPokemon,
  updateNextPokemon,
  updatePokeMovesDetails,
  currentGeneration,
} = pokemonSlice.actions;
