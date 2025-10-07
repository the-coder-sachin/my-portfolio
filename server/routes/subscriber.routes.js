import express from "express";
import { isValidEmail } from "../utils/validateEmail.js";
import subscriber from "../models/subscriber.model.js";

const subscriberRouter = express.Router();

subscriberRouter.post("/add", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide your E-mail" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid E-mail" });
    }

    const existingSubscriber = await subscriber.findOne({ email });

    if (existingSubscriber) {
      existingSubscriber.messages.push(message || "");

      await existingSubscriber.save();

      res.status(200).json({
        success: true,
        message: "New message added to existing subscriber",
        data: existingSubscriber,
      });
    } else {
      const newSubscriber = await subscriber.create({
        name,
        email,
        phone,
        messages: [message || ""],
      });

      res.status(201).json({
        success: true,
        message: "Thanks for subscribing!",
        data: newSubscriber,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default subscriberRouter;
