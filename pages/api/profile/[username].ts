import { NextApiRequest, NextApiResponse } from "next";
import {db, coll, findOne, findById} from "../../../data/mongo";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object | void>
) {
    const {username} = JSON.parse(req.body);
    if(req.headers.authorization === undefined) {
        res.status(402).send({
            message: "Please log in first"
        })
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const decodedToken = Object(jwt.verify(token || "", process.env.JWT_SECRET || "error"));
        console.log(decodedToken);
        console.log(username);
        if(decodedToken.username !== username) {
            console.log("e1");
            throw "invalid token";
        }
        const {hashedPassword: _, ...userDoc} = await findById(decodedToken.userId);
        console.log(userDoc);
        if(req.method === "POST") res.status(200).send(userDoc);
        else res.status(401).send({
            message: "Method not allowed"
        });
    }
    catch(err) {
        res.status(401).send({
            message: "invalid token, log in again"
        })
        return;
    }
}