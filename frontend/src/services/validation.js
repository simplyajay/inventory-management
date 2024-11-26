export const validateLogin = async (identifier, password) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      throw new Error("Response Status not OK");
    }

    const data = await res.json();
    if (!data.token) {
      throw new Error("No token provided");
    }

    return data;
  } catch (error) {
    return;
  }
};

export const validateOnRegister = async (target) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/validate-registration`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Error", data.message);
    }

    return data.isValid;
  } catch (error) {
    console.error("Error", error);
  }
};

export const logOutUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("logout error");
  }
};
