import { DndContext, DragEndEvent } from "@dnd-kit/core";
import TaskTable from "../../components/TaskTable";

const TaskTablePage = () => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      console.log(`Dropped ${active.id} into ${over.id}`);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <TaskTable />;
    </DndContext>
  );
};

export default TaskTablePage;
