"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/inputError";
import { Label } from "@/components/ui/label";
import { useGetGameQuery, usePutGameMutation } from "@/queries/game";
import { useGetLogsQuery } from "@/queries/log";
import { useDeleteLogsMutation } from "@/queries/log/mutations";
import { UUID } from "crypto";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Settings() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gameId = searchParams.get("game_id") as UUID;
  const { fetch: fetchGame, refetch: refetchGame } = useGetGameQuery(gameId);
  const { invalidate: invalidateLogs } = useGetLogsQuery(gameId);
  const { data: game, isFetched: isGameFetched } = fetchGame();

  const deleteLog = useDeleteLogsMutation({});

  const updateGame = usePutGameMutation({
    onSuccess: async (game) => {
      refetchGame();
      invalidateLogs();
      router.push(`/play?game_id=${game.id}`);
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    register,
  } = useForm<{
    startingHp: number;
    snack1: number;
    snack2: number;
    snack3: number;
    poisonPercentage: number;
  }>();

  useEffect(() => {
    if (isGameFetched && game) {
      setValue("snack1", game?.settings?.snack1 || 0);
      setValue("snack2", game?.settings?.snack2 || 1);
      setValue("snack3", game?.settings?.snack3 || 2);
      setValue("poisonPercentage", game?.settings?.poisonPercentage || 20);
      setValue("startingHp", game?.settings?.startingHp || 20);
    }

    if (isGameFetched && !game) {
      router.push("");
    }
    return () => {};
  }, [game, isGameFetched, router, setValue]);

  const saveSettings = async ({
    startingHp,
    snack1,
    snack2,
    snack3,
    poisonPercentage,
  }: {
    startingHp: number;
    snack1: number;
    snack2: number;
    snack3: number;
    poisonPercentage: number;
  }) => {
    if (game) {
      // Delete the logs to restart the game if the starting HP is changed
      if (game.settings?.startingHp != startingHp) {
        await deleteLog.mutate({ gameId: game.id });
      }
      updateGame.mutate({
        id: game.id,
        settings: {
          startingHp,
          snack1,
          snack2,
          snack3,
          poisonPercentage,
        },
      });
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl font-medium mb-5">
          Configure your game
        </h1>
      </div>

      <form onSubmit={handleSubmit(saveSettings)}>
        <div className="w-full bg-amber-100">
          <div className="flex my-5">
            <Label htmlFor="startingHp" className="text-xl">
              Max HP
            </Label>
            <div className="ml-5 flex flex-col">
              <Input
                {...register("startingHp", {
                  required: { value: true, message: "Required field" },
                  valueAsNumber: true,
                  max: { value: 100, message: "Max HP is 100" },
                  min: { value: 20, message: "Min HP is 20" },
                  value: getValues("startingHp"),
                })}
                type="number"
                className="w-40"
              ></Input>
              {errors.startingHp && (
                <InputError>{errors.startingHp.message}</InputError>
              )}
            </div>
          </div>

          <h2 className="text-xl mt-10">
            Our monsters need to eat snacks to survive! How much nutritional
            value do our snacks provide?
          </h2>

          <div className="flex my-5">
            <Label htmlFor="banana" className="text-xl">
              Banana
            </Label>
            <div className="ml-5 flex flex-col">
              <Input
                {...register("snack1", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  valueAsNumber: true,
                  max: {
                    value: 100,
                    message: "Max nutritional value is 100",
                  },
                  min: { value: 0, message: "Min nutritional value is 0" },
                  value: getValues("snack1"),
                })}
                className="w-40"
                type="number"
              ></Input>
              {errors.snack1 && (
                <InputError>{errors.snack1.message}</InputError>
              )}
            </div>
          </div>

          <div className="flex mb-5">
            <Label htmlFor="apple" className="text-xl">
              Apple
            </Label>
            <div className="ml-5 flex flex-col">
              <Input
                {...register("snack2", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  valueAsNumber: true,
                  max: {
                    value: 100,
                    message: "Max nutritional value is 100",
                  },
                  min: { value: 0, message: "Min nutritional value is 0" },
                  value: getValues("snack2"),
                })}
                className="w-40"
                type="number"
              ></Input>
              {errors.snack2 && (
                <InputError>{errors.snack2.message}</InputError>
              )}
            </div>
          </div>

          <div className="flex mb-5">
            <Label htmlFor="strawberry" className="text-xl">
              Strawberry
            </Label>
            <div className="ml-5 flex flex-col">
              <Input
                {...register("snack3", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  valueAsNumber: true,
                  max: {
                    value: 100,
                    message: "Max nutritional value is 100",
                  },
                  min: { value: 0, message: "Min nutritional value is 0" },
                  value: getValues("snack3"),
                })}
                className="w-40"
                type="number"
              ></Input>
              {errors.snack3 && (
                <InputError>{errors.snack3.message}</InputError>
              )}
            </div>
          </div>

          <div className="flex my-5">
            <Label htmlFor="poisonPercentage" className="text-xl">
              % Chance of poison ;)
            </Label>
            <div className="ml-5 flex flex-col">
              <Input
                {...register("poisonPercentage", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  valueAsNumber: true,
                  max: { value: 100, message: "Max is 100" },
                  min: { value: 0, message: "Min is 0" },
                  value: getValues("poisonPercentage"),
                })}
                className="w-40"
                type="number"
              ></Input>
              {errors.poisonPercentage && (
                <InputError>{errors.poisonPercentage.message}</InputError>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:justify-between w-full mt-16">
          <Link className="w-56 order-2  sm:order-1" href="/">
            <Button className="w-full text-2xl mb-5 py-6 bg-pink-700">
              Home
            </Button>
          </Link>
          <Button
            type="submit"
            className="w-56 order-1  sm:order-2 text-2xl mb-5 py-6 bg-pink-700 cursor-pointer"
            isLoading={updateGame.isPending || deleteLog.isPending}
          >
            Play!
          </Button>
        </div>
      </form>
    </>
  );
}
