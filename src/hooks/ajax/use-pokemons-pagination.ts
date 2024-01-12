import { getPaginatedPokemons } from "@/services/pokedex/pokemons";
import { PokemonsFilter } from "@/types/pokemons/pokemons-filter.type";

export const usePokemonsPagination = () => {
  return async function (filter: PokemonsFilter) {
    return getPaginatedPokemons(filter);
  };
};
