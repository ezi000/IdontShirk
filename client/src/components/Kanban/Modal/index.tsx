import MuiModal from "@mui/material/Modal";
import styled from "styled-components";
import { useState } from "react";
import DefaultButton from "../../DefaultButton";

const Modal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <DefaultButton onClick={handleOpen}>Add new</DefaultButton>
      <MuiModal open={open} onClose={handleClose}>
        <Content>
          <h2>Modal Title</h2>
          <p>adsjnjnasdnjads</p>
        </Content>
      </MuiModal>
    </>
  );
};

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 16px;
`;

export default Modal;
