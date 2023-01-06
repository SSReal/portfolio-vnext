import { NextApiRequest, NextApiResponse } from "next";
import {db, coll} from "../../../data/mongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object | void>
) {
    const username = req.query.username;
    const result = Object(await coll.findOne({username}));
    console.log(result);
    res.status(200).send(result);
}