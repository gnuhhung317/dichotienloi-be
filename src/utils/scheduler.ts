import cron from 'node-cron';
import { ExpiryNotificationModel } from '../models/ExpiryNotification';
import { NotificationModel } from '../models/Notification';
import { FridgeItemModel } from '../models/FridgeItem';
import { GroupModel } from '../models/Group';

export const initScheduler = () => {
    // Run every day at 8:00 AM
    cron.schedule('0 8 * * *', async () => {
        console.log('Running expiry notification check...');
        try {
            const now = new Date();
            // Find pending expiry notifications that should be sent
            const pendingNotifications = await ExpiryNotificationModel.find({
                status: 'pending',
                notifyAt: { $lte: now }
            }).populate('fridgeItemId');

            for (const expiryNotif of pendingNotifications) {
                const fridgeItem = expiryNotif.fridgeItemId as any;

                if (!fridgeItem) {
                    console.warn(`Fridge item not found for expiry notification ${expiryNotif._id}`);
                    expiryNotif.status = 'cancelled';
                    await expiryNotif.save();
                    continue;
                }

                // Double check if item is still available
                if (fridgeItem.status !== 'available') {
                    expiryNotif.status = 'cancelled';
                    await expiryNotif.save();
                    continue;
                }

                // Get group members to notify
                const group = await GroupModel.findById(fridgeItem.groupId).populate('members.userId');
                if (!group) continue;

                // Create notifications for each member
                const notifications = group.members.map((member: any) => ({
                    type: 'expire_warning',
                    content: `Món ${fridgeItem.foodId?.name || 'Unknown'} sắp hết hạn vào ${new Date(fridgeItem.expiredAt).toLocaleDateString('vi-VN')}`,
                    userId: member.userId,
                    is_read: false
                }));

                await NotificationModel.insertMany(notifications);

                // Update expiry notification status
                expiryNotif.status = 'sent';
                expiryNotif.sentAt = new Date();
                await expiryNotif.save();
            }
            console.log(`Processed ${pendingNotifications.length} expiry notifications.`);
        } catch (error) {
            console.error('Error running expiry notification check:', error);
        }
    });

    console.log('Scheduler initialized');
};
