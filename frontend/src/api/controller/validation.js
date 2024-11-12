export const validateLogin = async (identifier, password) => {
  try {
    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return;
  }
};

export const validateOnRegister = async (target) => {
  try {
    const res = await fetch("http://localhost:3001/api/register", {
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
