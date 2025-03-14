const { Pool } = require("pg");
const { MongoClient } = require('mongodb');
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "web_ass2",
  password: "admin",
  port: 5432,
});

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
let db;

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db('blogsystem');
    return db;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

const getBlogPostsCollection = () => {
  if (!db) {
    throw new Error("Database not connected! Call connectToMongo first.");
  }
  return db.collection('blogposts');
};

async function run() {
  try {
    await connectToMongo();
    // Example operation
    const postsCollection = getBlogPostsCollection();
    const count = await postsCollection.countDocuments();
    console.log(`Database has ${count} blog posts`);
  } catch (err) {
    console.error("Error in run function:", err);
  }
}

module.exports = {
  pool,
  client,
  connectToMongo,
  getBlogPostsCollection
};