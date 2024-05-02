import { randomUUID } from "crypto";
import {
  getHpPerMonster,
  getRoundInformation,
  splitLogsPerMonster,
} from "./utils";

jest.mock("./helpers", () => ({
  getRandom: () => 3,
  getIsPoisoned: () => true,
}));

const gameId = randomUUID();
const owlId = randomUUID();
const chickenId = randomUUID();

const owl = {
  id: owlId,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Owl",
  type: "< o v o >",
  color: "000000",
};

const chicken = {
  id: chickenId,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Chicken",
  type: "u o v o u",
  color: "eeeeee",
};

const exampleGame = {
  id: gameId,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "test game",
  poisonRate: 50,
  monsters: [owl, chicken],
  monsterIds: [owlId, chickenId],
  settings: {
    startingHp: 20,
    snack1: 3,
    snack2: 5,
    snack3: 6,
    poisonPercentage: 50,
  },
};

const firstLogId = randomUUID();
const secondLogId = randomUUID();

const exampleLogs = [
  {
    id: firstLogId,
    game: exampleGame,
    gameId: exampleGame.id,
    createdAt: exampleGame.createdAt,
    updatedAt: exampleGame.updatedAt,
    state: [
      {
        ...chicken,
        hp: 14,
        prevHp: 20,
        hpLossDueToSnack: -5,
        hpLossDueToRound: -1,
      },
      {
        ...owl,
        hp: 16,
        prevHp: 20,
        hpLossDueToSnack: -3,
        hpLossDueToRound: -1,
      },
    ],
  },
  {
    id: secondLogId,
    game: exampleGame,
    gameId: exampleGame.id,
    createdAt: exampleGame.createdAt,
    updatedAt: exampleGame.updatedAt,
    state: [
      {
        ...chicken,
        hp: 10,
        prevHp: 14,
        hpLossDueToSnack: -3,
        hpLossDueToRound: -1,
      },
      {
        ...owl,
        hp: 9,
        prevHp: 16,
        hpLossDueToSnack: -6,
        hpLossDueToRound: -1,
      },
    ],
  },
];

const logsPerMonster = splitLogsPerMonster({
  game: exampleGame,
  logs: exampleLogs,
});

test("splitLogsPerMonster", () => {
  expect(logsPerMonster![owlId]).toStrictEqual([
    exampleLogs[0].state[1],
    exampleLogs[1].state[1],
  ]);
});

describe("getHpPerMonster", () => {
  test("for Owl", () => {
    const hpPerMonster = getHpPerMonster({
      monster: owl,
      logsPerMonster,
      settings: exampleGame.settings!,
    });
    expect(hpPerMonster).toStrictEqual({ ...owl, hp: 9 });
  });

  test("for Chicken", () => {
    const hpPerMonster = getHpPerMonster({
      monster: chicken,
      logsPerMonster,
      settings: exampleGame.settings!,
    });
    expect(hpPerMonster).toStrictEqual({ ...chicken, hp: 10 });
  });
});

describe("getRoundInformation", () => {
  test("for Owl", () => {
    const owlInfo = getRoundInformation({
      monster: { ...owl, hp: 20 },
      settings: exampleGame.settings,
    });
    expect(owlInfo).toStrictEqual({
      ...owl,
      hp: 16,
      prevHp: 20,
      hpLossDueToSnack: -3,
      hpLossDueToRound: -1,
    });
  });

  test("for Chicken", () => {
    const owlInfo = getRoundInformation({
      monster: { ...owl, hp: 40 },
      settings: exampleGame.settings,
    });
    expect(owlInfo).toStrictEqual({
      ...owl,
      hp: 36,
      prevHp: 40,
      hpLossDueToSnack: -3,
      hpLossDueToRound: -1,
    });
  });
});
