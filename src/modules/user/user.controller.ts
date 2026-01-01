import { Request, Response } from "express";
import { UserModel } from "../../models/User";

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
}
