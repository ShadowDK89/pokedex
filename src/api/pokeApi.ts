import axios from "axios";
import {
  TPokeAbilites,
  TPokemon,
  TPokeMoves,
  TPokeMovesDetails,
  TPokeSprites,
  TPokeStats,
} from "../model/pokemon";
let url = "https://pokeapi.co/api/v2/";

let defaultPokeSprites: TPokeSprites = {
  front_default: "",
};

let pokemon: TPokemon = {
  name: "",
  id: "",
  sprites: defaultPokeSprites,
  types: [],
  stats: [],
  abilities: [],
  moves: [],
};

export async function fetchPokemon(start: number, end: number) {
  try {
    const promises: TPokemon[] = [];
    for (start; start <= end; start++) {
      let result = await axios.get<TPokemon>(`${url}pokemon/${start}`);
      pokemon = {
        name: result.data.name,
        id: result.data.id,
        sprites: result.data.sprites,
        types: result.data.types,
        stats: result.data.stats,
        abilities: result.data.abilities.map((ab) => {
          let tempObj = {
            ability: {
              name: ab.ability.name,
              url: ab.ability.url,
            },
            is_hidden: ab.is_hidden,
          };
          return tempObj;
        }),
        moves: result.data.moves.map((mov) => {
          let tempMov: TPokeMoves = {
            move: {
              name: mov.move.name,
              url: mov.move.url,
            },
          };
          return tempMov;
        }),
      };
      promises.push(pokemon);
    }
    return promises;
  } catch (error) {
    //Error has occured
  }
}

export async function getSinglePokemon(id: number) {
  let result: TPokemon = await axios
    .get<TPokemon>(`${url}pokemon/${id}`)
    .then((response) => {
      pokemon = {
        name: response.data.name,
        id: response.data.id,
        sprites: response.data.sprites,
        types: response.data.types,
        stats: response.data.stats.map((stat) => {
          let tempStat: TPokeStats = {
            base_stat: stat.base_stat,
            effort: stat.effort,
            stat: {
              name: stat.stat.name,
              url: stat.stat.url,
            },
          };
          return tempStat;
        }),
        abilities: response.data.abilities.map((ab) => {
          let tempObj: TPokeAbilites = {
            ability: {
              name: ab.ability.name,
              url: ab.ability.url,
            },
            is_hidden: ab.is_hidden,
          };
          return tempObj;
        }),
        moves: response.data.moves.map((mov) => {
          let tempMov: TPokeMoves = {
            move: {
              name: mov.move.name,
              url: mov.move.url,
            },
          };
          return tempMov;
        }),
      };
      return pokemon;
    })
    .catch((error) => {
      return error.response.status;
    });
  return result;
}

export async function getMoveDetails(moveUrl: string) {
  let result = await axios
    .get<TPokeMovesDetails>(`${moveUrl}`)
    .then((response) => {
      let pokeMove: TPokeMovesDetails = {
        id: response.data.id,
        name: response.data.name,
        accuracy: response.data.accuracy,
        pp: response.data.pp,
        power: response.data.power,
        damage_class: response.data.damage_class,
        type: response.data.type,
      };
      return pokeMove;
    });
  return result;
}
