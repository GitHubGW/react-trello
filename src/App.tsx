import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredMinutesState, millisecondsState, minutesState, secondsState } from "./atom";
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  const [minutes, setMinutes] = useRecoilState<number>(minutesState);
  const [hours, setHours] = useRecoilState<number>(filteredMinutesState);
  const seconds = useRecoilValue<number>(secondsState);
  const milliseconds = useRecoilValue<number>(millisecondsState);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setMinutes(+event.currentTarget.value);
  };

  const onHoursChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setHours(+event.currentTarget.value);
  };

  return (
    <div>
      <GlobalStyle />
      <form>
        <div>
          Hours: <input value={hours} onChange={onHoursChange} type="number" placeholder="Hours" />
        </div>
        <div>
          Minutes: <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes" />
        </div>
        <div>
          Seconds: <input value={seconds} readOnly type="number" placeholder="Hours" />
        </div>
        <div>
          Milliseconds: <input value={milliseconds} readOnly type="number" placeholder="Hours" />
        </div>
      </form>
    </div>
  );
};

export default App;
