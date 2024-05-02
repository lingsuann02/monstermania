import { UUID } from "crypto";

type Base = {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
};

export type Monster = {
  name: string;
  type: string;
  color: string;
} & Base;

export type MonsterWithHp = {
  hp: number;
} & Monster;

export type Settings = {
  startingHp: number;
  snack1: number;
  snack2: number;
  snack3: number;
  poisonPercentage: number;
};

export type Game = {
  name?: string;
  poisonRate?: number;
  monsters?: Monster[];
  monsterIds: UUID[];
  settings?: Settings;
} & Base;

export type MonsterState = {
  prevHp: number;
  hpLossDueToSnack: number;
  hpLossDueToRound: number;
} & MonsterWithHp;

export type Log = {
  state: MonsterState[];
  game: Game;
} & Base;
