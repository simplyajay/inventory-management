export const getAuthenticatedUser = async (fetchOptions) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user`,
      fetchOptions
    );
    if (!res.ok) {
      return null;
    }
    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};
