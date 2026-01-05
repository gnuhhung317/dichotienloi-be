import multer from "multer";
import cloudinary from "../config/cloudinary";
import { Request, Response, NextFunction } from "express";

const memoryStorage = multer.memoryStorage();

export const uploadMemory = multer({
    storage: memoryStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

export const uploadToCloudinary = (folder: string) => {
    return async (req: any, res: Response, next: NextFunction) => {
        if (req.file) {
            try {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: folder },
                    (error, result) => {
                        if (error) {
                            return next(error);
                        }
                        req.file.cloudinaryUrl = result?.secure_url;
                        req.file.publicId = result?.public_id;
                        next();
                    }
                );
                stream.end(req.file.buffer);
            } catch (error) {
                next(error);
            }
        } else {
            next();
        }
    };
};
