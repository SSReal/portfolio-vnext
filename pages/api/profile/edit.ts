import { NextApiRequest, NextApiResponse } from "next";
import { addUser, findById, findOne, updateById } from "../../../data/mongo";
import jwt from "jsonwebtoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object|void>
) {
    if(req.method !== "POST") {
        res.status(405).send({message: "Method not allowed"});
        return;
    }

    const doc = JSON.parse(req.body);
    const username = doc.username;
    if(req.headers.authorization === undefined) {
        res.status(402).send({
            message: "Please log in first"
        })
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const decodedToken = Object(jwt.verify(token || "", process.env.JWT_SECRET || "error"));
        if(decodedToken.username !== username) {
            throw "invalid token";
        }
        const userDoc = await findById(decodedToken.userId);
        if(doc === undefined) {
            res.status(406).send({message: "invalid document sent in body"})
            return;
        }
        const updateRes = await updateById({
            ...doc,
            hashedPassword: userDoc.hashedPassword
        }).catch((err) => res.status(500).send(err));

        await res.revalidate(`/${username}`)
        res.status(200).send(updateRes);

    }
    catch(err) {
        res.status(401).send({
            message: "invalid token, log in again"
        })
        return;
    }          
}