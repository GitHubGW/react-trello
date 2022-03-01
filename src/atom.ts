import { atom, DefaultValue, RecoilState, selector } from "recoil";

export const minutesState: RecoilState<number> = atom({ key: "minutesState", default: 0 });
export const secondsState: RecoilState<number> = atom({ key: "secondsState", default: 0 });
export const millisecondsState: RecoilState<number> = atom({ key: "millisecondsState", default: 0 });

export const filteredMinutesState: RecoilState<number> = selector({
  key: "filteredMinutesState",
  get: ({ get }): number => {
    const minutes: number = get(minutesState);
    const hours: number = minutes / 60;
    return hours;
  },
  set: ({ set }, newValue: number | DefaultValue): void => {
    set(minutesState, Number(newValue) * 60);
    set(secondsState, Number(newValue) * 3600);
    set(millisecondsState, Number(newValue) * 3600000);
  },
});
