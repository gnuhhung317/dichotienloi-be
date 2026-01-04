import { faker } from '@faker-js/faker';

const BASE_URL = 'http://localhost:4000/api';
let TOKEN = '';
let USER_ID = '';

// Colors for console
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

async function request(method: string, endpoint: string, body?: any) {
    try {
        const headers: any = {
            'Content-Type': 'application/json',
        };
        if (TOKEN) {
            headers['Authorization'] = `Bearer ${TOKEN}`;
        }

        const options: any = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(`${BASE_URL}${endpoint}`, options);

        let data;
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await res.json();
        } else {
            data = await res.text();
        }

        return { status: res.status, data };
    } catch (error) {
        console.error(`${RED}Request Failed:${RESET}`, error);
        return { status: 0, data: null };
    }
}

function logResult(step: string, status: number, expected: number, data?: any) {
    if (status === expected) {
        console.log(`${GREEN}[PASS] ${step}${RESET}`);
    } else {
        console.log(`${RED}[FAIL] ${step} - Expected ${expected}, Got ${status}${RESET}`);
        if (data) console.log('Response:', JSON.stringify(data, null, 2));
    }
}

async function runAudit() {
    console.log(`${CYAN}Starting API Audit...${RESET}\n`);

    // 1. AUTH
    console.log(`${YELLOW}--- 1. Authentication ---${RESET}`);
    const email = `duchung@gmail.com`;
    const password = 'duchung';
    const name = faker.person.fullName();

    console.log(`[STEP] Registering user: ${email}`);
    const regRes = await request('POST', '/auth/register', { email, password, name });
    logResult('Register', regRes.status, 201, regRes.data);

    console.log(`[STEP] Login`);
    const loginRes = await request('POST', '/auth/login', { email, password });
    logResult('Login', loginRes.status, 200, loginRes.data);

    if (loginRes.status === 200) {
        TOKEN = loginRes.data.accessToken || loginRes.data.data?.accessToken;
        const userObj = loginRes.data.user || loginRes.data.data?.user;
        USER_ID = userObj?.id || userObj?._id;
        console.log(`Token acquired: ${TOKEN ? 'YES' : 'NO'}`);
    } else {
        console.error('Cannot proceed without token.');
        return;
    }

    console.log(`[STEP] Get Me`);
    const meRes = await request('GET', '/auth/me');
    logResult('Get Me', meRes.status, 200, meRes.data);

    // 1.1 Create Group
    console.log(`\n${YELLOW}--- 1.1 Group ---${RESET}`);
    console.log(`[STEP] Create Group`);
    const groupName = faker.company.name();
    const groupRes = await request('POST', '/group', { name: groupName });
    logResult('Create Group', groupRes.status, 201, groupRes.data);

    // 2. FOOD & CATEGORIES & UNITS
    console.log(`\n${YELLOW}--- 2. Food / Category / Unit ---${RESET}`);

    console.log(`[STEP] Get Foods`);
    const foodsRes = await request('GET', '/food');
    logResult('Get Foods', foodsRes.status, 200, foodsRes.data);

    let foodId = '';

    if (foodsRes.data && (foodsRes.data.data || Array.isArray(foodsRes.data))) {
        const list = Array.isArray(foodsRes.data) ? foodsRes.data : foodsRes.data.data;
        if (list.length > 0) {
            foodId = list[0]._id;
            console.log(`Using existing Food ID: ${foodId}`);
        } else {
            console.log('Food list empty.');
        }
    } else {
        console.log('No foods found or invalid format.');
    }

    // 3. FRIDGE
    console.log(`\n${YELLOW}--- 3. Fridge ---${RESET}`);
    if (foodId) {
        const fridgeItemPayload = {
            foodName: 'Test Food ' + Date.now(),
            quantity: 2,
            expiredAt: new Date(Date.now() + 86400000 * 5).toISOString()
        };

        console.log(`[STEP] Add to Fridge`);
        const addFridgeRes = await request('POST', '/fridge', fridgeItemPayload);
        logResult('Add to Fridge', addFridgeRes.status, 201, addFridgeRes.data);

        console.log(`[STEP] Get Fridge`);
        const fridgeRes = await request('GET', '/fridge');
        logResult('Get Fridge Items', fridgeRes.status, 200, fridgeRes.data);

        let fridgeItemId = '';
        if (addFridgeRes.status === 201) fridgeItemId = addFridgeRes.data.data?._id || addFridgeRes.data._id;

        if (fridgeItemId) {
            console.log(`[STEP] Take Out Fridge`);
            const takeOutRes = await request('PATCH', '/fridge', {
                itemId: fridgeItemId,
                quantity: 1,
                action: 'consume'
            });
            logResult('Take Out Fridge Item', takeOutRes.status, 200, takeOutRes.data);

            console.log(`[STEP] Delete Fridge`);
            const delFridgeRes = await request('DELETE', '/fridge', { itemId: fridgeItemId });
            logResult('Delete Fridge Item', delFridgeRes.status, 200, delFridgeRes.data);
        }
    } else {
        console.log('Skipping Fridge tests due to missing Food.');
    }

    // 4. SHOPPING
    console.log(`\n${YELLOW}--- 4. Shopping ---${RESET}`);
    if (foodId) {
        const shopPayload = {
            foodId: foodId,
            quantity: 5
        };
        console.log(`[STEP] Add to Shopping`);
        const addShopRes = await request('POST', '/shopping', shopPayload);
        logResult('Add to Shopping List', addShopRes.status, 201, addShopRes.data);

        console.log(`[STEP] Get Shopping`);
        const shopRes = await request('GET', '/shopping');
        logResult('Get Shopping List', shopRes.status, 200, shopRes.data);

        let shopItemId = '';
        if (addShopRes.status === 201) shopItemId = addShopRes.data.data?._id || addShopRes.data._id;

        if (shopItemId) {
            console.log(`[STEP] Mark Bought`);
            const markRes = await request('PUT', '/shopping/marker', { itemId: shopItemId, isBought: true });
            logResult('Mark as Bought', markRes.status, 200, markRes.data);

            console.log(`[STEP] Delete Shopping`);
            const delShopRes = await request('DELETE', '/shopping', { itemId: shopItemId });
            logResult('Delete Shopping Item', delShopRes.status, 200, delShopRes.data);
        }
    }

    // 5. RECIPE
    console.log(`\n${YELLOW}--- 5. Recipe ---${RESET}`);
    const recipePayload = {
        name: 'Test Recipe ' + Date.now(),
        description: 'Test Description',
        groupOnly: true
    };
    console.log(`[STEP] Create Recipe`);
    const createRecipeRes = await request('POST', '/recipe', recipePayload);
    logResult('Create Recipe', createRecipeRes.status, 201, createRecipeRes.data);

    let recipeId = '';
    if (createRecipeRes.status === 201) recipeId = createRecipeRes.data._id || createRecipeRes.data.data?._id;

    console.log(`[STEP] Get Recipes`);
    const getRecipesRes = await request('GET', '/recipe?groupOnly=true');
    logResult('Get Recipes', getRecipesRes.status, 200, getRecipesRes.data);

    if (recipeId) {
        console.log(`[STEP] Get Recipe By ID`);
        const getOneRecipe = await request('GET', `/recipe/${recipeId}`);
        logResult('Get Recipe By ID', getOneRecipe.status, 200, getOneRecipe.data);
    }

    // 6. MEAL
    console.log(`\n${YELLOW}--- 6. Meal ---${RESET}`);
    if (recipeId) {
        const mealPayload = {
            recipeId: recipeId,
            date: new Date().toISOString(),
            mealType: 'dinner'
        };
        console.log(`[STEP] Add Meal`);
        const addMealRes = await request('POST', '/meal', mealPayload);
        logResult('Add Meal to Plan', addMealRes.status, 201, addMealRes.data);

        const start = new Date();
        start.setDate(start.getDate() - 1);
        const end = new Date();
        end.setDate(end.getDate() + 7);

        console.log(`[STEP] Get Weekly Plan`);
        const getMealRes = await request('GET', `/meal?startDate=${start.toISOString()}&endDate=${end.toISOString()}`);
        logResult('Get Weekly Meal Plan', getMealRes.status, 200, getMealRes.data);
    }

    console.log(`\n${CYAN}Audit Complete.${RESET}`);
}

runAudit();
