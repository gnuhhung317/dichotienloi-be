import { Request, Response } from "express";
import { NotificationService } from "./notification.service";

export class NotificationController {
    static async getNotifications(req: any, res: Response) {
        try {
            const { limit, page } = req.query;
            const parsedLimit = limit ? parseInt(limit as string) : 20;
            const parsedPage = page ? parseInt(page as string) : 1;

            const result = await NotificationService.getNotifications(req.user.userId, parsedLimit, parsedPage);
            return res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async markAsRead(req: any, res: Response) {
        try {
            const { id } = req.params;
            const result = await NotificationService.markAsRead(req.user.userId, id);
            return res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async markAllAsRead(req: any, res: Response) {
        try {
            const result = await NotificationService.markAllAsRead(req.user.userId);
            return res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
