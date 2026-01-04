import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export class AdminController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await AdminService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      await AdminService.deleteUserById(userId);
      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { email, password, name, role } = req.body;
      await AdminService.createUser(email, password, name, role);
      res.json({ message: "User created successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const updateData = req.body;
      await AdminService.updateUser(userId, updateData);
      res.json({ message: "User updated successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ message: "NAME_REQUIRED" });
      }

      const category = await AdminService.createCategory(name);

      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getCategory(req: Request, res: Response) {
    try {
      const categories = await AdminService.getCategory();
      res.json(categories);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async editCategory(req: Request, res: Response) {
    try {
      const { oldName, newName } = req.body;

      if (!oldName || !newName) {
        return res.status(400).json({ message: "OLD_NAME_AND_NEW_NAME_REQUIRED" });
      }

      const category = await AdminService.editCategory(oldName, newName);

      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ message: "NAME_REQUIRED" });
      }

      await AdminService.deleteCategory(name);

      res.json({ message: "CATEGORY_DELETED" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async createUnit(req: Request, res: Response) {
    try {
      const { unitName } = req.body;

      if (!unitName || !unitName.trim()) {
        return res.status(400).json({ message: "NAME_REQUIRED" });
      }

      const unit = await AdminService.createUnit(unitName);
      res.status(201).json(unit);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getUnit(req: Request, res: Response) {
    try {
      const units = await AdminService.getUnit();
      res.json(units);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async editUnit(req: Request, res: Response) {
    try {
      const { oldName, newName } = req.body;

      if (!oldName || !newName) {
        return res.status(400).json({ message: "OLD_NAME_AND_NEW_NAME_REQUIRED" });
      }

      const unit = await AdminService.editUnit(oldName, newName);

      res.json(unit);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteUnit(req: Request, res: Response) {
    try {
      const { unitName } = req.body;

      if (!unitName || !unitName.trim()) {
        return res.status(400).json({ message: "NAME_REQUIRED" });
      }

      await AdminService.deleteUnit(unitName);

      res.json({ message: "UNIT_DELETED" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}