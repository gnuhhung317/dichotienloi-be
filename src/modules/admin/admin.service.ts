import { CategoryModel } from "../../models/Category";
import { UnitModel } from "../../models/Unit";

export class AdminService {
// Category Management

  static async createCategory(name: string) {
    const existing = await CategoryModel.findOne({
      name: name.trim()
    });

    if (existing) {
      throw new Error("CATEGORY_ALREADY_EXISTS");
    }

    const category = await CategoryModel.create({
      name: name.trim()
    });

    return category;
  }

  static async getCategory() {
    return CategoryModel.find().sort({ name: 1 });
  }

  static async editCategory(oldName: string, newName: string) {
    const oldTrimmed = oldName.trim();
    const newTrimmed = newName.trim();

    if (oldTrimmed === newTrimmed) {
      throw new Error("NAME_NOT_CHANGED");
    }

    const category = await CategoryModel.findOne({
      name: oldTrimmed
    });

    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }

    const existing = await CategoryModel.findOne({
      name: newTrimmed
    });

    if (existing) {
      throw new Error("NEW_CATEGORY_NAME_ALREADY_EXISTS");
    }

    category.name = newTrimmed;
    await category.save();

    return category;
  }

  static async deleteCategory(name: string) {
    const trimmedName = name.trim();

    const category = await CategoryModel.findOne({
      name: trimmedName
    });

    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }

    await CategoryModel.deleteOne({
      _id: category._id
    });
  }

// Unit Management
  static async createUnit(unitName: string) {
    const existing = await UnitModel.findOne({
      name: unitName.trim()
    });

    if (existing) {
      throw new Error("UNIT_ALREADY_EXISTS");
    }

    const unit = await UnitModel.create({
      name: unitName.trim()
    });

    return unit;
  }

  static async getUnit() {
    return UnitModel.find().sort({ name: 1 });
  }

  static async editUnit(oldName: string, newName: string) {
    const oldTrimmed = oldName.trim();
    const newTrimmed = newName.trim();

    if (oldTrimmed === newTrimmed) {
      throw new Error("NAME_NOT_CHANGED");
    }

    const unit = await UnitModel.findOne({
      name: oldTrimmed
    });

    if (!unit) {
      throw new Error("UNIT_NOT_FOUND");
    }

    const existing = await UnitModel.findOne({
      name: newTrimmed
    });

    if (existing) {
      throw new Error("NEW_UNIT_NAME_ALREADY_EXISTS");
    }

    unit.name = newTrimmed;
    await unit.save();
    return unit;
  }

  static async deleteUnit(unitName: string) {
    const trimmedName = unitName.trim();

    const unit = await UnitModel.findOne({
      name: trimmedName
    });

    if (!unit) {
      throw new Error("UNIT_NOT_FOUND");
    }

    await UnitModel.deleteOne({
      _id: unit._id
    });
  }
}
