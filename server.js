const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.post("/getHistory", async (req, res) => {
  try {
    const { uid } = req.body;
    const result = await getHistory(client, uid);
    res.send(result || []);
  } catch (error) {
    res.send(error);
  }
});

app.post("/addHistory", async (req, res) => {
  try {
    const { uid, newHistory } = req.body;
    await addHistory(client, uid, newHistory);
    res.send("New History Added!");
  } catch (error) {
    res.send(error);
  }
});

app.patch("/upateHistory", async (req, res) => {
  try {
    const { uid, historyId, updatedHistory } = req.body;
    await updateHistory(client, uid, ObjectId(historyId), updatedHistory);
    res.send("Updated Successfully!");
  } catch (error) {
    res.send(error);
  }
});

app.delete("/deleteHistory", async (req, res) => {
  try {
    const { uid, historyId } = req.body;
    await deleteHistory(client, uid, ObjectId(historyId));
    res.send("Deleted Successfully!");
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, async (error) => {
  if (error) {
    console.log(error);
  } else {
    await startDb();
    console.log(`server running on port : ${port}`);
  }
});

async function startDb() {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
}

async function addHistory(client, uid, newHistory) {
  const result = await client
    .db(uid)
    .collection("history")
    .insertOne(newHistory);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function getHistory(client, uid) {
  const cursor = client.db(uid).collection("history").find();
  const results = await cursor.toArray();
  return results;
}

async function updateHistory(client, uid, historyId, updatedHistory) {
  result = await client
    .db(uid)
    .collection("history")
    .updateOne({ _id: historyId }, { $set: updatedHistory });
}

async function deleteHistory(client, uid, historyId) {
  result = await client
    .db(uid)
    .collection("history")
    .deleteOne({ _id: historyId });
}
