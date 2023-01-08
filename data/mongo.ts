import { Document, FindOptions, MongoClient, ServerApiVersion } from "mongodb";

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

async function find(doc: Document, options?: FindOptions<Document>) {
    const foundDocs = await coll.find(doc, options).toArray();
    return foundDocs.map((d) => {
        return {
            ...d,
            _id: d._id.toString(),
        }
    })
}

async function findOne(doc: Document, options?: FindOptions<Document>) {
    const foundDoc = await coll.findOne(doc, options)
    if(foundDoc === null) {
        return {
            _id: null
        }
    }
    return {
        ...foundDoc,
        _id: foundDoc?._id.toString(),
    }
}

async function findUsernames() {
    const allDocs = await coll.find({}).toArray();
    return allDocs.map((d)=>d.username);
}

export default client;
export { connect, close, db, coll, findOne, find, findUsernames};

