import { createContext } from "react";

export interface ListadoPuntaje {
  nombre: string;
  puntaje: number;
}

interface Contexto {
  puntaje: number;
  setPuntaje: (puntaje: number) => void;
  nombre: string;
  setNombre: (nombre: string) => void;
  ranking: ListadoPuntaje[];
  setRanking: (ranking: ListadoPuntaje[]) => void;
  dificultad: number;
  setDificultad: (dificultad: number) => void;
}
export const UserContext = createContext<Contexto | undefined>(undefined);
