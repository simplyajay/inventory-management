export const getProducts = async (fetchOptions) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/api/stocks`);

    fetchOptions.params &&
      Object.keys(fetchOptions.params).forEach((key) =>
        url.searchParams.append(key, fetchOptions.params[key])
      );

    const res = await fetch(url, fetchOptions);

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        return { status: res.status, message: "Unauthorized" };
      }
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

export const updateProduct = async (fetchOptions, id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/stocks/update/${id}`,
      fetchOptions
    );
    if (!res.ok) {
      throw new Error("Error updating product");
    }

    const updatedProduct = await res.json();
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

export const addProduct = async (fetchOptions) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/stocks/add`,
      fetchOptions
    );
    if (!res.ok) {
      throw new Error("Error adding product", res.status);
    }

    const newProduct = await res.json();
    return newProduct;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};

export const deleteProduct = async (fetchOptions, id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/stocks/delete/${id}`,
      fetchOptions
    );
    if (!res.ok) {
      throw new Error("Error deleting product", res.status);
    }

    const newProduct = await res.json();
    return newProduct;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};
