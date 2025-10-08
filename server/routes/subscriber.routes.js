import express from "express";
import { addNewSubscriber, getAllSubscribers } from "../controllers/subscribers.controller.js";

const subscriberRouter = express.Router();

subscriberRouter.post("/add", addNewSubscriber);

subscriberRouter.get("/", getAllSubscribers)

export default subscriberRouter;
