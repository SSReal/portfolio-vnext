import { NextApiRequest, NextApiResponse } from "next";
import { findUsernames } from "../../data/mongo";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
) {
    if(req.method !== "POST") {
        return res.status(403).json({
            message: "Method not allowed"
        })
    }

    const users = await findUsernames();
    const {username} = JSON.parse(req.body)
    console.log(username);
    if(users.find((val) => val === username)) {
        return res.status(200).send({
            found: true
        })
    }
    else {
        return res.status(200).send({
            found: false
        })
    }

}