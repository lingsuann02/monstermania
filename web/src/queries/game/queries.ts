import { getAllGames, getGame } from "./requests";
import { useQueryWrapper } from "../utils";
import { UUID } from "crypto";

export const useGetAllGamesQuery = () => {
  return useQueryWrapper({
    queryKey: ["allGames"],
    queryFn: async () => {
      return getAllGames();
    },
  });
};

export const useGetGameQuery = (id: UUID) => {
  return useQueryWrapper({
    queryKey: ["game", id],
    queryFn: async () => {
      if (!id) {
        // hack to prevent querying the API when there is no id
        return Promise.resolve();
      }
      return getGame(id);
    },
  });
};
