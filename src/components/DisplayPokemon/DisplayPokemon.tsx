import React, { ChangeEvent, useEffect, useState } from "react";
import { TPokemon, TPokeType } from "../../model/pokemon";
import { fetchPokemon } from "../../api/pokeApi";
import "./DisplayPokemon.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPokemonList, selectCurrentGen } from "../../redux/store";
import { addPokemonList } from "../../redux/reducers/pokeminListReducer";
import PokeballAnimation from "../../assets/img/PokeballAnimation";

const defaultJSX: JSX.Element[] = [];

export default function DisplayPokemon() {
  const pokemonListSelector = useAppSelector(selectPokemonList);
  const currentGenSelector = useAppSelector(selectCurrentGen);
  const dispatch = useAppDispatch();
  let pokemonListHtml: JSX.Element[] = [];
  const [renderList, setRenderList] = useState(defaultJSX);
  const [currentGeneration, setCurrentGeneration] = useState(0);

  useEffect(() => {
    if (currentGeneration !== currentGenSelector) {
      if (pokemonListHtml.length > 0) {
        dispatch(addPokemonList([]));
      }
      switch (currentGenSelector) {
        case 0:
          let gen0 = fetchPokemon(1, 898);
          gen0.then((list) => {
            if (list !== undefined) {
              dispatch(addPokemonList(list));
              setCurrentGeneration(currentGenSelector);
            }
          });
          break;
        case 1:
          let gen1 = fetchPokemon(1, 151);
          gen1.then((list) => {
            if (list !== undefined) {
              dispatch(addPokemonList(list));
              setCurrentGeneration(currentGenSelector);
            }
          });
          break;
        case 2:
          let gen2 = fetchPokemon(152, 251);
          gen2.then((list) => {
            if (list !== undefined) {
              dispatch(addPokemonList(list));
              setCurrentGeneration(currentGenSelector);
            }
          });
          break;
        case 3:
          let gen3 = fetchPokemon(252, 386);
          gen3.then((list) => {
            if (list !== undefined) {
              dispatch(addPokemonList(list));
              setCurrentGeneration(currentGenSelector);
            }
          });
          break;
        case 4:
          let gen4 = fetchPokemon(387, 493);
          gen4.then((list) => {
            if (list !== undefined) {
              dispatch(addPokemonList(list));
              setCurrentGeneration(currentGenSelector);
            }
          });
          break;
        case 5:
          let gen5 = fetchPokemon(494, 649);
          gen5.then((list) => {
            if (list !== undefined) {
              dispatch(addPokemonList(list));
              setCurrentGeneration(currentGenSelector);
            }
          });
          break;
        case 6:
          let gen6 = fetchPokemon(650, 721);
          gen6.then((list) => {
            if (list !== undefined) {
              dispatch(addPokemonList(list));
              setCurrentGeneration(currentGenSelector);
            }
          });
          break;
        case 7:
          let gen7 = fetchPokemon(722, 809);
          gen7.then((list) => {
            if (list !== undefined) {
              dispatch(addPokemonList(list));
              setCurrentGeneration(currentGenSelector);
            }
          });
          break;
        case 8:
          let gen8 = fetchPokemon(810, 898);
          gen8.then((list) => {
            if (list !== undefined) {
              dispatch(addPokemonList(list));
              setCurrentGeneration(currentGenSelector);
            }
          });
          break;
        default:
          break;
      }
    }
  }, [currentGenSelector, currentGeneration, dispatch]);

  useEffect(() => {
    renderListHTML(pokemonListSelector);
  }, [pokemonListSelector]);

  function renderListHTML(list: TPokemon[]) {
    const updatedList = list.map((pokeman) => {
      return (
        <Link
          to={`/pokemon/${pokeman.id}`}
          data-id={pokeman.id}
          key={pokeman.id}
        >
          <li className="card">
            <img
              className="card-image"
              src={pokeman.sprites.front_default}
              alt={`${pokeman.name}`}
            />
            <h2 className="card-title">
              {pokeman.id}. {trimString(pokeman.name)}
            </h2>
            <p className="card-subtitle">
              Type:
              {" " +
                pokeman.types
                  .map((type: TPokeType) => type.type.name)
                  .join(", ")}
            </p>
          </li>
        </Link>
      );
    });
    setRenderList(updatedList);
    //return updatedList;
  }
  function searchPokemon(event: ChangeEvent<HTMLInputElement>) {
    const keyWord = event.target.value;
    let result: TPokemon[] = [];
    result = pokemonListSelector.filter((pokemon) =>
      pokemon.name.includes(keyWord)
    );
    renderListHTML(result);
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
        renderListHTML(tempList);
        break;
      case "name":
        tempList.sort((firstPokemon: TPokemon, secondPokemon: TPokemon) =>
          firstPokemon.name > secondPokemon.name ? 1 : -1
        );
        renderListHTML(tempList);
        break;
      default:
        break;
    }
  }

  function trimString(str: string) {
    return str.replaceAll(/-/g, " ").trim();
  }

  return (
    <React.Fragment>
      <h1>Shadows Pokédex</h1>
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
      <ul id="pokemon-container">
        {pokemonListSelector.length > 0 &&
        currentGeneration === currentGenSelector ? (
          renderList
        ) : (
          <React.Fragment>
            <PokeballAnimation />
          </React.Fragment>
        )}
      </ul>
    </React.Fragment>
  );
}
