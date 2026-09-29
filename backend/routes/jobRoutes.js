const express = require("express");
const Job = require("../models/model");
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();

// Add a new job
router.post("/", verifyToken, async (req, res) => {
  try {
    const job = new Job(req.body);

    const savedJob = await job.save();

    res.status(201).json({
      message: "Job added successfully",
      job: savedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add job",
      error: error.message,
    });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
});

// Get one job
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch job",
      error: error.message,
    });
  }
});

// Update a job
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update job",
      error: error.message,
    });
  }
});

// Delete a job
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job",
      error: error.message,
    });
  }
});

module.exports = router;