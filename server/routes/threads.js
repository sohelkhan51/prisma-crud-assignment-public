
import express from "express";
import prisma from "../prisma/client.js";

const router = express.Router();

// GET — fetch all threads
router.get("/", async (req, res, next) => {
  try {
    const threads = await prisma.thread.findMany();
    res.json(threads);
  } catch (error) {
    next(error);
  }
});

// POST — create a new thread
router.post("/", async (req, res, next) => {
  try {
    const thread = await prisma.thread.create({
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });

    res.status(201).json(thread);
  } catch (error) {
    next(error);
  }
});

// PUT — update an existing thread
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const thread = await prisma.thread.update({
      where: { id },
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });

    res.json(thread);
  } catch (error) {
    next(error);
  }
});

// DELETE — delete a thread
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const deleted = await prisma.thread.delete({
      where: { id },
    });

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

export default router;
