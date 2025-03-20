export const getCountries = async () => {
  try {
    let headers = new Headers();
    headers.append("X-CSCAPI-KEY", process.env.NEXT_PUBLIC_CSC_API_KEY);

    const res = await fetch("https://api.countrystatecity.in/v1/countries", {
      method: "GET",
      headers,
      redirect: "follow",
    });

    // const res = await fetch("https://restcountries.com/v3.1/all");

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
