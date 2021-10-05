import { Coordinate } from "./coordinates";

export type City = {
  id: number;
  name: string;
  state: string;
  coord: Coordinate;
};
