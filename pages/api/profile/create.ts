import { NextApiRequest, NextApiResponse } from "next";
import { addUser, findOne } from "../../../data/mongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object|void>
) {
    console.log(req.body);
    if(req.method !== "POST") {
        res.status(405).send({message: "Only POST requests allowed"});
        return;
    }

    const doc = JSON.parse(req.body);
    if(doc === undefined) {
        res.status(406).send({message: "invalid document sent in body"})
        return;
    }

    const check = await findOne({username:doc.username});
    if(check._id !== null) {
        //user already exists
        res.status(403).send({message: "username already exists"});
        return;
    }
    
    const result = await addUser(doc)
                .catch((err) => res.status(500).send(err));
    res.status(200).send(result);

}