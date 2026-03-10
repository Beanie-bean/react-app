import express from "express";
import db from "./db/connect.js"
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all games in list
router.get("/", async (req, res) => {
  let collection = await db.collection("mygames");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//Add a new game to a list
router.post("/add", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      year: req.body.year
    };
    let collection = await db.collection("mygames");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding game");
  }
});

// Delete game from list
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("mygames");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting game");
  }
});

export default router;