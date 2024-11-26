import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection";

const router = express.Router();
const collection = db.collection("users");

router.post("/me", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const userFound = await collection.findOne({ id: req.body.id });
    res.send(userFound).status(200);
  } catch (error) {
    res.send("User not found").status(500);
  }
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

router.post("/add", async (req: Request<RequestData>, res: Response) => {
  try {
    const newUser: UserRequest = {
      id: req.body.user.id,
      email: req.body.user.email,
      verified_email: req.body.user.verified_email,
      name: req.body.user.name,
      given_name: req.body.user.given_name,
      family_name: req.body.user.family_name,
      picture: req.body.user.picture,
      loginToken: req.body.userToken,
    };
    const userFound = await collection.findOne({ id: newUser.id });
    if (!userFound) {
      const results = await collection.insertOne(newUser);
      res.send(results).status(201);
    }
  } catch (error) {
    res.send("Error creating record").status(500);
  }
});

type UserRequest = {
  id: ObjectId;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  loginToken: string;
};

type RequestData = {
  user: UserRequest;
  userToken: string;
};

export default router;
