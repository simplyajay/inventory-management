import React from "react";
import { getSupplier } from "@/api/supplier";
import { getDocumentsByEntity } from "@/api/documents";
import { getFetchOptions } from "@/api/options";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getGeoData } from "@/utils/bussinessEntityForm.util";
import SupplierDetailLayout from "../components/SupplierDetailLayout";
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

  const documents = await getDocumentsByEntity(fetchOptions, supplier._id);
  const geoData = await getGeoData();

  return (
    <div className="w-full h-full bg-white">
      <SupplierDetailLayout supplier={supplier} documents={documents} geoData={geoData} />
    </div>
  );
};

export default SupplierDetailPage;
