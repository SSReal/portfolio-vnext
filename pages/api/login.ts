import { NextApiRequest, NextApiResponse } from "next";
import { findOne } from "../../data/mongo";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "POST") {
        res.status(403).send({
            message: "Method not supported",
            success: false
        })
        return;
    }

    const {username, password} = JSON.parse(req.body);

    const userDoc:any = await findOne({username});
    
    if(userDoc._id === null) {
        //no user found with that username
        res.status(401).send({
            message: "user not found",
            success: false
        })
        return;
    }
    if(await bcrypt.compare(password, userDoc.hashedPassword)) {

        const token = jwt.sign({
            userId: userDoc._id,
            username: username,
            name: userDoc.name
        }, process.env.JWT_SECRET || "error");

        res.status(200).send({
            success: true,
            token
        })
        return;
    }
    else {
        res.status(401).send({
            success: false
        })
    }
}