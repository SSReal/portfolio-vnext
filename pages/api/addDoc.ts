import { NextApiRequest, NextApiResponse } from "next";
import {coll} from "../../data/mongo";
import sajalSinghal from "../../data/sajalSinghal";

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<Object | void>,
) {
    const result = await coll.insertOne(sajalSinghal)
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        })
    res.status(200).send(result);
}