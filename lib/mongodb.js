import { MongoClient } from 'mongodb'

let db;
let client;

if (!process.env.MONGODB_URI) {
  throw new Error('Add MONGODB_URI to .env.local');
}

export default async function getDb() {
    if (db) return db;

    client = new MongoClient(process.env.MONGODB_URI);

    return client.connect()
      .then(() => {
        db = client.db("bittree");
        return db;
      })
      .catch((error) => {
        console.error("MongoDB connection error", error);
        throw new Error("MongoDB connection failed");
      })
}

export async function closeDb() {
  if (client) {
    return client.close()
      .then(() => {
        console.log("MongoDB connection closed")
      })
      .catch((error) => {
        console.log("MongoDB connection not closed", error)
        throw new Error("MongoDB connection not closed");
      })
  }
}