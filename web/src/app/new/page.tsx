"use client";

import { Button } from "@/components/ui/button";
import {
  useGetGameQuery,
  usePostGameMutation,
  usePutGameMutation,
} from "@/queries/game";
import { useGetAllMonstersQuery } from "@/queries/monster";
import { Game, Monster } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UUID } from "crypto";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MonsterCard } from "../_components/monsterCard";
import { MonstersSkeleton } from "../_components/monstersSkeleton";

export default function New() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gameId = searchParams.get("game_id") as UUID;
  const { fetch: fetchGame } = useGetGameQuery(gameId);
  const { fetch: fetchMonsters } = useGetAllMonstersQuery();
  const [name, setName] = useState("My new game");
  const { data: monsters = [], isFetched: isMonstersFetched } = fetchMonsters();
  const { data: game, isFetched: isGameFetched } = fetchGame();
  const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]);
  const maxMonstersPicked = selectedMonsters.length === 5;

  useEffect(() => {
    if (game && game.monsters) {
      setSelectedMonsters(game.monsters);
    }
  }, [isGameFetched, isMonstersFetched, game]);

  const onMonsterSelected = (monster: Monster) => {
    const isSelected = selectedMonsters.find(
      (_selectedMonster) => _selectedMonster.name === monster.name
    );
    if (isSelected) {
      setSelectedMonsters((_selectedMonsters) =>
        _selectedMonsters.filter(
          (_selectedMonster) => _selectedMonster.name != monster.name
        )
      );
      return;
    }
    if (!maxMonstersPicked) {
      setSelectedMonsters((_selectedMonsters) => [
        ..._selectedMonsters,
        monster,
      ]);
    }
  };

  const createGame = usePostGameMutation({
    onSuccess: (game: Game) => {
      window.history.replaceState(null, "", `?game_id=${game.id}`);
      router.push(`/settings?game_id=${game.id}`);
    },
  });

  const updateGame = usePutGameMutation({
    onSuccess: (game: Game) => {
      router.push(`/settings?game_id=${game.id}`);
    },
  });

  const createOrUpdateGame = () => {
    if (game) {
      updateGame.mutate({
        monster_ids: selectedMonsters.map((monster) => monster.id),
        name,
        id: game.id,
      });
    } else {
      createGame.mutate({
        monster_ids: selectedMonsters.map((monster) => monster.id),
        name,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col sm:items-center px-4">
        <h2 className="text-3xl sm:text-5xl font-medium mb-5">
          Let&apos;s play Monster Mania!
        </h2>
        <div className="flex my-5 flex-col sm:flex-row">
          <Label htmlFor="name" className="text-xl sm:text-2xl">
            Name your game:
          </Label>
          <Input
            id="name"
            value={name}
            className="sm:ml-5 mt-2 sm:mt-0 w-46"
            onChange={(e) => {
              const value = e.currentTarget.value;
              setName(value);
            }}
          ></Input>
        </div>
      </div>

      <div className="w-full sm:p-2 bg-amber-100">
        <h3 className="text-xl sm:text-3xl mb-5 mt-10 sm:text-center">
          Pick up to 5 monsters to compete for survival!
        </h3>
        <div className="flex flex-wrap justify-center w-full">
          {!isMonstersFetched || !isGameFetched ? (
            <MonstersSkeleton />
          ) : (
            monsters.map((monster) => {
              const isSelected = selectedMonsters.find(
                (_selectedMonster) => _selectedMonster.name === monster.name
              );
              return (
                <MonsterCard
                  key={monster.id}
                  monster={monster}
                  onMonsterSelected={onMonsterSelected}
                  isSelectable={!maxMonstersPicked || isSelected ? true : false}
                  isSelected={!!isSelected}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:justify-between w-full mt-16">
        <Link passHref href="/">
          <Button className="w-56 text-2xl mb-5 py-6 bg-pink-700">Home</Button>
        </Link>
        <Button
          onClick={createOrUpdateGame}
          disabled={selectedMonsters.length < 2}
          className="w-56 text-2xl mb-5 py-6 bg-pink-700"
        >
          Next
        </Button>
      </div>
    </>
  );
}
