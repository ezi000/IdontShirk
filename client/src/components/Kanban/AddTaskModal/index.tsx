import MuiModal from "@mui/material/Modal";
import styled from "styled-components";
import { useState } from "react";
import DefaultButton from "../../DefaultButton";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../tasksSlice";
import { Task } from "../types";
import axios from "axios";
import { Guid } from "guid-typescript";
import selectUser from "../../Authentication/selectUser";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";

const AddTaskModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const validationSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    timeGoal: z
      .number()
      .min(1, "Time Goal must be at least 1 minute")
      .nonnegative("Time Goal must be a positive number"),
  });

  const formik = useFormik<Task>({
    initialValues: {
      id: "",
      title: "",
      description: "",
      status: "TODO",
      userId: "",
      timeSpent: 0,
      timeGoal: 0,
      completed: false,
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: async (task) => {
      const taskId = Guid.raw();
      dispatch(
        addTask({
          id: taskId,
          title: task.title,
          description: task.description,
          status: task.status,
          userId: user.id,
          timeSpent: 0,
          timeGoal: task.timeGoal,
          completed: false,
        })
      );
      const response = await axios.post("http://localhost:5050/task/add", {
        id: taskId,
        title: task.title,
        description: task.description,
        status: task.status,
        completed: false,
        userId: user.id,
        timeSpent: 0,
        timeGoal: task.timeGoal,
      });

      if (response) {
        handleClose();
        formik.resetForm();
      }
    },
  });

  return (
    <>
      <ButtonWrapper>
        <DefaultButton onClick={handleOpen}>Add new</DefaultButton>
      </ButtonWrapper>
      <MuiModal open={open} onClose={handleClose}>
        <Content>
          <h2>Add New Task</h2>
          <StyledForm onSubmit={formik.handleSubmit}>
            <StyledLabel>
              Title
              <StyledTextField
                type="text"
                name="title"
                size="small"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
            </StyledLabel>
            <StyledLabel>
              Description
              <StyledTextField
                multiline
                size="small"
                value={formik.values.description}
                onChange={formik.handleChange}
                name="description"
                rows={4}
              />
            </StyledLabel>
            <StyledLabel>
              Time Goal (minutes)
              <StyledTextField
                type="number"
                size="small"
                name="timeGoal"
                onChange={formik.handleChange}
                value={formik.values.timeGoal}
              />
            </StyledLabel>
            <SubmitButton type="submit">Submit</SubmitButton>
          </StyledForm>
        </Content>
      </MuiModal>
    </>
  );
};

const SubmitButton = styled(DefaultButton)`
  && {
    width: 100%;
    margin-top: 16px;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  gap: 16px;
  width: 100%;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border-radius: 8px;
  max-width: 220px;
  background-color: #f5f5f5;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 24px 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #495057;
  border-radius: 16px;
  box-shadow: 24px;
  padding: 16px;
`;

export default AddTaskModal;
