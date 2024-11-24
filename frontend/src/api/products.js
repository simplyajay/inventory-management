export const getProducts = async (id) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/api/stocks`);
    url.searchParams.append("_id", id);
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

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

export const updateProduct = async (productId, product) => {
  try {
    const prod = { ...product, _id: productId };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products/${productId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(prod),
      }
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
