import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config({ path: '../.env'});

const ATLAS_URI = process.env.ATLAS_URI;

const client = new MongoClient(ATLAS_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db = client.db("games");

export default db;