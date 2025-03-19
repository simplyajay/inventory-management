export const getCountries = async () => {
  try {
    //access the country name from data.name.common
    const res = await fetch("https://restcountries.com/v3.1/all");

    if (!res.ok) {
      console.error("error fetching countries");
      return res.status;
    }
    const data = await res.json();

    return { countries: data, status: res.status };
  } catch (e) {
    console.error(e);
  }
};
