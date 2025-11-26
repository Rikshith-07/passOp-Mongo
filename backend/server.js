const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

dotenv.config();

// App
const app = express();

// Use Render's PORT in production, 3000 locally
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Mongo client + DB
const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if (!url) {
  console.error('❌ MONGO_URI is not defined in environment variables');
  process.exit(1);
}

let client;
let db;

async function connectToMongo() {
  try {
    client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log('✅ Connected to MongoDB, DB:', dbName);
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

// Routes
app.get('/', async (req, res) => {
  try {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (err) {
    console.error('Error in GET /:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/', async (req, res) => {
  try {
    const password = req.body;
    const collection = db.collection('passwords');
    const result = await collection.insertOne(password);
    res.send({ success: true, result });
  } catch (err) {
    console.error('Error in POST /:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.delete('/', async (req, res) => {
  try {
    const password = req.body;
    const collection = db.collection('passwords');
    const result = await collection.deleteOne(password);
    res.send({ success: true, result });
  } catch (err) {
    console.error('Error in DELETE /:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Start server only after Mongo connection
connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
  });
});
