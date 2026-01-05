import { Request, Response } from "express";

export class UploadController {
    static async uploadFile(req: any, res: Response) {
        try {
            if (!req.file || !req.file.cloudinaryUrl) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            return res.status(200).json({
                url: req.file.cloudinaryUrl,
                publicId: req.file.publicId
            });
        } catch (error) {
            console.error("Upload error:", error);
            return res.status(500).json({ message: "Server error during upload" });
        }
    }
}
