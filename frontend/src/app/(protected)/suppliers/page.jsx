import React from "react";
import Suppliers from "./components/Suppliers";
import { cookies } from "next/headers";
import { getFetchOptions } from "@/services/options";
import { getSuppliers } from "@/services/api/supplier";

export const metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
  title: "Suppliers",
};

const SuppliersPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.NEXT_PUBLIC_TOKEN);
  const fetchOptions = getFetchOptions("GET", null, false, true, token.value);
  const data = await getSuppliers(fetchOptions);
  return (
    <div className="h-full w-full bg-white">
      <Suppliers data={data} />
    </div>
  );
};

export default SuppliersPage;
