import {
  Game,
  Log,
  Monster,
  MonsterWithHp,
  Settings,
  MonsterState,
} from "@/types";
import { getIsPoisoned, getRandom } from "./helpers";

export const splitLogsPerMonster = ({
  game,
  logs,
}: {
  game?: Game | void; // todo
  logs?: Log[];
}): { [key: string]: MonsterState[] } | undefined => {
  return game?.monsters?.reduce((acc, monster) => {
    return {
      ...acc,
      [monster.id]: logs
        ?.map((log) =>
          log.state?.find((_monster) => _monster.id === monster.id),
        )
        .filter(Boolean),
    };
  }, {});
};

export const getHpPerMonster = ({
  monster,
  logsPerMonster,
  settings,
}: {
  monster: Monster;
  logsPerMonster?: { [key: string]: MonsterState[] };
  settings: Settings;
}): MonsterWithHp => {
  if (logsPerMonster) {
    const logs = logsPerMonster[monster.id];
    if (logs?.length) {
      return {
        ...monster,
        hp: logs[logs.length - 1]?.hp || 0,
      };
    }
  }
  return {
    ...monster,
    hp: settings.startingHp,
  };
};

export const getRoundInformation = ({
  monster,
  settings,
}: {
  monster: MonsterWithHp;
  settings: Settings;
}): MonsterState => {
  const availableSnacks = [
    settings.snack1, // apple
    settings.snack2, // banana
    settings.snack3, // strawberry
  ];

  const randomSnack = getRandom(availableSnacks);
  const isPoisoned = getIsPoisoned(settings.poisonPercentage);
  const hpLossDueToSnack = isPoisoned
    ? Math.abs(randomSnack || 0) * -1
    : randomSnack;
  const HP_LOST_PER_ROUND = -1;
  const hp = monster.hp + hpLossDueToSnack + HP_LOST_PER_ROUND;

  return {
    ...monster,
    prevHp: monster.hp,
    hp: hp <= 0 ? 0 : hp,
    hpLossDueToSnack: monster.hp <= 0 ? 0 : hpLossDueToSnack,
    hpLossDueToRound: monster.hp <= 0 ? 0 : HP_LOST_PER_ROUND,
  };
};
