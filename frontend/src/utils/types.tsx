import { ReactNode } from "react";

export type Address = {
  id: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
};

export interface User {
  name: string;
  email: string;
  id: string;
  address: {
    street: string;
    state: string;
    city: string;
    zipcode: string;
  };
}

export type PaginatedUsersResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CardProp = {
  id: string;
  title: string;
  post: string;
  onDelete: (id: string) => void;
};

export type ModalProp = {
  show: boolean;
  toggleModal: () => void;
  ifClose?: boolean;
  children: ReactNode;
};

export type PostProp = {
  toggleModal: () => void;
};

export type Post = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
};

export type FormData = {
  title: string;
  body: string;
};

export const MAX_TITLE_LENGTH = 50;
export const MAX_BODY_LENGTH = 1000;
