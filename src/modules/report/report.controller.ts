import { Request, Response } from "express";
import { ReportService } from "./report.service";

export class ReportController {
    static async getShoppingReport(req: any, res: Response) {
        try {
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                return res.status(400).json({ message: "Start date and end date are required" });
            }

            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            // Ensure end date includes the whole day
            end.setHours(23, 59, 59, 999);

            const report = await ReportService.getShoppingReport(req.user.userId, start, end);
            return res.status(200).json(report);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getConsumptionReport(req: any, res: Response) {
        try {
            const { startDate, endDate } = req.query;
            if (!startDate || !endDate) {
                return res.status(400).json({ message: "Start date and end date are required" });
            }

            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            end.setHours(23, 59, 59, 999);

            const report = await ReportService.getConsumptionReport(req.user.userId, start, end);
            return res.status(200).json(report);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
