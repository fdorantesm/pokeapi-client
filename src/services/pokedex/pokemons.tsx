import { Pagination } from "@/types/general/pagination.type";
import { ResponseSuccess } from "@/types/general/response-success.type";
import { Pokemon } from "@/types/pokemons/pokemon.type";
import { PokemonsFilter } from "@/types/pokemons/pokemons-filter.type";
import { pokedex } from ".";

export async function getPaginatedPokemons(
  filter: PokemonsFilter
): Promise<Pagination<Pokemon>> {
  const { data: response } = await pokedex.get<
    ResponseSuccess<Pagination<Pokemon>>
  >("/v1/pokemons");
  return response.data;
}

export async function getAllPokemons(): Promise<Pokemon[]> {
  const { data: response } = await pokedex.get<ResponseSuccess<Pokemon[]>>(
    "/v1/pokemons"
  );
  return response.data;
}

export async function getPokemonById(id: string): Promise<Pokemon> {
  const { data: response } = await pokedex.get<ResponseSuccess<Pokemon>>(
    `/v1/pokemons/${id}`
  );
  return response.data;
}
