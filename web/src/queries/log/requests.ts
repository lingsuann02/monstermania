import { Log, Monster, MonsterState } from "../../types";
import { request } from "../utils";
import { UUID } from "crypto";

export const getLogs = (gameId: UUID): Promise<Log[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/logs/${gameId}`;
  return request({
    url,
    method: "GET",
  });
};

export const getLog = (id: UUID): Promise<Log> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/log/${id}`;
  return request({
    url,
    method: "GET",
  });
};

export const deleteLog = (id: UUID): Promise<UUID> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/log/${id}`;
  return request({
    url,
    method: "DELETE",
  });
};

export const deleteLogs = (gameId: UUID): Promise<UUID> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/logs/${gameId}`;
  return request({
    url,
    method: "DELETE",
  });
};

export const putLog = ({
  id,
  state,
}: {
  id: UUID;
  state: MonsterState[];
}): Promise<Log> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/log/${id}`;
  return request({
    url,
    method: "PUT",
    data: {
      id,
      state,
    },
  });
};

export const postLog = ({
  state,
  gameId,
}: {
  state: MonsterState[];
  gameId: UUID;
}): Promise<Log> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/log`;
  return request({
    url,
    method: "POST",
    data: {
      state,
      gameId,
    },
  });
};
