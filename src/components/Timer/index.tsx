import { useEffect, useState } from "react";
import DefaultButton from "../DefaultButton";
import styled from "styled-components";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setSeconds(0);
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setMinutes(0);
                setHours((prevHours) => prevHours + 1);
                return 0;
              } else {
                return prevMinutes + 1;
              }
            });
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <TimerContainer>
      <StyledH1>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </StyledH1>
      <ButtonsContainer>
        <DefaultButton color="warning" onClick={startTimer}>
          Start
        </DefaultButton>
        <DefaultButton onClick={stopTimer}>Stop</DefaultButton>
        <DefaultButton onClick={resetTimer}>Reset</DefaultButton>
      </ButtonsContainer>
    </TimerContainer>
  );
};

const StyledH1 = styled.h1`
  font-size: 48px;
  margin-bottom: 16px;
  color: white;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-top: 32px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export default Timer;
