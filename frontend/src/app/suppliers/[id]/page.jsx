import React from "react";
import { getSupplier } from "@/services/api/supplier";
import { getFetchOptions } from "@/services/options";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import SupplierDetail from "../components/SupplierDetailLayout";
export const metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
  title: "Suppliers | Detail",
};

const SupplierDetailPage = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.NEXT_PUBLIC_TOKEN);
  const fetchOptions = getFetchOptions("GET", null, false, true, token.value);
  const supplier = await getSupplier(fetchOptions, params.id);

  if (!supplier) {
    return notFound();
  }

  return (
    <div className="w-full h-full p-4 overflow-hidden">
      <SupplierDetail supplier={supplier} />
    </div>
  );
};

export default SupplierDetailPage;
