import express from "express";
import {
  addNewSubscriber,
  deleteSubscriber,
  getAllSubscribers,
  updateSubscriber,
} from "../controllers/subscribers.controller.js";

const subscriberRouter = express.Router();

subscriberRouter.post("/add", addNewSubscriber);
subscriberRouter.get("/", getAllSubscribers);
subscriberRouter.patch("/:id", updateSubscriber);
subscriberRouter.delete("/:id", deleteSubscriber);

export default subscriberRouter;
