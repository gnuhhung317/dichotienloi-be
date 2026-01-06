import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UnitModel } from '../src/models/Unit';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dichotienloi';

const fixUnits = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('🔌 Connected to MongoDB');

        // List of problematic unit IDs
        const problematicUnitIds = [
            '3115c578-82f2-4a40-88ed-2876450f7846',
            'e045f6f0-ab65-4a4c-bd1d-e119249b4799',
            '4180ba87-b6a5-40cd-b255-cc9fe2c02ca2',
            'ede28a23-f210-4cc0-89e1-d6f18bc39ebb',
            '9d5bd2d2-d43e-4095-bb2b-fa1350d6269c',
            'abdd47bc-34d3-4f19-ae9b-a6afb7c5877f',
            '9790e88e-62b6-4c31-af2f-8e9619b180f0',
            'e76f4f7c-a2ae-4299-b4dc-bad1be8f865c',
            '1d748cfc-703b-4a4a-8d60-c6d72553904a',
            'c9956722-01b7-47c4-a0d2-09aa878843a7',
            '757e6d22-bb87-4430-80db-1964e5ecba5e',
            '7bd1c336-8642-4965-ae20-6bfe1d9d2324',
            '9de7b73d-156c-4d67-84e7-d8c3f142e6e4',
            'e3e04ff9-55b1-47d8-80de-29877f0eb0ed',
            '9e6ff9ea-b6f0-4286-8817-ef52557fc0ed',
            '70cb4200-bbe3-418a-8ea8-e813ed3885a8',
            '6f30800a-9061-4fd8-8617-39b9a2d14d95',
            'e806f9fb-0722-4a0c-986f-e3cc964f2484',
            'b3ebac3e-61a9-41c2-8ab4-d5312fb65614',
            'fd9955aa-4673-4d5f-b63c-0213469f69d9',
            '49f504a6-36be-4833-9967-94317797160c',
            '1b668f6b-db10-48f9-bcd5-0a9bf367d927',
            '3adda714-9b25-4925-8563-6d354435668a',
            '522f1a04-6f2a-4807-9ec0-931018a08dd0',
            'ce8c1b46-3f1f-4507-bd39-98ddb783e1a0',
            'a8bc7938-1b2e-4c25-bc3c-94144812f917',
            'bf0aa24d-099a-4471-b765-2d0415fe36b5',
            'be404fe1-98b8-4b64-b526-6a6928c22598',
            'e91df306-de06-4c09-a3cc-6b7a9bd86fd4',
            'f8f7acc6-6c5e-49c5-8d63-c5d4fb605df8',
            'fec01e84-b4bc-407c-b718-b40dac925ee1',
            'beadd6f8-c38a-4534-9f8c-66ae2ae1c851',
            'c38b4421-5c47-4186-9000-3628a67f3c33',
            'cafd8225-b6ce-4704-bc70-bb038efae526',
            '096cc434-60e1-4c4f-8d11-d0f16cfbb5f0',
            'fb8d8e90-0d7e-45b8-ac83-3fb52f41f0d1',
            '0b56bdb6-70ab-489a-98d4-68bf6cd106f5',
            'c281fe06-af42-4a00-a965-c96c1f801bbe',
            '99b034d1-56ac-4f91-bf44-522c22faf48a',
            '4a114dbd-08e3-4d7e-8311-7178d54c0e85',
            'de621b3d-6b46-4670-acd8-0d4b4e216898',
            'df625c8c-85d9-49d8-9b12-179cbb395eb5',
            '0fcc19b7-857d-4d6b-803a-539af2622d08',
            'd6cdb54c-6849-4f7b-9a8d-eef8e6dee57f'
        ];

        console.log(`\n🔧 Fixing ${problematicUnitIds.length} units...\n`);

        let successCount = 0;
        let errorCount = 0;

        for (const unitId of problematicUnitIds) {
            try {
                const unit = await UnitModel.findById(unitId);
                
                if (!unit) {
                    console.log(`⚠️  Unit not found: ${unitId}`);
                    errorCount++;
                    continue;
                }

                const oldName = unit.name;
                let newName = oldName;

                // Remove leading "-" or "/-" patterns
                newName = newName.replace(/^\/?\d*-/, '');

                // If only numbers and spaces remain, change to "cái"
                if (/^\d+\s*$/.test(newName.trim())) {
                    newName = 'cái';
                }

                // Update the unit
                unit.name = newName.trim();
                await unit.save();

                console.log(`✅ Fixed: "${oldName}" → "${newName}"`);
                successCount++;

            } catch (error: any) {
                console.log(`❌ Error fixing unit ${unitId}:`, error.message);
                errorCount++;
            }
        }

        console.log('\n═══════════════════════════════════════════════════════');
        console.log(`✅ Successfully fixed: ${successCount} units`);
        console.log(`❌ Errors: ${errorCount} units`);
        console.log('═══════════════════════════════════════════════════════\n');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
};

fixUnits();
