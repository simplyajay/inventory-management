export const formatDate = (isoDateString, format = "mdy") => {
  try {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    if (format === "mdy") {
      return `${month}-${day}-${year}`;
    } else if (format === "dmy") {
      return `${day}-${month}-${year}`;
    } else {
      console.error("Invalid format");
      return "Invalid Date Format";
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const formatDocument = (documentType) => {
  try {
    switch (documentType) {
      case "purchase_order":
        return "Purchase Order";
      case "sales_order":
        return "Sales Order";
      case "invoice":
        return "Invoice";
      case "bill":
        return "Bill";
      case "return_order":
        return "Return Order";
      case "credit_note":
        return "Credit Note";
      case "quotation":
        return "Quotation";
      default:
        return "N/A";
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const formatAmount = (amount, geo) => {
  const formatted = new Intl.NumberFormat(geo.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${geo.currency} ${formatted}`;
};
