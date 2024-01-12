import { PokemonAbility } from "./pokemon-ability.type";
import { Specie } from "./specie.type";
import { Sprites } from "./sprites.type";
import { Stats } from "./stats.type";
import { Types } from "./types.type";

export type Pokemon = {
  uuid: string;
  id: number;
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  abilities: PokemonAbility[];
  species: Specie;
  stats: Stats[];
  types: Types[];
  sprites: Sprites;
  order: number;
};
