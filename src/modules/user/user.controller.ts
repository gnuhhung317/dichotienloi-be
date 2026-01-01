import { Request, Response } from "express";
import { UserModel } from "../../models/User";
import { GroupService } from "../group/group.service";

export class UserController {
  // GET /users/me
  static async getMe(req: any, res: Response) {
    const user = await UserModel.findById(req.user.userId).select(
      "-passwordHash"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  }

  // DELETE /users/:id
  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    await UserModel.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  }

  // POST /users/group
  static async createGroup(req: any, res: Response) {
    try {
      const userId = req.user.userId;
      const { name } = req.body;

      const group = await GroupService.createGroup(userId, name);

      res.status(201).json(group);
    } catch (err: any) {
      switch (err.message) {
        case "GROUP_NAME_REQUIRED":
          return res.status(400).json({ message: "Group name is required" });

        case "USER_ALREADY_IN_GROUP":
          return res.status(409).json({ message: "User already belongs to a group" });

        default:
          return res.status(500).json({ message: "Server error" });
      }
    }
  }
}
