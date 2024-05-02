import { getAllMonsters, getMonster } from "./requests";
import { useQueryWrapper } from "../utils";
import { UUID } from "crypto";

export const useGetAllMonstersQuery = () => {
  return useQueryWrapper({
    queryKey: ["allMonsters"],
    queryFn: async () => {
      return getAllMonsters();
    },
  });
};

export const useGetMonsterQuery = (id: UUID) => {
  return useQueryWrapper({
    queryKey: ["game", id],
    queryFn: async () => {
      return getMonster(id);
    },
  });
};
