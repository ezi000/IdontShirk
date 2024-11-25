import { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultButton from "../DefaultButton";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const isTimerAtZero = hours === 0 && minutes === 0 && seconds === 0;

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

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

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
        <StyledButton
          onClick={isRunning ? stopTimer : startTimer}
          $pressed={isRunning}
          bgColor={isRunning ? "#bc4749" : "#6a994e"}
          textColor="white"
        >
          {isRunning ? "Stop" : "Start"}
        </StyledButton>
        <StyledButton
          onClick={resetTimer}
          bgColor="gray"
          textColor="white"
          $pressed={isTimerAtZero}
          disabled={isTimerAtZero}
        >
          Reset
        </StyledButton>
      </ButtonsContainer>
    </TimerContainer>
  );
};

const StyledH1 = styled.h1`
  font-size: 48px;
  margin: 0;
  color: white;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  height: 40px;
  align-items: flex-end;
`;

const StyledButton = styled(DefaultButton)<{
  $pressed?: boolean;
}>`
  && {
    font-family: "Geist Mono", monospace;
    border-bottom: ${(p) =>
      p.$pressed ? "2px solid transparent" : "2px solid #2c2c2c"};
    height: ${(p) => (p.$pressed ? "30px" : "32px")};
    width: 80px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }
`;

export default Timer;
