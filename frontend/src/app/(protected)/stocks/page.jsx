import React from "react";
import Stocks from "./components/Stocks";
import { cookies } from "next/headers";
import { getFetchOptions } from "@/api/options";
import { getProducts } from "@/api/products";

export const metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
  title: "Stocks",
};

const StocksPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.NEXT_PUBLIC_TOKEN);
  const fetchOptions = getFetchOptions("GET", null, false, true, token.value);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await getProducts(fetchOptions);

  return (
    <div className="h-full w-full bg-background">
      <Stocks data={data} />
    </div>
  );
};

export default StocksPage;
