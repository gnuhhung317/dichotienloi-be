import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// Import all models
import { UserModel } from '../src/models/User';
import { ShoppingItemModel } from '../src/models/ShoppingItem';
import { FridgeItemModel } from '../src/models/FridgeItem';
import { FoodModel } from '../src/models/Food';
import { RecipeModel } from '../src/models/Recipe';
import { MealPlanModel } from '../src/models/MealPlan';
import { ShoppingListModel } from '../src/models/ShoppingList';
import { NotificationModel } from '../src/models/Notification';
import { GroupModel } from '../src/models/Group';
import { GroupMemberModel } from '../src/models/GroupMember';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const cleanupDatabase = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        // 1. Clean up Users (Partial Wipe)
        const keepEmails = ['a@gmail.com', 'duchung@gmail.com'];
        console.log(`Cleaning Users (Keeping: ${keepEmails.join(', ')})...`);
        const keepEmailsNormalized = keepEmails.map(e => e.toLowerCase());

        const userResult = await UserModel.deleteMany({
            email: { $nin: keepEmailsNormalized }
        });
        console.log(`- Deleted ${userResult.deletedCount} users.`);

        // 2. Clean up Transactional Tables (Full Wipe)
        console.log('Cleaning transactional tables...');

        const shoppingItemResult = await ShoppingItemModel.deleteMany({});
        console.log(`- Deleted ${shoppingItemResult.deletedCount} shopping items.`);

        const fridgeItemResult = await FridgeItemModel.deleteMany({});
        console.log(`- Deleted ${fridgeItemResult.deletedCount} fridge items.`);

        const foodResult = await FoodModel.deleteMany({});
        console.log(`- Deleted ${foodResult.deletedCount} foods.`);

        const recipeResult = await RecipeModel.deleteMany({});
        console.log(`- Deleted ${recipeResult.deletedCount} recipes.`);

        const mealPlanResult = await MealPlanModel.deleteMany({});
        console.log(`- Deleted ${mealPlanResult.deletedCount} meal plans.`);

        const shoppingListResult = await ShoppingListModel.deleteMany({});
        console.log(`- Deleted ${shoppingListResult.deletedCount} shopping lists.`);

        const notificationResult = await NotificationModel.deleteMany({});
        console.log(`- Deleted ${notificationResult.deletedCount} notifications.`);

        // 3. Clean up Groups (Full Wipe - users must rejoin)
        const groupResult = await GroupModel.deleteMany({});
        console.log(`- Deleted ${groupResult.deletedCount} groups.`);

        const groupMemberResult = await GroupMemberModel.deleteMany({});
        console.log(`- Deleted ${groupMemberResult.deletedCount} group members.`);

        console.log('Database cleanup complete.');

    } catch (error) {
        console.error('Error cleaning up database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
        process.exit();
    }
};

cleanupDatabase();
