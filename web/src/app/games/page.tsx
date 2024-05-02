"use client";

import { Button } from "@/components/ui/button";
import { useGetAllGamesQuery } from "@/queries/game";
import Link from "next/link";
import { MonstersSkeleton } from "../_components/monstersSkeleton";

export default function Games() {
  const { fetch: fetchGames } = useGetAllGamesQuery();
  const {
    data: games = [],
    isLoading: isGamesLoading,
    isFetched: isGamesFetched,
  } = fetchGames();

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl font-medium mb-5">Load Previous Game</h1>
      </div>
      <div className="flex flex-wrap justify-center w-full p-8 bg-amber-100 grow">
        {!isGamesFetched ? (
          <MonstersSkeleton />
        ) : (
          games.map((game) => {
            return (
              <Link key={game.id} href={`/new?game_id=${game.id}`}>
                <Button
                  variant="outline"
                  className={"w-72 h-72 flex flex-col items-center m-2"}
                >
                  <div className="flex flex-col h-full py-10">
                    <div className="grow">
                      <h3 className="font-bold text-xl">{game.name}</h3>
                      <ul>
                        {game?.monsters?.map((monster) => (
                          <li key={monster.id}>{monster.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grow-0">
                      <Button className="whitespace-pre">Load</Button>
                    </div>
                  </div>
                </Button>
              </Link>
            );
          })
        )}
      </div>
      <div className="flex w-full mt-16">
        <Link className="w-56" href="/">
          <Button className="w-full text-2xl mb-5 py-6 bg-pink-700">
            Home
          </Button>
        </Link>
      </div>
    </>
  );
}
