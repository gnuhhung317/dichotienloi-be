import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadMemory, uploadToCloudinary } from "../middlewares/cloudinary.middleware";
import { UploadController } from "../modules/upload/upload.controller";

const router = Router();

router.post(
    "/",
    authMiddleware,
    uploadMemory.single("file"),
    uploadToCloudinary("general"),
    UploadController.uploadFile
);

export default router;
