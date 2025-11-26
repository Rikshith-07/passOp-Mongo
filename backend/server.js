const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

dotenv.config();

// Create express app
const app = express();

// Render will give PORT, otherwise use 5000 locally
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Environment variables
const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if (!url) {
  console.error("❌ MONGO_URI is missing in environment variables");
  process.exit(1);
}

let client;
let db;

// Connect to MongoDB Atlas
async function connectToMongo() {
  try {
    client = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
      },
    });

    await client.connect();
    db = client.db(dbName);

    console.log("✅ Connected to MongoDB Atlas, DB:", dbName);

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

// Routes

// GET all passwords
app.get('/', async (req, res) => {
  try {
    const collection = db.collection("passwords");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error("GET / error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// POST a new password
app.post('/', async (req, res) => {
  try {
    const collection = db.collection("passwords");
    const result = await collection.insertOne(req.body);
    res.json({ success: true, result });
  } catch (err) {
    console.error("POST / error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// DELETE a password by ID
app.delete('/', async (req, res) => {
  try {
    const collection = db.collection("passwords");
    const result = await collection.deleteOne(req.body);
    res.json({ success: true, result });
  } catch (err) {
    console.error("DELETE / error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Start server only after MongoDB is connected
connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
