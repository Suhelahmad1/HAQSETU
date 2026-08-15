const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Story = require("./models/Story");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB (Serverless-friendly check)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// GET all stories
app.get("/api/stories", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

// POST new story
app.post("/api/stories", async (req, res) => {
  try {
    const { title, category, body } = req.body;
    const newStory = new Story({ title, category, body });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ error: "Failed to create story" });
  }
});

// PUT vote update
app.put("/api/stories/:id/vote", async (req, res) => {
  try {
    const { id } = req.params;
    const { currentVote, previousVote } = req.body;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Purana vote subtract karo
    if (previousVote === "up")
      story.upvotes = Math.max(0, (story.upvotes || 0) - 1);
    if (previousVote === "down")
      story.downvotes = Math.max(0, (story.downvotes || 0) - 1);

    // Naya vote add karo
    if (currentVote === "up") story.upvotes = (story.upvotes || 0) + 1;
    if (currentVote === "down") story.downvotes = (story.downvotes || 0) + 1;

    const updatedStory = await story.save();
    return res.json(updatedStory);
  } catch (err) {
    console.error("Voting DB Error:", err);
    return res.status(500).json({ error: "Failed to update vote" });
  }
});

// Vercel Serverless Function ke liye export (No app.listen needed)
module.exports = app;
