import { useMutation } from "@tanstack/react-query";

import { Log, MonsterState, MonsterWithHp } from "../../types";
import { postLog, putLog, deleteLogs, deleteLog } from "./requests";
import { UUID } from "crypto";

export const usePostLogMutation = ({
  onSuccess,
}: {
  onSuccess?: (log: Log) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      state,
      gameId,
    }: {
      state: MonsterState[];
      gameId: UUID;
    }) => {
      return postLog({
        state,
        gameId,
      });
    },
    onSuccess,
  });
};

export const usePutLogMutation = ({
  onSuccess,
}: {
  onSuccess?: (log: Log) => void;
}) => {
  return useMutation({
    mutationFn: async ({ id, state }: { id: UUID; state: MonsterState[] }) => {
      return putLog({
        id,
        state,
      });
    },
    onSuccess,
  });
};

export const useDeleteLogMutation = ({
  onSuccess,
}: {
  onSuccess: (id: UUID) => void;
}) => {
  return useMutation({
    mutationFn: async ({ id }: { id: UUID }) => {
      return deleteLog(id);
    },
    onSuccess,
  });
};

export const useDeleteLogsMutation = ({
  onSuccess,
}: {
  onSuccess?: (id: UUID) => void;
}) => {
  return useMutation({
    mutationFn: async ({ gameId }: { gameId: UUID }) => {
      return deleteLogs(gameId);
    },
    onSuccess,
  });
};
