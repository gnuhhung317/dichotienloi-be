
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'; // Import at top level

// Models
import { RecipeModel } from '../src/models/Recipe';
import { FoodModel } from '../src/models/Food';
import { UnitModel } from '../src/models/Unit';
import { CategoryModel } from '../src/models/Category';
import { GroupModel } from '../src/models/Group';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const BASE_URL = 'https://cookpad.com';

const HEADERS = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
    'cache-control': 'no-cache',
    'cookie': 'ab_session=0.8338327054705981; f_unique_id=ca3b1801-c4d8-4cc2-9b78-132890a2bc6a; region_info=%7B%22country_code%22%3A%22VN%22%2C%22locale%22%3A%22vi%22%7D; use_one_experience=true; _ga=GA1.1.829684953.1767637836; keyword_history=[{%22query%22:%22g%E1%BB%8Fi%22%2C%22type%22:%22recipe%22%2C%22occurred_at%22:%222026-01-05T18:30:39Z%22}]; _ga_V9HWNDL45E=GS2.1.s1767637836$o1$g1$t1767637852$j44$l0$h0; _global_web_session=XqOCPYPoXO1inNCPCpCeg3G7gw4mt979drkYP9lJifaKzvd%2BzrWzArpqjWG4MfLbRfnJ%2FUrUlvXNUhvlcVBrmqu7WAlRjoXMjNtCIcufH6p3vjmBC21JsxuS5f18gKx5RJ2VpBZM8nsyw4I8GlfNtQ99tB5fY1GcBCVOP4snq00kkWtwXpBacKwlzMLmuknLX4dw2SyXDUZx7NultvxM4mvCRx8fLo6qw70nfiJQSIE1%2B7sSkcUTuYe1fKWu7ac%2BW1%2FMS2kS1aoBpWBYo3ndpyzEYS%2BcD3yENfur--p%2F%2Flh9GYlb%2BJGDsQ--dHE30EluJ2otVwHZ2GuplQ%3D%3D',
    'pragma': 'no-cache',
    'priority': 'u=0, i',
    'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
};

const TOPICS: Record<string, string[]> = {
    'Món chính': [
        // Heo
        'thịt kho tàu', 'sườn xào chua ngọt', 'ba chỉ rang cháy cạnh', 'thịt luộc cà pháo', 'chả lá lốt', 'nem rán (chả giò)',
        // Gà - Vịt
        'gà chiên nước mắm', 'gà luộc lá chanh', 'gà kho gừng', 'vịt om sấu', 'cánh gà sốt me',
        // Bò
        'bò kho', 'bò lúc lắc', 'bò xào thiên lý', 'thịt bò xào hành tây',
        // Hải sản & Cá
        'cá kho tộ', 'cá chiên xù', 'tôm rim thịt', 'mực xào cần tỏi', 'cá diêu hồng hấp xì dầu', 'chả cá thác lác chiên',
        // Khác
        'đậu hũ nhồi thịt', 'trứng chiên hành', 'mắm chưng'
    ],
    'Canh - Soup': [
        'canh chua cá lóc', 'canh bí đỏ thịt bằm', 'canh cua rau đay', 'canh sườn hầm rau củ',
        'canh rau ngót nấu tôm', 'canh bầu nấu tôm', 'canh mướp đắng nhồi thịt', 'canh kim chi',
        'canh khoai mỡ', 'canh ngao nấu chua', 'soup cua', 'soup gà nấm', 'lẩu thái hải sản'
    ],
    'Ăn sáng': [
        'phở bò tái', 'phở gà', 'bún bò huế', 'bánh mì ốp la', 'bánh mì chảo',
        'hủ tiếu nam vang', 'bún riêu cua', 'mì quảng', 'xôi mặn', 'xôi xéo',
        'bánh cuốn nóng', 'cơm tấm sườn bì chả', 'bún chả', 'bánh canh cua', 'cháo lòng'
    ],
    'Ăn vặt': [
        'bánh tráng trộn', 'bánh tráng nướng', 'ốc len xào dừa', 'khoai lang kén',
        'chân gà sả tắc', 'cút lộn xào me', 'nem chua rán', 'bắp xào tôm bơ',
        'khoai tây chiên', 'bò bía', 'gỏi cuốn tôm thịt', 'tô trái cây', 'bánh flan'
    ],
    'Salad - Gỏi': [
        'gỏi gà bắp cải', 'gỏi ngó sen tôm thịt', 'salad nga', 'gỏi xoài tôm khô',
        'nộm đu đủ bò khô', 'salad dầu giấm trứng', 'gỏi tai heo', 'nộm sứa', 'gỏi bưởi tôm thịt'
    ],
    'Món Chay': [ // Danh mục mới
        'đậu hũ sốt cà chua', 'nấm kho tiêu', 'rau củ luộc kho quẹt chay', 'canh chua chay',
        'mì xào rau nấm', 'đậu que xào tỏi', 'nem chay', 'cà tím kho tộ'
    ],
    'Tráng miệng': [ // Danh mục mới
        'chè thái sầu riêng', 'chè bưởi', 'sữa chua nếp cẩm', 'tàu hũ nước đường',
        'trà sữa trân châu', 'kem chuối', 'rau câu dừa', 'sinh tố bơ'
    ]
};


