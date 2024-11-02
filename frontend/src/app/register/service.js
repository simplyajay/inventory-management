import { addOrganization } from "@/api/organizations";
import { addUser } from "@/api/users";

export const addNewOrg = async (orgData) => {
  const organization = await addOrganization(orgData);

  if (organization) {
    return organization._id;
  }
};

export const addNewUser = async (userData) => {
  try {
    const user = await addUser(userData);
    return user;
  } catch (error) {
    console.error(error);
  }
};
