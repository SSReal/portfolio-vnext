import { Document, FindOptions, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import HomeProps from "../components/homeProps";

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

async function findById(id:string) {
    const doc = await findOne({_id: new ObjectId(id)});
    return doc;
}

async function updateById(doc:any) {
    const {_id, ...updateDoc} = doc;
    console.log("start updating");
    console.log(new ObjectId(_id));
    console.log(updateDoc);
    const res = await coll.replaceOne({_id:new ObjectId(_id)}, updateDoc);
    console.log("done");
    return res;
}

async function findOne(doc: Document, options?: FindOptions<Document>) {
    const foundDoc = await coll.findOne(doc, options)
    if(foundDoc === null) {
        return {
            _id: null,
            hashedPassword: null
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

async function addUser(doc:Object) {
    return await coll.insertOne(doc)
            .catch((err) => {
                throw err;
            });
}

export default client;
export { connect, close, db, coll, findOne, find, findUsernames, addUser, findById, updateById};

