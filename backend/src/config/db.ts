import { MongoClient, Collection } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get MongoDB URI and Database Name from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
  throw new Error("Please define MONGODB_URI and DB_NAME in your .env file");
}

const client = new MongoClient(uri);
let taskCollection: Collection;

const connectDB = async () => {
  try {
    await client.connect();
    console.log(`🚀 Connected to MongoDB Database: ${dbName}`);
    const db = client.db(dbName); // Use the dynamic database name
    taskCollection = db.collection("task"); 
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

const getTaskCollection = (): Collection => {
  if (!taskCollection) throw new Error("task collection not initialized");
  return taskCollection;
};

export { connectDB, getTaskCollection };
