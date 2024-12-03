export const getProductValues = (product) => {
  return {
    sku: product.sku,
    name: product.name,
    barcode: product.barcode,
    description: product.description,
    unitOfMeasurement: product.unitOfMeasurement,
    quantity: product.quantity,
    price: product.price,
  };
};

export const getNextAvailableSku = (products) => {
  const skus = products
    .map((product) => parseInt(product.sku, 10))
    .sort((a, b) => a - b);

  for (let i = 0; i < skus.length; i++) {
    if (skus[i] !== i + 1) {
      return i + 1;
    }
  }

  return skus.length + 1;
};
