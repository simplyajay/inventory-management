import { User } from "../../models/models.js";

export const getOrgId = async (id) => {
  try {
    const user = await User.findOne({ _id: id }).select("-password");
    const orgId = user._orgId ? user._orgId : user._id;
    return orgId;
  } catch (error) {
    console.error("Error at getOrgId", error);
  }
};
