import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection";

const router = express.Router();
const collection = db.collection("tasks");

router.get("/", async (_req: Request, res: Response) => {
  const results = await collection.find().toArray();
  if (!results) {
    res.send("No tasks found").status(404);
    return;
  }
  res.send(results).status(200);
});

router.get("/:id", async (req: Request, res: Response) => {
  const results = await collection.findOne({
    id: new ObjectId(req.params.id),
  });
  if (!results) {
    res.send("Record not found").status(404);
    return;
  }
  res.send(results).status(200);
});

router.post("/add", async (req: Request<Task>, res: Response) => {
  try {
    const newTask: Task = {
      id: req.body.id,
      status: req.body.status,
      title: req.body.title,
      description: req.body.description,
      assignee: req.body.assignee,
    };
    const taskFound = await collection.findOne({ id: newTask.id });
    if (!taskFound) {
      const results = await collection.insertOne(newTask);
      res.send(results).status(201);
    }
  } catch (error) {
    res.send("Error creating record").status(500);
  }
});

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
  assignee: string;
};

export default router;
