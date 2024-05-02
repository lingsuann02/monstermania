import { Monster } from "../../types";
import { request } from "../utils";
import { UUID } from "crypto";

export const getAllMonsters = (): Promise<Monster[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/monsters`;
  return request({
    url,
    method: "GET",
  });
};

export const getMonster = (id: UUID): Promise<Monster> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/monster/${id}`;
  return request({
    url,
    method: "GET",
  });
};

export const deleteMonster = (id: UUID): Promise<UUID> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/monster/${id}`;
  return request({
    url,
    method: "DELETE",
  });
};

export const putMonster = ({
  id,
  name,
  type,
  color,
}: {
  id: UUID;
  name: string;
  type: string;
  color: string;
}): Promise<Monster> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/monster/${id}`;
  return request({
    url,
    method: "PUT",
    data: {
      id,
      name,
      type,
      color,
    },
  });
};

export const postMonster = ({
  name,
  type,
  color,
}: {
  name: string;
  type: string;
  color: string;
}): Promise<Monster> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/monster`;
  return request({
    url,
    method: "POST",
    data: {
      name,
      type,
      color,
    },
  });
};
