const getLoginType = (user) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(user) ? "email" : "username";
};

export const validateLogin = async (user, password) => {
  const loginType = getLoginType(user);

  try {
    let login = { url: "", type: "" };
    switch (loginType) {
      case "email":
        login = {
          url: "http://localhost:3001/api/validate/login/email",
          type: "email",
        };
        break;
      case "username":
        login = {
          url: "http://localhost:3001/api/validate/login/username",
          type: "username",
        };
        break;
      default:
        break;
    }

    const res = await fetch(login.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [login.type]: user, password }),
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
