const requestAPI = async (endpoint) => {
  let headers = new Headers();
  const url = new URL(endpoint);
  headers.append("X-CSCAPI-KEY", process.env.NEXT_PUBLIC_CSC_API_KEY);

  const res = await fetch(url, {
    method: "GET",
    headers,
    redirect: "follow",
  });

  // const res = await fetch("https://restcountries.com/v3.1/all");

  return res;
};

export const getCountries = async () => {
  try {
    const res = await requestAPI("https://api.countrystatecity.in/v1/countries");
    const data = await res.json();

    return { countries: data, status: res.status };
  } catch (e) {
    console.error(e);
  }
};

export const getStates = async (ciso2) => {
  try {
    const res = await requestAPI(`https://api.countrystatecity.in/v1/countries/${ciso2}/states`);
    const data = await res.json();

    return { states: data, status: res.status };
  } catch (e) {
    console.error(e);
  }
};

export const getCities = async (ciso2, siso2) => {
  try {
    const res = await requestAPI(
      `https://api.countrystatecity.in/v1/countries/${ciso2}/states/${siso2}/cities`
    );
    const data = await res.json();

    return { cities: data, status: res.status };
  } catch (e) {
    console.error(e);
  }
};
