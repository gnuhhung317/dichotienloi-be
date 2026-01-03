import { GroupModel } from "../../models/Group";
import { GroupMemberModel } from "../../models/GroupMember"
import { UserModel } from "../../models/User";

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

  static async addUserToGroup(requesterId: string, targetUserId: string) {
    const requesterMembership = await GroupMemberModel.findOne({
      userId: requesterId
    });

    if (!requesterMembership) {
      throw new Error("REQUESTER_NOT_IN_GROUP");
    }

    const user = await UserModel.findById(targetUserId);
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const existingMembership = await GroupMemberModel.findOne({ userId: targetUserId });
    if (existingMembership) {
      throw new Error("USER_ALREADY_IN_GROUP");
    }

    const member = await GroupMemberModel.create({
      groupId: requesterMembership.groupId,
      userId: targetUserId,
      role: "member"
    });

    return member;
  }

  static async deleteGroupMember(requesterId: string, targetUserId: string) {
    const requesterMembership = await GroupMemberModel.findOne({
      userId: requesterId
    });

    if (!requesterMembership) {
      throw new Error("REQUESTER_NOT_IN_GROUP");
    }

    if (requesterMembership.role !== "owner") {
      throw new Error("ONLY_OWNER_CAN_DELETE_MEMBER");
    }

    if (requesterId === targetUserId) {
      throw new Error("OWNER_CANNOT_REMOVE_SELF");
    }

    const targetMembership = await GroupMemberModel.findOne({
      userId: targetUserId,
      groupId: requesterMembership.groupId
    });

    if (!targetMembership) {
      throw new Error("USER_NOT_IN_SAME_GROUP");
    }

    await GroupMemberModel.deleteOne({
      userId: targetUserId,
      groupId: requesterMembership.groupId
    });
  }

  static async getMyGroupMembers(userId: string) {
    const membership = await GroupMemberModel.findOne({ userId });

    if (!membership) {
      throw new Error("USER_NOT_IN_GROUP");
    }

    // Lấy thông tin group
    const group = await GroupModel.findById(membership.groupId);

    // Lấy members và populate user info
    const members = await GroupMemberModel.find({
      groupId: membership.groupId
    })
    .populate('userId', 'name email')
    .sort({ joinedAt: 1 });

    return {
      group,
      members
    };
  }
}