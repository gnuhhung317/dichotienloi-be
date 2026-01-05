import { NotificationModel } from "../../models/Notification";
import { GroupMemberModel } from "../../models/GroupMember";

export class NotificationService {
    static async getNotifications(userId: string, limit: number = 20, page: number = 1) {
        const skip = (page - 1) * limit;
        const notifications = await NotificationModel.find({ userId })
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit);

        const total = await NotificationModel.countDocuments({ userId });
        const unreadCount = await NotificationModel.countDocuments({ userId, is_read: false });

        return {
            notifications,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            unreadCount
        };
    }

    static async markAsRead(userId: string, notificationId: string) {
        const notification = await NotificationModel.findOne({ _id: notificationId, userId });
        if (!notification) {
            throw new Error("NOTIFICATION_NOT_FOUND");
        }
        notification.is_read = true;
        await notification.save();
        return notification;
    }

    static async markAllAsRead(userId: string) {
        await NotificationModel.updateMany(
            { userId, is_read: false },
            { $set: { is_read: true } }
        );
        return { success: true };
    }
}
