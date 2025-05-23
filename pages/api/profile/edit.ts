import { NextApiRequest, NextApiResponse } from "next";
import { findById, updateById } from "../../../data/mongo"; // Assuming findById and updateById are correctly implemented
import jwt from "jsonwebtoken";
import defaultUsername from "../../../data/default_username";
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import HomeProps from "../../../components/homeProps";

const MAX_FILE_SIZE_SERVER = 5 * 1024 * 1024; // 5MB

export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parsing, formidable will handle it
    },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object | void>
) {
    if (req.method !== "POST") {
        return res.status(405).send({ message: "Method not allowed" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Authorization header missing, please log in first" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({ message: "Token missing, please log in first" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "error") as { userId: string, username: string };

        const form = new formidable.IncomingForm({
            uploadDir,
            keepExtensions: true,
            multiples: false, // Only one profile image
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Formidable parsing error:", err);
                return res.status(500).json({ message: "Error parsing form data" });
            }

            const usernameFromFields = fields.username as string;

            if (decodedToken.username !== usernameFromFields) {
                return res.status(403).send({ message: "Forbidden: You can only edit your own profile." });
            }
            
            const userDoc = await findById(decodedToken.userId);
            if (!userDoc) {
                 return res.status(404).send({ message: `User with ID ${decodedToken.userId} not found.` });
            }


            const docToSave: Partial<HomeProps> & { hashedPassword?: string, _id?: any } = {
                // Core fields that are expected to be strings
                username: fields.username as string,
                name: fields.name as string,
                shortDesignation: fields.shortDesignation as string,
                designationLine: fields.designationLine as string,
                description: fields.description as string,
                // Parse JSON stringified fields
                // Provide default '[]' or '{}' for fields that might be missing, to avoid JSON.parse(undefined)
                links: JSON.parse(fields.links as string || '[]'),
                skills: JSON.parse(fields.skills as string || '[]'),
                projects: JSON.parse(fields.projects as string || '[]'),
                experience: JSON.parse(fields.experience as string || '[]'),
                contact: fields.contact ? JSON.parse(fields.contact as string) : undefined,
                // Preserve existing password
                hashedPassword: userDoc.hashedPassword,
                // Preserve _id
                _id: userDoc._id 
            };
            
            const profileImageFile = files.profileImage as File | undefined;

            if (profileImageFile && profileImageFile.filepath) {
                // Server-side File Type Validation
                if (!profileImageFile.mimetype || !profileImageFile.mimetype.startsWith('image/')) {
                    await fs.promises.unlink(profileImageFile.filepath).catch(e => console.error("Error unlinking invalid type file:", e));
                    return res.status(415).json({ message: "Unsupported Media Type. Only image files are allowed." });
                }

                // Server-side File Size Validation
                if (profileImageFile.size > MAX_FILE_SIZE_SERVER) {
                    await fs.promises.unlink(profileImageFile.filepath).catch(e => console.error("Error unlinking oversized file:", e));
                    return res.status(413).json({ message: `Payload Too Large. File size cannot exceed ${MAX_FILE_SIZE_SERVER / 1024 / 1024}MB.` });
                }

                try {
                    const extension = profileImageFile.originalFilename?.split('.').pop() || 'png'; // Default to png if no extension
                    const newFilename = `${usernameFromFields}-profile.${extension}`;
                    const newPath = path.join(uploadDir, newFilename); // formidable already saves to uploadDir with a temp name

                    // If there's an old photo path and it's different from the new one, attempt to delete it
                    if (userDoc.profilePhotoPath && userDoc.profilePhotoPath !== `/uploads/${newFilename}`) {
                        const oldPhotoPath = path.join(process.cwd(), 'public', userDoc.profilePhotoPath);
                        if (fs.existsSync(oldPhotoPath) && userDoc.profilePhotoPath.startsWith('/uploads/')) { // Check if it's in uploads
                           await fs.promises.unlink(oldPhotoPath).catch(e => console.error("Error deleting old profile photo:", e));
                        }
                    }
                    
                    // Rename the temp file to the new filename in the same uploadDir
                    await fs.promises.rename(profileImageFile.filepath, newPath);
                    docToSave.profilePhotoPath = `/uploads/${newFilename}`;

                } catch (fileError) {
                    console.error("Error processing file upload:", fileError);
                    // Optionally, decide if this error should prevent the update or just proceed without image update
                }
            } else if (fields.profilePhotoPath) {
                 // Preserve existing photo path if no new one uploaded and path is sent from client
                docToSave.profilePhotoPath = fields.profilePhotoPath as string;
            }


            try {
                // @ts-ignore
                const updateRes = await updateById(docToSave); // updateById should handle the _id within docToSave
                await res.revalidate(`/${usernameFromFields}`);
                if (usernameFromFields === defaultUsername) {
                    await res.revalidate('/'); // Revalidate the home page as well
                }
                res.status(200).send({ message: "Successfully updated", profilePhotoPath: docToSave.profilePhotoPath, updateResult: updateRes });
            } catch (updateError) {
                console.error("Error updating user document:", updateError);
                res.status(500).send({ message: "Error updating profile in database." });
            }
        });

    } catch (authError: any) {
        console.error("Authentication error:", authError);
        if (authError.name === 'JsonWebTokenError' || authError.name === 'TokenExpiredError') {
            return res.status(401).send({ message: "Invalid or expired token, log in again" });
        }
        return res.status(500).send({ message: "Internal server error during authentication." });
    }
}