import mongoose from "mongoose";
import { isValidEmail } from "../utils/validateEmail.js";
import subscriber from "../models/subscriber.model.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await subscriber.find().sort({ createdAt: 1 });

    if (!subscribers || subscribers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Not found any subscribers",
      });
    }
    res.status(200).json({
      success: true,
      message: "Sent the list of all subscribers",
      data: subscribers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting subscribers" });
  }
};

export const addNewSubscriber = async (req, res) => {
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
};

export const updateSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid subscriber id" });
    }

    const { name, email, phone, messages } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (messages !== undefined) {
      if (!Array.isArray(messages)) {
        return res.status(400).json({ message: "messages must be an array" });
      }
      updates.messages = messages;
    }
    if (email !== undefined) {
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Please provide a valid E-mail" });
      }
      const duplicate = await subscriber.findOne({
        email,
        _id: { $ne: id },
      });
      if (duplicate) {
        return res.status(409).json({
          message: "That email is already used by another subscriber",
        });
      }
      updates.email = email;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updated = await subscriber.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscriber updated",
      data: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid subscriber id" });
    }

    const deleted = await subscriber.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscriber deleted",
      data: deleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting subscriber" });
  }
};