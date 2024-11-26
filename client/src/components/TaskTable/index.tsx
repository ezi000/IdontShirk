import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";

const TaskTable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "unique-id",
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const { setNodeRef: setFirstDroppableRef } = useDroppable({
    id: "droppable-1",
  });

  return (
    <>
      <Draggable ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <DraggableContent>Drag me!</DraggableContent>
      </Draggable>

      <DropZoneWrapper>
        <DropZone ref={setFirstDroppableRef} />
      </DropZoneWrapper>
    </>
  );
};

const Draggable = styled.div`
  cursor: grab;
`;
const DraggableContent = styled.div`
  border: 1px solid red;
  width: 80px;
  height: 80px;
`;

const DropZoneWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  justify-content: center;
`;

const DropZone = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

export default TaskTable;
