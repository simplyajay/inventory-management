export const validateOnRegister = async (fetchOptions) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/validate-registration`,
      fetchOptions
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

export const validateLogin = async (fetchOptions) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/login`,
      fetchOptions
    );

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

export const logOutUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("logout error");
  }
};

export const getAuthenticatedUser = async (fetchOptions) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user`,
      fetchOptions
    );
    if (!res.ok) {
      return null;
    }
    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};