import { UserModel } from '../src/models/User';

const getSystemGroup = async () => {
    let group = await GroupModel.findOne({ name: 'System Crawlers' });
    if (!group) {
        // Find a user to be the owner
        let user = await UserModel.findOne({ email: 'a@gmail.com' });
        if (!user) {
            user = await UserModel.findOne({}); // Pick any user
        }
        if (!user) {
            // Create a system user if none exists
            user = await UserModel.create({
                _id: uuidv4(),
                name: 'System Admin',
                email: 'system@admin.com',
                password: 'system_password_hash' // Dummy hash
            });
            console.log('Created System Admin user');
        }

        group = await GroupModel.create({
            _id: uuidv4(),
            name: 'System Crawlers',
            ownerId: user._id
        });
        console.log('Created System Crawlers group');
    }
    return group;
};

const getGeneralCategory = async () => {
    let category = await CategoryModel.findOne({ name: 'General' });
    if (!category) {
        category = await CategoryModel.create({
            _id: uuidv4(),
            name: 'General'
        });
        console.log('Created General category');
    }
    return category;
};

const getOrCreateUnit = async (unitName: string, groupId: string) => {
    const normalizedName = unitName.toLowerCase().trim();
    if (!normalizedName) return await UnitModel.findOne({ name: 'unit' }) || await UnitModel.create({ _id: uuidv4(), name: 'unit' });

    // Try to find global unit or group unit
    let unit = await UnitModel.findOne({
        name: { $regex: new RegExp(`^${normalizedName}$`, 'i') }
    });

    if (!unit) {
        unit = await UnitModel.create({
            _id: uuidv4(),
            name: normalizedName,
            // groupId: groupId // If strict model requires groupId, add it.
        });
        // console.log(`Created Unit: ${normalizedName}`);
    }
    return unit;
};

