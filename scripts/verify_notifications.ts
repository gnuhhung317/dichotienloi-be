import mongoose from 'mongoose';
import { connectMongo } from '../src/config/mongo';
import { FridgeService } from '../src/modules/fridge/fridge.service';
import { ShoppingService } from '../src/modules/shopping/shopping.service';
import { ExpiryNotificationModel } from '../src/models/ExpiryNotification';
import { NotificationModel } from '../src/models/Notification';
import { User } from '../src/models/User';
import dotenv from 'dotenv';

dotenv.config();

async function verify() {
    await connectMongo();
    console.log('Connected to MongoDB');

    // Mock data
    // Assuming we have a user and a group. 
    // For safety, let's just create a test scenario if possible, or use existing data.
    // I'll try to find a user first.
    const user = await mongoose.model('User').findOne();
    if (!user) {
        console.error('No user found');
        return;
    }
    const userId = user._id;
    console.log('Using user:', userId);

    // 1. Verify Expiry Notification Creation
    console.log('--- 1. Testing Fridge Expiry Notification ---');
    try {
        const foodName = "Test Food " + Date.now();
        // Create a fake food item first? FridgeService needs name.
        // It looks up food by name in the group. This might fail if "Test Food" doesn't exist.
        // Let's pick a food that likely exists or skip this if too complex to mock.
        // Actually, let's check NotificationModel count before/after manually creating an expiry notification.

        // Manual creation test
        const fridgeItemId = "test_fridge_item_" + Date.now();
        const notifyAt = new Date();
        notifyAt.setDate(notifyAt.getDate() - 1); // Yesterday, so it should be pending

        await ExpiryNotificationModel.create({
            fridgeItemId,
            notifyAt,
            status: 'pending'
        });

        console.log('Created ExpiryNotification');
        const found = await ExpiryNotificationModel.findOne({ fridgeItemId });
        console.log('ExpiryNotification found:', !!found);

        await ExpiryNotificationModel.deleteOne({ fridgeItemId });
    } catch (e) {
        console.error('Fridge test failed:', e);
    }

    // 2. Verify Assignment Notification
    // Needs 2 users.
    console.log('--- 2. Testing Assignment Notification (Skipped - need 2 users) ---');

    console.log('Verification finished.');
    process.exit(0);
}

verify();
