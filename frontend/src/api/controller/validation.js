export const validateLogin = async (identifier, password) => {
  try {
    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();

    console.log(data.token);
    return data;
  } catch (error) {
    return;
  }
};

export const validateOnRegister = async (target) => {
  try {
    const res = await fetch("http://localhost:3001/api/validate-registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error", data.message);
    }

    return data.isValid;
  } catch (error) {
    console.error("Error", error);
  }
};
