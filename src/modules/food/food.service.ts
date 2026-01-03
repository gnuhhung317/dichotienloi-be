import { FoodModel } from "../../models/Food";
import { GroupMemberModel } from "../../models/GroupMember";
import { CategoryModel } from "../../models/Category";
import { UnitModel } from "../../models/Unit";

export class FoodService {
    static async createFood(userId: string, name: string, categoryName: string, unitName: string, file: any) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }

        const category = await CategoryModel.findOne({
            name: categoryName.trim()
        });
        if (!category) {
            throw new Error("CATEGORY_NOT_FOUND");
        }

        const unit = await UnitModel.findOne({
            name: unitName.trim()
        });
        if (!unit) {
            throw new Error("UNIT_NOT_FOUND");
        }

        return FoodModel.create({
            name: name.trim(),
            categoryId: category._id,
            unitId: unit._id,
            groupId: membership.groupId,
        });
    }
}
