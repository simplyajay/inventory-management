import { addOrganization } from "@/services/organizations";
import { addUser } from "@/services/registration";

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
