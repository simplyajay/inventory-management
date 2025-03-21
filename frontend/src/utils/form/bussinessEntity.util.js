import { getCountries, getStates, getCities } from "@/services/api/csc";

export const getEntityFormValues = (entity = {}) => {
  // ALWAYS DEFINE 'default' AS DEFAULT VALUE FOR A FIELD INTENDED TO BE A SELECT TAG

  return {
    name: entity.name || null,
    trn: entity.trn || null,
    description: entity.description || null,
    note: entity.note || null,
    website: entity.website || null,
    address: {
      street1: entity.address?.street1 || null,
      street2: entity.address?.street2 || null,
      country: entity.address?.country || "default",
      state: entity.address?.state || null,
      city: entity.address?.city || null,
      zip: entity.address?.zip || null,
    },
    contact: {
      title: entity.contact?.title || null,
      firstname: entity.contact?.firstname || null,
      middlename: entity.contact?.middlename || null,
      lastname: entity.contact?.lastname || null,
      phone: entity.contact?.phone || null,
      email: entity.contact?.email || null,
    },
    creditlimit: entity.creditlimit || 0,
    status: entity.status || "default",
  };
};

export const entityFormLabels = [
  { name: "name", text: "Company Name" },
  { name: "trn", text: "Tax Registration No." },
  { name: "address.street1", text: "Address Line 1" },
  { name: "address.street2", text: "Address Line 2" },
  { name: "address.country", text: "Country" },
  { name: "address.state", text: "State" },
  { name: "address.city", text: "City" },
  { name: "address.zip", text: "Zip/Postal Code" },
  { name: "contact.title", text: "Contact Title" },
  { name: "contact.firstname", text: "Contact First Name" },
  { name: "contact.middlename", text: "Contact Middle Name" },
  { name: "contact.lastname", text: "Contact Last Name" },
  { name: "contact.phone", text: "Contact Mobile Number" },
  { name: "creditlimit", text: "Credit Limit" },
];

export const getEntityFormComponents = (values, geoData) => {
  if (!geoData) {
    return;
  }

  const countries = geoData.countries?.map((country) => ({
    key: country.iso2,
    value: `${country.name} (${country.iso2})`,
  }));

  const sortedCountries = countries.sort((a, b) => a.value.localeCompare(b.value));

  return Object.keys(values).flatMap((key) => {
    let obj = { id: key, name: key };

    if (key === "description" || key === "note") {
      obj.type = "textarea";
    } else if (key === "address") {
      return Object.keys(values[key]).map((k) => {
        obj = { id: `address.${k}`, name: `address.${k}` };
        if (k === "country") {
          obj.type = "select";
          obj.children = sortedCountries;
          obj.default = { key: "default", value: "-- Select Country --" };
        }
        return obj;
      });
    } else if (key === "contact") {
      return Object.keys(values[key]).map((k) => {
        obj = { id: `contact.${k}`, name: `contact.${k}` };
        return obj;
      });
    } else if (key === "status") {
      obj.type = "select";
      obj.children = [
        { key: "active", value: "Active" },
        { key: "inactive", value: "Inactive" },
      ];
      obj.default = { key: "default", value: "-- Select Status --" };
    }

    return obj;
  });
};

export const getGeoData = async () => {
  try {
    const data = await getCountries();
    return { countries: data.countries, status: data.status };
  } catch (e) {
    console.error(e);
    return { countries: [], status: 500 };
  }
};
