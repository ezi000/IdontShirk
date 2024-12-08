import MuiModal from "@mui/material/Modal";
import styled from "styled-components";
import { useState } from "react";
import DefaultButton from "../../DefaultButton";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../tasksSlice";
import { Task } from "../types";
import axios from "axios";
import selectUser from "../../Authentication/selectUser";
import { Guid } from "guid-typescript";

const AddTaskModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const formik = useFormik<Task>({
    initialValues: {
      id: "",
      title: "",
      description: "",
      status: "TODO",
      assignee: "NONE",
    },
    onSubmit: async (task) => {
      const taskId = Guid.raw();
      dispatch(
        addTask({
          id: taskId,
          title: task.title,
          description: task.description,
          status: task.status,
          assignee: task.assignee,
        })
      );
      const response = await axios.post("http://localhost:5050/task/add", {
        id: taskId,
        title: task.title,
        description: task.description,
        status: task.status,
        assignee: task.assignee,
      });
      response && handleClose();
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
            <label>
              Title:
              <input
                type="text"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
              />
            </label>
            <label>
              Assignee:
              <input
                type="text"
                name="assignee"
                onChange={formik.handleChange}
                value={formik.values.assignee}
              />
            </label>
            <DefaultButton type="submit">Submit</DefaultButton>
          </StyledForm>
        </Content>
      </MuiModal>
    </>
  );
};

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
  background-color: white;
  border: 2px solid #000;
  border-radius: 16px;
  box-shadow: 24px;
  padding: 16px;
`;

export default AddTaskModal;
