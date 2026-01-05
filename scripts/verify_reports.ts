import mongoose from 'mongoose';
import { connectMongo } from '../src/config/mongo';
import { ShoppingItemModel } from '../src/models/ShoppingItem';
import { ShoppingService } from '../src/modules/shopping/shopping.service';
import { ReportService } from '../src/modules/report/report.service';
import { FoodModel } from '../src/models/Food';
import { GroupMemberModel } from '../src/models/GroupMember';
import dotenv from 'dotenv';
import { FoodService } from '../src/modules/food/food.service';
import { User } from '../src/models/User';

dotenv.config();

async function verifyReports() {
    await connectMongo();
    console.log('Connected to MongoDB');

    // 1. Setup User and Group (Reuse existing if possible)
    // Find a user with a group
    const membership = await GroupMemberModel.findOne();
    if (!membership) {
        console.error('No group member found. Cannot test.');
        return;
    }
    const userId = membership.userId;
    const groupId = membership.groupId;

    console.log(`Using User: ${userId}, Group: ${groupId}`);

    // 2. Setup Data
    // Find a food item
    let food = await FoodModel.findOne({ groupId });
    if (!food) {
        // Create dummy food if needed, but let's assume existence for now or fail
        console.error('No food found for group.');
        // Try creating one?
        // Skip for now, assume data exists or manual test will cover.
        return;
    }

    // 3. Test Shopping Report
    console.log('--- Testing Shopping Report ---');
    // Create a shopping item and mark as bought
    const shoppingItem = await ShoppingItemModel.create({
        groupId,
        foodId: food._id,
        quantity: 5,
        is_bought: false,
        priority: 1
    });

    console.log(`Created shopping item: ${shoppingItem._id}`);

    // Mark as bought -> Should trigger log
    await ShoppingService.markItemAsBought(userId, shoppingItem._id.toString(), true);
    console.log('Marked item as bought.');

    // Fetch report
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const shoppingReport = await ReportService.getShoppingReport(userId, start, end);
    console.log('Shopping Report Result:', JSON.stringify(shoppingReport, null, 2));

    const foundInReport = shoppingReport.find((r: any) => r._id.toString() === food?._id.toString());
    if (foundInReport && foundInReport.totalQuantity >= 5) {
        console.log('SUCCESS: Item found in shopping report.');
    } else {
        console.error('FAILURE: Item NOT found in shopping report.');
    }

    // 4. Test Consumption Report
    console.log('--- Testing Consumption Report ---');
    // Log a consumption manually (simulating FridgeService.takeOutFridgeItem)
    await FoodService.createFoodLog(food._id, 'consume', 2, groupId);
    console.log('Logged consumption of 2 units.');

    const consumptionReport = await ReportService.getConsumptionReport(userId, start, end);
    console.log('Consumption Report Result:', JSON.stringify(consumptionReport, null, 2));

    const foundInConsumption = consumptionReport.find((r: any) => r._id.toString() === food?._id.toString());
    if (foundInConsumption && foundInConsumption.totalQuantity >= 2) {
        console.log('SUCCESS: Item found in consumption report.');
    } else {
        console.error('FAILURE: Item NOT found in consumption report.');
    }

    // Cleanup
    await ShoppingItemModel.deleteOne({ _id: shoppingItem._id });
    // Note: We are not deleting the Logs to keep history, or we could delete them if we want to clean up strictly.
    // For now, leaving logs is fine as "Purchase/Consumption" history.

    process.exit(0);
}

verifyReports();
