import { atom } from "recoil";
import { getData } from "./../helpers";

export const todoListState = atom({
  key: "todoListState",
  default: getData("todo") || [],
});
