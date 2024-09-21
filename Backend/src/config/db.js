const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI);
    const client = new MongoClient(process.env.MONGO_URI, {});

    await client.connect();
    db = client.db();
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
