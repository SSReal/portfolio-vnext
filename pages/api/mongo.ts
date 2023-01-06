import { NextApiRequest, NextApiResponse } from "next";
import {MongoClient, ServerApiVersion} from "mongodb";

type Data = {
    message: string
}

const URI = `mongodb+srv://sajal:${process.env.MONGO_PASSWORD}@portfolio-data-1.prqrq3y.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(URI);

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<Data>,
) {
    console.log(URI);
    const c = await client.connect()
    .catch((err) => {
        console.log(err);
        res.status(500).send({
            message: err.toString()
        })
    })
    client.close();
    res.status(200).send({message: "successful"});
}