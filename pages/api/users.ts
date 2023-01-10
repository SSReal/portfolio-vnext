import { NextApiRequest, NextApiResponse } from "next";
import { findUsernames } from "../../data/mongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object|void>
) {
    if(req.method !== "GET") {
        res.status(403).send({
            message: "This endpoint doesn't accept this method"
        })
        return;
    }

    const users = await findUsernames();

    res.status(200).send({users});
}