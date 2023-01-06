import { NextApiRequest, NextApiResponse } from "next";
import client from "../../data/mongo";

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<Object>,
) {
    const db = client.db('data');
    const coll = db.collection('profile-data');

    const findResult = await coll.find();
    const result = await findResult.toArray();
    res.status(200).send(result);
}