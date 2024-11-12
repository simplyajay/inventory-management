export const getProducts = async (id) => {
  try {
    const url = new URL("http://localhost:3001/api/products");
    url.searchParams.append("_id", id);

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

export const updateProduct = async (productID, product) => {
  try {
    const res = await fetch(`http://localhost:3001/api/products/${productID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

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
