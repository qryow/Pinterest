import { ReactNode } from "react";
import { OneUser } from "./types";

export enum authEnum {
  register = 'register',
  login = 'login'
}

export interface ModalProps {
  active: boolean;
  setActive: (isActive: boolean) => void;
  authName?: authEnum
  setDescModal?: (isActive: boolean) => void
  oneUser?: OneUser | null;
}

export interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode
}