export const createUser = async (user) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error("Failed to create user");
    }
  } catch (error) {
    console.error("Error creating user", error);
  }
};

export const createOrganization = async (org) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/organizations`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(org),
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error("Failed to create organization");
    }
  } catch (error) {
    console.error("Error creating organization", error);
  }
};
