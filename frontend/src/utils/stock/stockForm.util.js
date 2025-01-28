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

export const getProductMetaData = (updating, updateForm) => {
  const metaData1 = [
    {
      name: "sku",
      disabled: updating,
    },
    {
      name: "name",
      disabled: updating,
    },
    {
      name: "barcode",
      disabled: updating,
    },
    {
      name: "description",
      disabled: updating,
      type: "textarea",
    },
  ];

  const metaData2 = [
    {
      name: "quantity",
      disabled: updateForm ? true : updating,
      customclass: "disabled:cursor-not-allowed",
    },
    {
      name: "price",
      disabled: updating,
    },
    {
      name: "unitOfMeasurement",
      disabled: updating,
      type: "select",
      children: ["PCS", "PKT", "CTN", "OTR"],
    },
  ];

  const combinedMetaDatas = [...metaData1, ...metaData2];

  return { metaData1, metaData2, combinedMetaDatas };
};
