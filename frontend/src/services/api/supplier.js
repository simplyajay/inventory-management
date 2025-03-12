export const getSuppliers = async (fetchOptions) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_URL}/api/suppliers`);

    fetchOptions.params &&
      Object.keys(fetchOptions.params).forEach((key) =>
        url.searchParams.append(key, fetchOptions.params[key])
      );

    const res = await fetch(url, fetchOptions);
    const data = await res.json();

    if (!res.ok) {
      console.error(data.message, res.status);
      return { status: res.status, message: data.message };
    }

    return data;
  } catch (error) {
    console.error("Error fetching suppliers", error);
    throw error;
  }
};

export const updateSupplier = async (fetchOptions) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/suppliers/update/${id}`,
      fetchOptions
    );
    if (!res.ok) {
      console.error(data.message, res.status);
      return { status: res.status, message: data.message };
    }

    const updatedSupplier = await res.json();
    return updatedSupplier;
  } catch (error) {
    console.error("Error updating supplier", error);
    throw error;
  }
};

export const addSupplier = async (fetchOptions) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/suppliers/add`, fetchOptions);

    if (!res.ok) {
      console.error(data.message, res.status);
      return { status: res.status, message: data.message };
    }

    const newSupplier = await res.json();
    return newSupplier;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};

//delete wont be implemented in this part
