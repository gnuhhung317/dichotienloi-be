import { GroupModel } from "../../models/Group";
import { GroupMemberModel } from "../../models/GroupMember"

export class GroupService {
  static async createGroup(userId: string, name: string) {
    const existingMembership = await GroupMemberModel.findOne({ userId });

    if (existingMembership) {
      throw new Error("USER_ALREADY_IN_GROUP");
    }

    if (!name) {
      throw new Error("GROUP_NAME_REQUIRED");
    }

    const group = await GroupModel.create({
      name,
      ownerId: userId
    });

    await GroupMemberModel.create({
      groupId: group._id,
      userId,
      role: "owner"
    });

    return group;
  }
}