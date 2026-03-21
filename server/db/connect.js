import { MongoClient, ServerApiVersion } from "mongodb";

const ATLAS_URI = process.env.ATLAS_URI
const client = new MongoClient(ATLAS_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db = client.db("games");

export default db;