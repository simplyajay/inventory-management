export const getFetchOptions = (
  method = "GET",
  body,
  credentials = false, // credential type request ( for client side )
  headers = false, // if header type request ( for server side )
  token = null,
  customHeaders = {}
) => {
  const options = {
    method: method,
    headers: { "Content-Type": "application/json", ...customHeaders },
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

export const getAllSpecify = (endpoint) => {};

export const getAll = (endpoint) => {};

export const getById = (endpoint) => {};

export const put = (endpoint) => {};

export const post = (endpoint) => {};

export const del = (endpoint) => {};
