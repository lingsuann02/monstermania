import { getLogs, getLog } from "./requests";
import { useQueryWrapper } from "../utils";
import { UUID } from "crypto";

export const useGetLogsQuery = (gameId: UUID) => {
  return useQueryWrapper({
    queryKey: ["logs", gameId],
    queryFn: async () => {
      return getLogs(gameId);
    },
  });
};

export const useGetLogQuery = (id: UUID) => {
  return useQueryWrapper({
    queryKey: ["game", id],
    queryFn: async () => {
      return getLog(id);
    },
  });
};
