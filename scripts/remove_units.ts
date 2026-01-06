import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UnitModel } from '../src/models/Unit';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dichotienloi';

const removeUnits = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('🔌 Connected to MongoDB');

        // IDs of units to remove
        const unitsToRemove = [
            'e045f6f0-ab65-4a4c-bd1d-e119249b4799',
            'bf0aa24d-099a-4471-b765-2d0415fe36b5',
            'fec01e84-b4bc-407c-b718-b40dac925ee1'
        ];

        console.log(`\n🗑️  Removing ${unitsToRemove.length} units...\n`);

        for (const unitId of unitsToRemove) {
            const unit = await UnitModel.findById(unitId);
            
            if (unit) {
                console.log(`Removing: ID=${unitId}, Name="${unit.name}"`);
                await UnitModel.deleteOne({ _id: unitId });
                console.log(`✅ Removed successfully`);
            } else {
                console.log(`⚠️  Unit not found: ${unitId}`);
            }
        }

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('✅ Removal completed!');
        console.log('═══════════════════════════════════════════════════════\n');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
};

removeUnits();