const getOrCreateFood = async (foodName: string, categoryId: string, groupId: string, image?: string) => {
    const normalizedName = foodName.toLowerCase().trim();
    let food = await FoodModel.findOne({
        name: { $regex: new RegExp(`^${normalizedName}$`, 'i') },
        groupId: groupId
    });

    if (!food) {
        const defaultUnit = await getOrCreateUnit('unit', groupId);

        food = await FoodModel.create({
            _id: uuidv4(),
            name: foodName,
            categoryId: categoryId,
            unitId: defaultUnit._id,
            groupId: groupId,
            image: image || null
        });
        // console.log(`Created Food: ${foodName}`);
    }
    return food;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const crawlCookpad = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const systemGroup = await getSystemGroup();
        const generalCategory = await getGeneralCategory();

        for (const [topic, keywords] of Object.entries(TOPICS)) {
            console.log(`\n=== Processing Topic: ${topic} ===`);

            for (const keyword of keywords) {
                try {
                    console.log(`\n  Searching for: ${keyword}`);
                    const searchUrl = `${BASE_URL}/vn/tim-kiem/${encodeURIComponent(keyword)}`;

                    const response = await axios.get(searchUrl, { headers: HEADERS });
                    const $ = cheerio.load(response.data);

                    const recipeLinks: string[] = [];
                    // Limit to top 5 recipes per keyword
                    $('a.block-link__main').slice(0, 5).each((_, element) => {
                        const href = $(element).attr('href');
                        if (href) {
                            if (href.startsWith('/')) {
                                recipeLinks.push(BASE_URL + href);
                            } else if (href.startsWith('http')) {
                                recipeLinks.push(href);
                            }
                        }
                    });

                    console.log(`  Found ${recipeLinks.length} recipes for "${keyword}".`);

                    for (const link of recipeLinks) {
                        try {
                            // Check link processing...
                            console.log(`    Crawling: ${link}`);
                            const detailRes = await axios.get(link, { headers: HEADERS });
                            const $$ = cheerio.load(detailRes.data);

                            const title = $$('h1').text().trim();
                            if (!title) {
                                console.log('    Skipping: No title found.');
                                continue;
                            }

                            const checkExisting = await RecipeModel.findOne({ name: title, ownerType: 'global' });
                            if (checkExisting) {
                                console.log(`    Recipe already exists: ${title}`);
                                continue;
                            }

                            const imageSrc = $$('.tofu_image img').attr('src');

                            const ingredientsData: any[] = [];
                            const ingredientList = $$('.ingredient-list ol li');

                            for (let i = 0; i < ingredientList.length; i++) {
                                const el = ingredientList[i];
                                const amountText = $$(el).find('bdi').text().trim();
                                const nameText = $$(el).find('span').text().trim();

                                const match = amountText.match(/^([\d.,]+)\s*(.*)$/);
                                let quantity = 1;
                                let unitName = 'unit';

                                if (match) {
                                    quantity = parseFloat(match[1].replace(',', '.'));
                                    if (isNaN(quantity)) quantity = 1;
                                    unitName = match[2] || 'unit';
                                } else {
                                    const q = parseFloat(amountText.replace(',', '.'));
                                    if (!isNaN(q)) quantity = q;
                                }
                                if (!unitName || unitName.trim() === '') unitName = 'unit';

                                // Ensure valid name
                                if (!nameText) continue;

                                const unit = await getOrCreateUnit(unitName, systemGroup._id);
                                const food = await getOrCreateFood(nameText, generalCategory._id, systemGroup._id);

                                ingredientsData.push({
                                    foodId: food._id,
                                    quantity: quantity.toString(),
                                    unitId: unit._id
                                });
                            }

                            const steps: string[] = [];
                            $$('.step').each((_, stepEl) => {
                                const stepText = $$(stepEl).find('div[dir="auto"] p').text().trim();
                                if (stepText) steps.push(stepText);
                            });

                            const description = steps.length > 0 ? steps.join('\n\n') : `Món ngon: ${title}`;

                            await RecipeModel.create({
                                _id: uuidv4(),
                                name: title,
                                description: description,
                                ownerType: 'global',
                                ownerId: null,
                                groupId: null,
                                image: imageSrc || '',
                                ingredients: ingredientsData
                            });

                            console.log(`    Saved Recipe: ${title}`);
                            await delay(1000);

                        } catch (err: any) {
                            const errorMsg = `    Failed to process ${link}: ${err.message}`;
                            console.error(errorMsg);
                            try {
                                fs.appendFileSync('crawl_error.log', errorMsg + '\n');
                                if (err.errors) {
                                    const details = '    Validation Errors: ' + JSON.stringify(err.errors, null, 2);
                                    console.error(details);
                                    fs.appendFileSync('crawl_error.log', details + '\n');
                                }
                            } catch (fsErr) {
                                console.error('Error writing log file:', fsErr);
                            }
                        }
                    }
                    await delay(1000);
                } catch (e: any) {
                    console.error(`  Error searching keyword ${keyword}: ${e.message}`);
                }
            }
        }

        console.log('Crawling finished.');

    } catch (error) {
        console.error('Script failed:', error);
    } finally {
        await mongoose.disconnect();
    }
};

crawlCookpad();
