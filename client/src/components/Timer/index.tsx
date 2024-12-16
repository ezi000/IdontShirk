import { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultButton from "../DefaultButton";
import { useDispatch, useSelector } from "react-redux";
import selectTasks from "../Kanban/selectTasks";
import { updateTask } from "../Kanban/tasksSlice";
import axios from "axios";
import Confetti from "react-confetti";

const Timer = ({ selectedTaskId }: { selectedTaskId: string }) => {
  const tasks = useSelector(selectTasks);
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [confetti, setSonfetti] = useState(false);
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const dispatch = useDispatch();

  useEffect(() => {
    resetTimer();
    if (selectedTask) {
      selectedTask.timeSpent / 60 > 1
        ? setHours(selectedTask.timeSpent / 60)
        : setHours(0);
      setMinutes(selectedTask.timeSpent % 60);
      setSeconds(0);
    }
  }, [selectedTask?.id]);

  useEffect(() => {
    if (selectedTask) {
      if (selectedTask.timeSpent === selectedTask.timeGoal) {
        setIsRunning(false);
        dispatch(
          updateTask({
            ...selectedTask,
            completed: true,
            status: "DONE",
          })
        );
        axios.put("http://localhost:5050/task/update", {
          id: selectedTask.id,
          completed: true,
          status: "DONE",
        });
        setSonfetti(true);
        setTimeout(() => {
          setSonfetti(false);
        }, 5000);
      }
    }
    return () => {
      setSonfetti(false);
    };
  }, [selectedTask?.timeSpent]);

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
                if (selectedTask) {
                  dispatch(
                    updateTask({
                      ...selectedTask,
                      timeSpent: prevMinutes + 1,
                    })
                  );
                  axios.put("http://localhost:5050/task/update", {
                    id: selectedTask.id,
                    timeSpent: prevMinutes + 1,
                  });
                }
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
          disabled={!selectedTask}
        >
          {isRunning ? "Stop" : "Start"}
        </StyledButton>
        {!selectedTask && (
          <StyledP>Select a task to start tracking time spent on it.</StyledP>
        )}
      </ButtonsContainer>
      {selectedTask && selectedTask.completed && confetti && (
        <>
          <Overlay />
          <Confetti />
          <EndedTask>Task completed! 🎉</EndedTask>
        </>
      )}
    </TimerContainer>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const EndedTask = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 64px;
  background-color: #212529;
  color: #f5f5f5;
  align-items: center;
  padding: 16px;
  border-radius: 32px;
  position: absolute;
  z-index: 1;
  top: 56px;
`;

const StyledP = styled.p`
  position: absolute;
  width: 100%;
  bottom: -56px;
  color: #f5cb5c;
`;

const StyledH1 = styled.h1`
  font-size: 48px;
  margin: 0;
  color: white;
`;

const TimerContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-top: 64px; */
  padding-top: 64px;
  text-align: center;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  width: 100%;
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
