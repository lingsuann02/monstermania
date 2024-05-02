import { Game } from "../../types";
import { request } from "../utils";
import { UUID } from "crypto";

export const getAllGames = (): Promise<Game[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/games`;
  return request({
    url,
    method: "GET",
  });
};

export const getGame = (id: UUID): Promise<Game> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/game/${id}`;
  return request({
    url,
    method: "GET",
  });
};

export const deleteGame = (id: UUID): Promise<UUID> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/game/${id}`;
  return request({
    url,
    method: "DELETE",
  });
};

export const putGame = ({
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
}): Promise<Game> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/game/${id}`;
  return request({
    url,
    method: "PUT",
    data: {
      id,
      name,
      snacks,
      poisonRate,
      monster_ids,
      settings,
    },
  });
};

export const postGame = ({
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
}): Promise<Game> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/games`;
  return request({
    url,
    method: "POST",
    data: {
      name,
      snacks,
      poisonRate,
      monster_ids,
      settings,
    },
  });
};
