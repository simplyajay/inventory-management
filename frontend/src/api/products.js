export const getProducts = async () => {
  return await fetch("http://localhost:3001/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("error fetching products", error);
    });
};
