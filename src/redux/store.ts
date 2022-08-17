import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pokemonSlice } from "./reducers/pokeminListReducer";

const store = configureStore({
  reducer: {
    pokemonList: pokemonSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const selectPokemonList = (state: RootState) =>
  state.pokemonList.pokemonList;
export const selectSinglePokemon = (state: RootState) =>
  state.pokemonList.singlePokemon;
export const selectPreviousPokemon = (state: RootState) =>
  state.pokemonList.previousPokemon;
export const selectNextPokemon = (state: RootState) =>
  state.pokemonList.nextPokemon;
export const selectPokeMovesDetails = (state: RootState) =>
  state.pokemonList.pokemonMovesDetails;
export const selectCurrentGen = (state: RootState) =>
  state.pokemonList.currentGen;
