import React, { ChangeEvent } from "react";
import { TPokemon } from "../../model/pokemon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPokemonList } from "../../redux/store";
import {
  updateSearch,
  updateSort,
} from "../../redux/reducers/pokeminListReducer";
import "./Header.scss";

function Header() {
  const pokemonListSelector = useAppSelector(selectPokemonList);
  const dispatch = useAppDispatch();

  function searchPokemon(event: ChangeEvent<HTMLInputElement>) {
    const keyWord = event.target.value;
    let result: TPokemon[] = [];
    if (isNaN(parseInt(keyWord))) {
      result = pokemonListSelector.filter((pokemon) =>
        pokemon.name.includes(keyWord)
      );
    } else if (!isNaN(parseInt(keyWord))) {
      result = pokemonListSelector.filter(
        (pokemon) => parseInt(pokemon.id) === parseInt(keyWord)
      );
    }
    dispatch(updateSearch(result));
  }

  function sortList(e: ChangeEvent<HTMLSelectElement>) {
    const sortBy = e.target.value;
    let tempList = pokemonListSelector.map((p) => {
      return p;
    });
    switch (sortBy) {
      case "number":
        tempList.sort((firstPokemon: TPokemon, secondPokemon: TPokemon) =>
          firstPokemon.id > secondPokemon.id ? 1 : -1
        );
        dispatch(updateSort(tempList));
        break;
      case "name":
        tempList.sort((firstPokemon: TPokemon, secondPokemon: TPokemon) =>
          firstPokemon.name > secondPokemon.name ? 1 : -1
        );
        dispatch(updateSort(tempList));
        break;
      default:
        break;
    }
  }

  return (
    <header>
      <h1>Daniels Pokédex</h1>
      <div className="pokemon-list-actions">
        <label htmlFor="search-pokemon">Search for Pokémon</label>
        <input
          type="text"
          name="search-pokemon"
          id="search-pokemon"
          onChange={searchPokemon}
        />
        <select
          name="sort-by"
          id="sort-by"
          onChange={sortList}
          defaultValue={"sort-by"}
        >
          <option value="sort-by" disabled>
            Sort by
          </option>
          <option value="name">Name</option>
          <option value="number">Number</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
