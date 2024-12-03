import Kanban from "../../components/Kanban";
import Modal from "../../components/Kanban/Modal";
import { BodyWrapper } from "../Home";

const KanbanPage = () => {
  return (
    <BodyWrapper>
      <Modal />
      <Kanban />
    </BodyWrapper>
  );
};

export default KanbanPage;
