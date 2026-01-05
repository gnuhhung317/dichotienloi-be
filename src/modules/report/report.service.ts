import { FoodLogModel } from "../../models/FoodLog";
import { GroupMemberModel } from "../../models/GroupMember";

export class ReportService {
    static async getShoppingReport(userId: string, startDate: Date, endDate: Date) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }

        const logs = await FoodLogModel.aggregate([
            {
                $match: {
                    groupId: membership.groupId,
                    action: 'buy',
                    created_at: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $lookup: {
                    from: "foods",
                    localField: "foodId",
                    foreignField: "_id",
                    as: "food"
                }
            },
            { $unwind: "$food" },
            {
                $lookup: {
                    from: "units",
                    localField: "food.unitId",
                    foreignField: "_id",
                    as: "unit"
                }
            },
            { $unwind: "$unit" },
            {
                $group: {
                    _id: "$foodId",
                    foodName: { $first: "$food.name" },
                    unitName: { $first: "$unit.name" },
                    image: { $first: "$food.image" },
                    totalQuantity: { $sum: "$quantity" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { totalQuantity: -1 } }
        ]);

        return logs.map(log => ({
            ...log,
            totalQuantity: parseFloat(log.totalQuantity.toString())
        }));
    }

    static async getConsumptionReport(userId: string, startDate: Date, endDate: Date) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }

        const logs = await FoodLogModel.aggregate([
            {
                $match: {
                    groupId: membership.groupId,
                    action: { $in: ['consume', 'eat'] }, // Handle both variants if legacy exists
                    created_at: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $lookup: {
                    from: "foods",
                    localField: "foodId",
                    foreignField: "_id",
                    as: "food"
                }
            },
            { $unwind: "$food" },
            {
                $lookup: {
                    from: "units",
                    localField: "food.unitId",
                    foreignField: "_id",
                    as: "unit"
                }
            },
            { $unwind: "$unit" },
            {
                $group: {
                    _id: "$foodId",
                    foodName: { $first: "$food.name" },
                    unitName: { $first: "$unit.name" },
                    image: { $first: "$food.image" },
                    totalQuantity: { $sum: "$quantity" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { totalQuantity: -1 } }
        ]);

        return logs.map(log => ({
            ...log,
            totalQuantity: parseFloat(log.totalQuantity.toString())
        }));
    }
}
