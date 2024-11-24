export const addUser = async (user) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
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
