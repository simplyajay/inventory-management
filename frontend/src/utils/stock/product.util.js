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
