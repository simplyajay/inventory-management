const fetchTarget = async (url, targetName, target) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [targetName]: target }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Error", data.message);
  }
  return data.isValid; // isValid is an attribute of the response data from backend
};

export const validateEmail = (data) => {
  try {
    const isValid = fetchTarget(
      "http://localhost:3001/api/validate/reg/email",
      "email",
      data
    );
    return isValid;
  } catch (error) {
    console.error("Error", error);
  }
};

export const validateUsername = async (data) => {
  try {
    const isValid = fetchTarget(
      "http://localhost:3001/api/validate/reg/username",
      "username",
      data
    );
    return isValid;
  } catch (error) {
    console.error("Error", error);
  }
};
