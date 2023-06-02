import express from "express";
import db from "../db/conn.mjs";
import {ObjectId} from "mongodb";

const router = express.Router();

// get all records
router.get("/", async (req, res) => {
    let collection = db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// retrieve a record
router.get("/:id", async (req, res) => {
    let collection = db.collection("records");
    let filter = {_id: new ObjectId(req.params.id)};
    let results = await collection.findOne(filter);

    if (results) {
        res.send(results).status(200);
    } else {
        res.send("Not found").status(404);
    };
});

// insert a new record
router.post("/", async (req, res) => {
    let newDocument = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };

    let collection = await db.collection("records");
    let newRecord = collection.insertOne(newDocument);

    res.send(newRecord).status(204);
});

// update a record
router.patch("/:id", async (req, res) => {
    let filter = {
        _id: new ObjectId(req.params.id)
    };
    let updates = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        }
    };

    let collection = await db.collection("records");
    let results = await collection.updateOne(filter, updates);

    res.send(results).status(200);
});

// delete a record
router.delete("/:id", async (req, res) => {
    let filter = {
        _id: new ObjectId(req.params.id)
    };

    let collection = await db.collection("records");
    let results = await collection.deleteOne(filter);

    res.send(results).status(200);
});

export default router;