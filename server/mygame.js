import express from "express";
import db from "./db/connect.js"
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all games in list
router.get("/", async (req, res) => {
  let collection = await db.collection("mygames");
  let results = await collection.find({}).toArray();
  res.send(results[0]).status(200);
});

// Edit list
router.patch("/edit", async (req, res) => {
  try {
    let collection = await db.collection("mygames");
    let id = await collection.find({}).toArray();
    let result = await collection.updateOne({ _id: id[0]._id },
      {
        $set: {
          name: req.body.name,
          desc: req.body.desc
        }
      });
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error editing list");
  }
});

//Add a new game to a list
router.patch("/add", async (req, res) => {
  try {
    let collection = await db.collection("mygames");
    let id = await collection.find({}).toArray();
    let result = await collection.updateOne({ _id: id[0]._id },
      {
        $push: {
          games: {
            game_id: new ObjectId(),
            name: req.body.name,
            year: req.body.year
          }
        }
      });
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding game");
  }
});

// Delete game from list
router.delete("/:id", async (req, res) => {
  try {
    const collection = await db.collection("mygames");
    let id = await collection.find({}).toArray();
    let result = await collection.updateOne({ _id: id[0]._id },
      {
        $pull: {
          games: {
            game_id: new ObjectId(req.params.id) 
          }
        }
      });

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting game");
  }
});

export default router;