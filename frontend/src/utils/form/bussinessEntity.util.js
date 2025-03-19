export const getEntityFormValues = (entity = {}) => {
  return {
    name: entity.name || "",
    trn: entity.trn || "",
    description: entity.description || "",
    note: entity.note || "",
    website: entity.website || "",
    street1: entity.address?.street1 || "",
    street2: entity.address?.street2 || "",
    city: entity.address?.city || "",
    state: entity.address?.state || "",
    country: entity.address?.country || "",
    zipcode: entity.address?.zipcode || "",
    title: entity.contact?.title || "",
    firstname: entity.contact?.firstname || "",
    middlename: entity.contact?.middlename || "",
    lastname: entity.contact?.lastname || "",
    phone: entity.contact?.phone || "",
    email: entity.contact?.email || "",
    creditlimit: entity.creditlimit || 0,
    status: entity.status || "inactive",
  };
};

export const getEntityFormInputs = (updating, countries) => {
  const values = getEntityFormValues();

  if (!countries || !Array.isArray(countries)) {
    return;
  }

  const countryNames = countries.map((country) => country.name?.common);
  const sortedCountries = countryNames.sort((a, b) => a.localeCompare(b));

  return Object.keys(values).map((key) => {
    let obj = { id: key, name: key, disabled: updating };

    if (key === "description" || key === "note") {
      obj.type = "textarea";
    } else if (key === "country") {
      obj.type = "select";
      obj.children = sortedCountries;
      obj.default = "Select Country";
    } else if (key === "status") {
      obj.type = "select";
      obj.children = ["Active", "Inactive"];
      obj.default = "Select status";
    }

    return obj;
  });
};

export const entityFormLabels = [
  { name: "name", text: "Company Name" },
  { name: "trn", text: "Tax Registration No." },
  { name: "street1", text: "Address Line 1" },
  { name: "street2", text: "Address Line 2" },
  { name: "zipcode", text: "Zip/Postal Code" },
  { name: "title", text: "Contact Title" },
  { name: "firstname", text: "Contact First Name" },
  { name: "middlename", text: "Contact Middle Name" },
  { name: "lastname", text: "Contact Last Name" },
  { name: "phone", text: "Contact Mobile Number" },
];
