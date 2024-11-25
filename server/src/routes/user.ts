import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection";

const router = express.Router();
const collection = db.collection("users");

router.get("/", async (res: Response) => {
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req: Request, res: Response) => {
  const query = { _id: ObjectId.createFromTime(parseInt(req.params.id)) };
  const results = await collection.findOne(query);
  if (!results) {
    res.send("Record not found").status(404);
    return;
  }
  res.send(results).status(200);
});

router.post("/add", async (req: Request<RequestData>, res: Response) => {
  try {
    const newUser: UserRequest = {
      _id: req.body.user.id,
      email: req.body.user.email,
      verified_email: req.body.user.verified_email,
      name: req.body.user.name,
      given_name: req.body.user.given_name,
      family_name: req.body.user.family_name,
      picture: req.body.user.picture,
      loginToken: req.body.userToken,
    };
    const userFound = await collection.findOne({ _id: newUser._id });
    if (!userFound) {
      const results = await collection.insertOne(newUser);
      res.send(results).status(201);
    }
  } catch (error) {
    res.send("Error creating record").status(500);
  }
});

type UserRequest = {
  _id: ObjectId;
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
