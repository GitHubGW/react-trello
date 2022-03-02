import { atom } from "recoil";

export const todosState = atom({ key: "todosState", default: ["study", "coding", "eat", "dance", "play"] });
