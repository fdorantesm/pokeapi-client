export type Pokemon = {
  uuid: string;
  name: string;
  id: number;
  order: number;
  height: number;
  weight: number;
  baseExperience: number;
  sprites: {
    frontDefault: string;
  };
};
