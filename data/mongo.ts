import {MongoClient, ServerApiVersion} from "mongodb";

const URI = `mongodb+srv://sajal:${process.env.MONGO_PASSWORD}@portfolio-data-1.prqrq3y.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(URI);

const db = client.db('data');
const coll = db.collection('profile-data');

async function connect() {
    await client.connect()
    .catch((err) => {
        throw err;
    })
}

function close() {
    client.close();
}

export default client;
export {connect, close, db, coll};

