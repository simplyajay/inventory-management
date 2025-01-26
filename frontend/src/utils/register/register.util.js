import { createUser, createOrganization } from "@/services/api/registration";

export const addNewOrg = async (orgData) => {
  const organization = await createOrganization(orgData);

  if (organization) {
    return organization._id;
  }
};

export const addNewUser = async (userData) => {
  try {
    const user = await createUser(userData);
    return user;
  } catch (error) {
    console.error(error);
  }
};
