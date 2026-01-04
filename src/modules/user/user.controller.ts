import { Request, Response } from "express";
import { UserModel } from "../../models/User";
import { GroupService } from "../group/group.service";
import { comparePassword, hashPassword } from "../../utils/password";

export class UserController {
  // GET /user/
  static async getMe(req: any, res: Response) {
    const user = await UserModel.findById(req.user.userId).select(
      "-passwordHash"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  }

  // PUT /user/ - Update user profile
  static async updateMe(req: any, res: Response) {
    try {
      const userId = req.user.userId;
      const { name, email } = req.body;

      const updateData: any = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;

      const user = await UserModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      ).select("-passwordHash");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Change password
  static async changePassword(req: any, res: Response) {
    try {
      const userId = req.user.userId;
      const { oldPassword, newPassword } = req.body;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await comparePassword(oldPassword, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      await UserModel.findByIdAndUpdate(
        userId,
        { passwordHash: await hashPassword(newPassword) }
      );

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // DELETE /user/
  static async deleteMe(req: any, res: Response) {
    try {
      const userId = req.user.userId;
      await UserModel.findByIdAndDelete(userId);

      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // POST /user/group
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

  // POST /user/group/add
  static async addUserToGroup(req: any, res: Response) {
    try {
      const ownerId = req.user.userId;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }

      const member = await GroupService.addUserToGroup(ownerId, userId);

      res.status(201).json(member);
    } catch (err: any) {
      switch (err.message) {
        case "REQUESTER_NOT_IN_GROUP":
          return res.status(403).json({ message: "Requester is not in the group" });

        case "USER_NOT_FOUND":
          return res.status(404).json({ message: "User not found" });

        case "USER_ALREADY_IN_GROUP":
          return res.status(409).json({ message: "User already belongs to a group" });

        default:
          return res.status(500).json({ message: "Server error" });
      }
    }
  }

  // DELETE /user/group
  static async deleteGroupMember(req: any, res: Response) {
    try {
      const requesterId = req.user.userId;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }

      await GroupService.deleteGroupMember(requesterId, userId);

      res.json({ message: "Member removed from group" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // GET /user/group
  static async getMyGroup(req: any, res: Response) {
    try {
      const userId = req.user.userId;

      const members = await GroupService.getMyGroupMembers(userId);

      res.json(members);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
