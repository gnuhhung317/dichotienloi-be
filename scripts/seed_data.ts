import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserModel } from '../src/models/User';
import { GroupModel } from '../src/models/Group';
import { GroupMemberModel } from '../src/models/GroupMember';
import { CategoryModel } from '../src/models/Category';
import { UnitModel } from '../src/models/Unit';
import { FoodModel } from '../src/models/Food';
import { RecipeModel } from '../src/models/Recipe';
import { FridgeItemModel } from '../src/models/FridgeItem';
import { ShoppingItemModel } from '../src/models/ShoppingItem';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dichotienloi';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('🔌 Connected to MongoDB');

        // --- 1. CLEANUP ---
        console.log('🧹 Cleaning existing data...');
        await Promise.all([
            UserModel.deleteMany({}),
            GroupModel.deleteMany({}),
            GroupMemberModel.deleteMany({}),
            CategoryModel.deleteMany({}),
            UnitModel.deleteMany({}),
            FoodModel.deleteMany({}),
            RecipeModel.deleteMany({}),
            FridgeItemModel.deleteMany({}),
            ShoppingItemModel.deleteMany({})
        ]);
        console.log('✅ Data cleaned');

        // --- 2. USERS ---
        console.log('👤 Seeding Users...');
        const passwordHash = '123456';

        const users = await UserModel.create([
            {
                email: 'nam@example.com',
                passwordHash,
                name: 'Nguyễn Văn Nam',
                avatar: 'https://i.pravatar.cc/150?u=nam',
                role: 'user'
            },
            {
                email: 'lan@example.com',
                passwordHash,
                name: 'Trần Thị Lan',
                avatar: 'https://i.pravatar.cc/150?u=lan',
                role: 'user'
            },
            {
                email: 'admin@example.com',
                passwordHash,
                name: 'Quản Trị Viên',
                avatar: 'https://i.pravatar.cc/150?u=admin',
                role: 'admin'
            }
        ]);
        console.log(`✅ Created ${users.length} users`);

        // --- 3. GROUPS ---
        console.log('🏠 Seeding Groups...');
        const group = await GroupModel.create({
            name: 'Gia Đình Hạnh Phúc',
            ownerId: users[0]._id
        });

        await GroupMemberModel.create([
            {
                groupId: group._id,
                userId: users[0]._id,
                role: 'owner'
            },
            {
                groupId: group._id,
                userId: users[1]._id,
                role: 'member'
            }
        ]);
        console.log(`✅ Created group "${group.name}" with members`);

        // --- 4. CATEGORIES ---
        console.log('📂 Seeding Categories...');
        const categories = await CategoryModel.create([
            { name: 'Thịt & Cá' },
            { name: 'Rau Củ' },
            { name: 'Trái Cây' },
            { name: 'Trứng & Sữa' },
            { name: 'Đồ Uống' },
            { name: 'Gia Vị' },
            { name: 'Khác' }
        ]);
        const catMap = new Map(categories.map((c: any) => [c.name, c._id]));
        console.log(`✅ Created ${categories.length} categories`);

        // --- 5. UNITS ---
        console.log('📏 Seeding Units...');
        const units = await UnitModel.create([
            { name: 'kg' },
            { name: 'g' },
            { name: 'lít' },
            { name: 'ml' },
            { name: 'cái' },
            { name: 'trái' },
            { name: 'hộp' },
            { name: 'chai' },
            { name: 'gói' },
            { name: 'lon' },
            { name: 'bó' }
        ]);
        const unitMap = new Map(units.map((u: any) => [u.name, u._id]));
        console.log(`✅ Created ${units.length} units`);

        // --- 6. FOODS ---
        console.log('🍎 Seeding Foods...');
        const foods = await FoodModel.create([
            // Thịt & Cá
            { name: 'Thịt heo ba chỉ', categoryId: catMap.get('Thịt & Cá'), unitId: unitMap.get('kg'), groupId: group._id, image: 'https://example.com/pork.jpg' },
            { name: 'Thịt bò thăn', categoryId: catMap.get('Thịt & Cá'), unitId: unitMap.get('kg'), groupId: group._id, image: 'https://example.com/beef.jpg' },
            { name: 'Cá hồi', categoryId: catMap.get('Thịt & Cá'), unitId: unitMap.get('kg'), groupId: group._id, image: 'https://example.com/salmon.jpg' },
            { name: 'Gà ta', categoryId: catMap.get('Thịt & Cá'), unitId: unitMap.get('kg'), groupId: group._id, image: 'https://example.com/chicken.jpg' },

            // Rau Củ
            { name: 'Rau muống', categoryId: catMap.get('Rau Củ'), unitId: unitMap.get('bó'), groupId: group._id, image: 'https://example.com/spinach.jpg' },
            { name: 'Cà chua', categoryId: catMap.get('Rau Củ'), unitId: unitMap.get('kg'), groupId: group._id, image: 'https://example.com/tomato.jpg' },
            { name: 'Khoai tây', categoryId: catMap.get('Rau Củ'), unitId: unitMap.get('kg'), groupId: group._id, image: 'https://example.com/potato.jpg' },
            { name: 'Hành tây', categoryId: catMap.get('Rau Củ'), unitId: unitMap.get('kg'), groupId: group._id, image: 'https://example.com/onion.jpg' },

            // Trứng & Sữa
            { name: 'Trứng gà', categoryId: catMap.get('Trứng & Sữa'), unitId: unitMap.get('trái'), groupId: group._id, image: 'https://example.com/egg.jpg' },
            { name: 'Sữa tươi không đường', categoryId: catMap.get('Trứng & Sữa'), unitId: unitMap.get('hộp'), groupId: group._id, image: 'https://example.com/milk.jpg' },

            // Gia Vị
            { name: 'Nước mắm', categoryId: catMap.get('Gia Vị'), unitId: unitMap.get('chai'), groupId: group._id, image: 'https://example.com/fishsauce.jpg' },
            { name: 'Hạt nêm', categoryId: catMap.get('Gia Vị'), unitId: unitMap.get('gói'), groupId: group._id, image: 'https://example.com/seasoning.jpg' },
            { name: 'Dầu ăn', categoryId: catMap.get('Gia Vị'), unitId: unitMap.get('chai'), groupId: group._id, image: 'https://example.com/oil.jpg' },
            { name: 'Đường', categoryId: catMap.get('Gia Vị'), unitId: unitMap.get('kg'), groupId: group._id, image: 'https://example.com/sugar.jpg' }
        ]);
        const foodMap = new Map(foods.map((f: any) => [f.name, f._id]));
        console.log(`✅ Created ${foods.length} foods`);

        // --- 7. RECIPES ---
        console.log('📖 Seeding Recipes...');
        await RecipeModel.create([
            {
                name: 'Thịt kho tàu',
                description: 'Món ăn truyền thống Việt Nam, ngon đậm đà đưa cơm.',
                ownerType: 'group',
                groupId: group._id,
                ownerId: users[0]._id,
                ingredients: [
                    { foodId: foodMap.get('Thịt heo ba chỉ'), quantity: 0.5, unitId: unitMap.get('kg') },
                    { foodId: foodMap.get('Trứng gà'), quantity: 5, unitId: unitMap.get('trái') },
                    { foodId: foodMap.get('Nước mắm'), quantity: 50, unitId: unitMap.get('ml') },
                    { foodId: foodMap.get('Đường'), quantity: 20, unitId: unitMap.get('g') }
                ]
            },
            {
                name: 'Canh trứng cà chua',
                description: 'Món canh đơn giản, dễ nấu, bổ dưỡng.',
                ownerType: 'group',
                groupId: group._id,
                ownerId: users[1]._id,
                ingredients: [
                    { foodId: foodMap.get('Trứng gà'), quantity: 2, unitId: unitMap.get('trái') },
                    { foodId: foodMap.get('Cà chua'), quantity: 3, unitId: unitMap.get('trái') },
                    { foodId: foodMap.get('Hành tây'), quantity: 0.5, unitId: unitMap.get('trái') },
                    { foodId: foodMap.get('Dầu ăn'), quantity: 15, unitId: unitMap.get('ml') }
                ]
            }
        ]);
        console.log('✅ Created sample recipes');

        // --- 8. FRIDGE ITEMS ---
        console.log('❄️ Seeding Fridge...');
        await FridgeItemModel.create([
            {
                groupId: group._id,
                foodId: foodMap.get('Trứng gà'),
                unitId: unitMap.get('trái'),
                quantity: 10,
                expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
                storagePlace: 'fridge',
                status: 'available'
            },
            {
                groupId: group._id,
                foodId: foodMap.get('Sữa tươi không đường'),
                unitId: unitMap.get('hộp'),
                quantity: 2,
                expiredAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 days
                storagePlace: 'fridge',
                status: 'available'
            },
            {
                groupId: group._id,
                foodId: foodMap.get('Thịt bò thăn'),
                unitId: unitMap.get('kg'),
                quantity: 0.5,
                expiredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Expired 1 day ago
                storagePlace: 'freezer',
                status: 'expired'
            }
        ]);
        console.log('✅ Added items to fridge');

        // --- 9. SHOPPING LIST ---
        console.log('🛒 Seeding Shopping List...');
        await ShoppingItemModel.create([
            {
                groupId: group._id,
                foodId: foodMap.get('Gạo'), // Note: Gạo wasn't created in foods array above, let's fix or use generic. Using "Thịt heo ba chỉ" instead or created a new one?
                // Let's safe pick existing ones for now.
                // Wait, I didn't create 'Gạo' above. Let's add 'Rau muống'
                foodId: foodMap.get('Rau muống'),
                quantity: 2,
                is_bought: false
            },
            {
                groupId: group._id,
                foodId: foodMap.get('Nước mắm'),
                quantity: 1,
                is_bought: true,
                assignedTo: users[0]._id
            },
            {
                groupId: group._id,
                foodId: foodMap.get('Cá hồi'),
                quantity: 0.5,
                is_bought: false,
                assignedTo: users[1]._id
            }
        ]);
        console.log('✅ Added items to shopping list');

        console.log('✨ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
