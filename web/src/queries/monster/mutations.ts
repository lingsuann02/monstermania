import { useMutation } from "@tanstack/react-query";

import { Monster } from "../../types";
import { postMonster, putMonster, deleteMonster } from "./requests";
import { UUID } from "crypto";

export const usePostMonsterMutation = ({
  onSuccess,
}: {
  onSuccess: (monster: Monster) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      name,
      type,
      color,
    }: {
      name: string;
      type: string;
      color: string;
    }) => {
      return postMonster({
        name,
        type,
        color,
      });
    },
    onSuccess,
  });
};

export const usePutMonsterMutation = ({
  onSuccess,
}: {
  onSuccess: (monster: Monster) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      id,
      name,
      type,
      color,
    }: {
      id: UUID;
      name: string;
      type: string;
      color: string;
    }) => {
      return putMonster({
        id,
        name,
        type,
        color,
      });
    },
    onSuccess,
  });
};

export const useDeleteMonsterMutation = ({
  onSuccess,
}: {
  onSuccess: (id: UUID) => void;
}) => {
  return useMutation({
    mutationFn: async ({ id }: { id: UUID }) => {
      return deleteMonster(id);
    },
    onSuccess,
  });
};
