import Product from "../../models/product.model";

export const generateSKU = async (user) => {
  try {
    const products = Product.find(
      { _orgId: user._orgId },
      { documentId: 1 }
    ).lean();

    const skus = products.map((product) => parseInt(product.sku));

    const nextSku = skus.length > 0 ? Math.max(...skus) + 1 : 1;

    if (!nextSku) {
      throw new Error("Product Error");
    }

    return nextSku;
  } catch (error) {
    throw new Error("Server Error", error);
  }
};
