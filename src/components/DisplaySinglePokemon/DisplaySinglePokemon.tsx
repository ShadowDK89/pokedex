import React, { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import { getMoveDetails, getSinglePokemon } from "../../api/pokeApi";
import { TPokemon, TPokeMovesDetails, TPokeType } from "../../model/pokemon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectPokeMovesDetails,
  selectPreviousPokemon,
  selectNextPokemon,
  selectSinglePokemon,
} from "../../redux/store";
import {
  updateSinglePokemon,
  updatePreviousPokemon,
  updateNextPokemon,
  updatePokeMovesDetails,
} from "../../redux/reducers/pokeminListReducer";
import { Link } from "react-router-dom";
import "./DisplaySinglePokemon.scss";

type TSinglePokemon = {
  id: string;
};

const defaultPokemon: TPokemon = {
  name: "",
  id: "",
  types: [],
  moves: [],
  sprites: { front_default: "" },
  stats: [],
  abilities: [],
};
const moveList: TPokeMovesDetails[] = [];
const defaultJSX: JSX.Element[] = [];

function DisplaySinglePokemon() {
  let { id } = useParams<TSinglePokemon>();
  const pokemonSelector = useAppSelector(selectSinglePokemon);
  const previousPokemonSelector = useAppSelector(selectPreviousPokemon);
  const nextPokemonSelector = useAppSelector(selectNextPokemon);
  const movesSelector = useAppSelector(selectPokeMovesDetails);
  const [moveListHtmlOutput, setMoveListHtmlOutput] = useState(defaultJSX);
  const dispatch = useAppDispatch();
  const leftArrow = <FontAwesomeIcon icon={faArrowLeft} />;
  const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;

  useEffect(() => {
    fetchSinglePokemon(id!);
  }, []);
  useEffect(() => {
    movesHtml(movesSelector);
  }, [movesSelector]);

  function fetchSinglePokemon(id: string) {
    if (pokemonSelector.id.toString() !== id) {
      let currentId = parseInt(id!);
      let tempPokemon = getSinglePokemon(currentId);

      tempPokemon.then((pokeman) => {
        if (pokeman !== undefined && typeof pokeman !== "number") {
          for (let i = 0; i < pokeman.moves.length; i++) {
            let moveDetails = getMoveDetails(pokeman.moves[i].move.url);
            moveDetails.then((details) => {
              moveList.push(details);
              dispatch(updatePokeMovesDetails(moveList));
            });
          }
          dispatch(updateSinglePokemon(pokeman));
        } else {
          defaultPokemon.name = "Error finding pokemon";
          dispatch(updateSinglePokemon(defaultPokemon));
        }
      });
      let previousId = parseInt(id!) - 1;
      let nextId = parseInt(id!) + 1;

      let tempPreviousPokemon = getSinglePokemon(previousId);
      let tempNextPokemon = getSinglePokemon(nextId);

      tempPreviousPokemon.then((prev) => {
        dispatch(updatePreviousPokemon(prev));
      });
      tempNextPokemon.then((next) => {
        dispatch(updateNextPokemon(next));
      });
    }
  }

  function renderPrevNext(prop: TPokemon, position: JSX.Element) {
    return (
      <a href={`/pokemon/${prop.id}`} data-id={prop.id} key={prop.id}>
        <p>
          <img src={prop.sprites.front_default} /> <br />
          {prop.id}. {prop.name} <br />
          {position}
        </p>
      </a>
    );
  }

  function movesHtml(list: TPokeMovesDetails[]) {
    const updatedList = list.map((m) => {
      let moveName = m.name.replaceAll(/-/g, " ").trim();
      let imgPath = require(`../../assets/img/types/${m.type.name}_type_icon.svg`);
      return (
        <li key={m.name}>
          <div className="move-details">
            <h3>{moveName}</h3>
            <span>Power: {m.power}</span>
            <br />
            <span>PP: {m.pp}</span>
            <br />
            <span>Accuracy: {m.accuracy}</span>
            <br />
            <span>Type: {m.type.name}</span>
            <br />
            <span>Damage Class: {m.damage_class.name}</span>
          </div>
          <div className="move-image-container">
            <img src={imgPath} alt="" />
          </div>
        </li>
      );
    });
    setMoveListHtmlOutput(updatedList);
    return updatedList;
  }

  function searchMove(event: ChangeEvent<HTMLInputElement>) {
    const keyWord = event.target.value;
    let result = movesSelector.filter((move) => move.name.includes(keyWord));
    movesHtml(result);
  }

  function renderPokemon(pokeman: TPokemon) {
    return (
      <React.Fragment>
        {pokeman.id !== "" ? (
          <div
            className="card pokemon-details-container"
            id={`pokemon-${pokeman.id}`}
            data-id={pokeman.id}
            key={pokeman.id}
          >
            <div id="back-btn">
              <Link to="/">Back</Link>
            </div>
            <img
              className="card-image"
              src={pokeman.sprites.front_default}
              alt={`${pokeman.name}`}
            />
            <div className="card-heading">
              <div className="previous-pokemon">
                {previousPokemonSelector.id
                  ? renderPrevNext(
                      previousPokemonSelector,
                      <React.Fragment>
                        {leftArrow}
                        <span>Previous</span>
                      </React.Fragment>
                    )
                  : ""}
              </div>
              <div className="pokemon-name">
                <h2 className="card-title">
                  {pokeman.id}. {pokeman.name}
                </h2>
                <p className="card-subtitle">
                  Type:
                  {" " +
                    pokeman.types
                      .map((type: TPokeType) => {
                        return type.type.name.replaceAll(/-/g, " ").trim();
                      })
                      .join(", ")}
                </p>
              </div>
              <div className="next-pokemon">
                {nextPokemonSelector.id
                  ? renderPrevNext(
                      nextPokemonSelector,
                      <React.Fragment>
                        <span>Next</span>
                        {rightArrow}
                      </React.Fragment>
                    )
                  : ""}
              </div>
            </div>

            <div className="abilites">
              <div className="abilities-content">
                <h2>Abilites</h2>
                {pokeman.abilities.map((abil) => {
                  let newAbility = abil.ability.name
                    .replaceAll(/-/g, " ")
                    .trim();
                  return (
                    <p
                      className={abil.is_hidden ? "hidden-ability" : ""}
                      key={abil.ability.name}
                    >
                      {abil.is_hidden ? (
                        <React.Fragment>
                          <span className="hidden-ability-heading">
                            Hidden Ability{" "}
                          </span>
                          <br />
                          <span>{newAbility}</span>
                        </React.Fragment>
                      ) : (
                        <span>{newAbility}</span>
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="detailed-info">
              <div className="poke-stats">
                <h2>Stats</h2>
                {pokeman.stats.map((s) => {
                  let newStat = s.stat.name.replaceAll(/-/g, " ").trim();
                  return (
                    <React.Fragment>
                      <p key={s.stat.name}>{newStat}</p>
                      <p key={s.base_stat}>{s.base_stat}</p>
                      <progress
                        className={`stat-${s.stat.name}`}
                        value={s.base_stat}
                        max={120}
                      ></progress>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="poke-moves">
                <h2>moves</h2>
                <label id="search-move-label" htmlFor="search-move">
                  Search move
                </label>
                <input
                  type="text"
                  id="search-move"
                  name="search-move"
                  onChange={searchMove}
                />
                <ul className="moves-list">{moveListHtmlOutput}</ul>
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <li className="card pokemon-details-container">
              <h1>{pokeman.name}</h1>
            </li>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div id="pokemon-details">{renderPokemon(pokemonSelector)}</div>
    </React.Fragment>
  );
}

export default DisplaySinglePokemon;
