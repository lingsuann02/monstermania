import { useMutation } from "@tanstack/react-query";

import { Game } from "../../types";
import { postGame, putGame, deleteGame } from "./requests";
import { UUID } from "crypto";

export const usePostGameMutation = ({
  onSuccess,
}: {
  onSuccess?: (game: Game) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      name,
      snacks,
      poisonRate,
      monster_ids,
      settings,
    }: {
      name?: string;
      snacks?: UUID[];
      poisonRate?: number;
      monster_ids: UUID[];
      settings?: unknown;
    }) => {
      return postGame({
        name,
        snacks,
        poisonRate,
        monster_ids,
        settings,
      });
    },
    onSuccess,
  });
};

export const usePutGameMutation = ({
  onSuccess,
}: {
  onSuccess?: (game: Game) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      id,
      name,
      snacks,
      poisonRate,
      monster_ids,
      settings,
    }: {
      id: UUID;
      name?: string;
      snacks?: UUID[];
      poisonRate?: number;
      monster_ids?: UUID[];
      settings?: unknown;
    }) => {
      return putGame({
        id,
        name,
        snacks,
        poisonRate,
        monster_ids,
        settings,
      });
    },
    onSuccess,
  });
};

export const useDeleteGameMutation = ({
  onSuccess,
}: {
  onSuccess: (id: UUID) => void;
}) => {
  return useMutation({
    mutationFn: async ({ id }: { id: UUID }) => {
      return deleteGame(id);
    },
    onSuccess,
  });
};
