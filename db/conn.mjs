import {MongoClient} from "mongodb";

const connectionString = process.env.DB_URI || "";
const dbname = process.env.DB_NAME || "";
const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch(e) {
    console.error(e);
};

let db = conn.db(dbname);

export default db;