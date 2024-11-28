export const getFetchOptions = (
  method = "GET",
  body,
  credentials = false,
  headers = false,
  token = null
) => {
  const options = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null, // null of not provided
  };

  if (credentials) {
    options.credentials = "include";
  }

  if (headers) {
    options.headers["authorization"] = `Bearer ${token}`;
  }

  return options;
};
