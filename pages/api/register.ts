import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { addUser } from "../../data/mongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {username, password} = JSON.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    await addUser({username, hashedPassword});
    res.status(201).send({
        message: "created successfully"
    })
    await res.revalidate(`/${username}`);
}