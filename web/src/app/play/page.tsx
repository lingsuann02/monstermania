"use client";

import { Button } from "@/components/ui/button";
import { useGetGameQuery } from "@/queries/game";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UUID } from "crypto";
import { useGetLogsQuery, usePostLogMutation } from "@/queries/log";
import { useEffect, useState } from "react";
import { MonsterWithHp } from "@/types";
import { MonstersSkeleton } from "../_components/monstersSkeleton";
import { MonsterCard } from "../_components/monsterCard";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ScoreDialog } from "./_components.tsx/scoreDialog";
import { HpBar } from "./_components.tsx/hpBar";
import {
  getHpPerMonster,
  getRoundInformation,
  splitLogsPerMonster,
} from "./utils";
import { cn } from "@/lib/utils";

export default function Play() {
  const searchParams = useSearchParams();
  const [currentRound, setCurrentRound] = useState(0);
  const gameId = searchParams.get("game_id") as UUID;
  const { fetch: fetchGame } = useGetGameQuery(gameId);
  const { fetch: fetchLogs, refetch: refetchLogs } = useGetLogsQuery(gameId);
  const { data: game, isFetched: isGameFetched } = fetchGame();
  const { data: logs, isFetched: isLogsFetched } = fetchLogs();
  const [selectedMonster, setSelectedMonster] = useState<MonsterWithHp>();

  useEffect(() => {
    if (logs && isLogsFetched) {
      setCurrentRound(logs.length);
    }
    return () => {};
  }, [game, isGameFetched, isLogsFetched, logs]);

  const postLogMutation = usePostLogMutation({
    onSuccess: () => {
      refetchLogs();
    },
  });

  const logsPerMonster = splitLogsPerMonster({ game, logs });

  const monsters = game?.monsters?.map((monster) =>
    getHpPerMonster({ monster, logsPerMonster, settings: game.settings! })
  );

  const gameEnded = monsters?.filter((monster) => monster.hp).length === 1;

  const monstersInPlay = monsters?.filter((monster) => monster.hp);

  const feed = () => {
    if (gameEnded) {
      return;
    }
    if (game?.settings && monsters) {
      postLogMutation.mutate({
        state:
          monsters
            .filter((monster) => monster.hp)
            .map((monster) =>
              getRoundInformation({ monster, settings: game.settings! })
            ) || [],
        gameId: game.id,
      });
    }
    setCurrentRound((r) => r + 1);
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setSelectedMonster(undefined);
        }
      }}
    >
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-medium mb-5">
          Let the Monster Mania begin!
        </h2>
      </div>

      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:justify-items-center py-8">
        <Button
          disabled={gameEnded}
          className="w-56 text-2xl bg-pink-700 mb-4 sm:mb-0"
          onClick={feed}
        >
          Feed
        </Button>
        {currentRound ? (
          <span className="text-xl sm:text-2xl font-bold">
            {!gameEnded && `Round ${currentRound}`}
            {gameEnded && monstersInPlay?.length
              ? `${monstersInPlay[0].name} has won!`
              : "All monsters fainted!"}
          </span>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center">
        {isGameFetched && game ? (
          monsters?.map((monster) => {
            const isVictorious = gameEnded && !!monster.hp;
            return (
              <DialogTrigger key={monster.id}>
                <MonsterCard
                  isSelected={isVictorious}
                  isSelectable
                  monster={monster}
                  onMonsterSelected={() => setSelectedMonster(monster)}
                  className={cn(isVictorious && "animate-bounce")}
                >
                  <HpBar monster={monster} settings={game.settings!} />
                  {isVictorious && (
                    <span className="animate-ping">🎊 Winner 🎊</span>
                  )}
                </MonsterCard>
              </DialogTrigger>
            );
          })
        ) : (
          <MonstersSkeleton />
        )}
      </div>

      <div className="flex flex-col items-center sm:flex-row sm:justify-between w-full mt-16">
        <Link href="/" className="order-2 sm:order-1">
          <Button className="w-56 text-2xl mb-5 py-6 bg-pink-700">Home</Button>
        </Link>
        <Link
          href={`/settings?game_id=${game?.id}`}
          className="order-1  sm:order-2"
        >
          <Button className="w-56 text-2xl mb-5 py-6 bg-pink-700 cursor-pointer">
            Settings
          </Button>
        </Link>
      </div>

      <ScoreDialog
        logs={
          selectedMonster &&
          logsPerMonster &&
          logsPerMonster[selectedMonster.id]
        }
      />
    </Dialog>
  );
}
