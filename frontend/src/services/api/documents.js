export const getDocuments = async (fetchOptions) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/api/documents`);

    fetchOptions.params &&
      Object.keys(fetchOptions.params).forEach((key) =>
        url.searchParams.append(key, fetchOptions.params[key])
      );

    const res = await fetch(url, fetchOptions);

    const data = await res.json();

    if (!res.ok) {
      return { status: res.status, message: data.message };
    }

    return data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

export const getDocumentsByEntity = async (fetchOptions, entityId) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/api/documents/entity/${entityId}`);

    fetchOptions.params &&
      Object.keys(fetchOptions.params).forEach((key) =>
        url.searchParams.append(key, fetchOptions.params[key])
      );

    const res = await fetch(url, fetchOptions);

    const data = await res.json();

    if (!res.ok) {
      return { status: res.status, message: data.message, error: data.error };
    }

    return data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};
