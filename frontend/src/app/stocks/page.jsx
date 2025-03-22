import React from "react";
import Stocks from "./components/Stocks";

export const metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
  title: "Stocks",
};

const StocksPage = () => {
  const StocksMemo = React.memo(Stocks);
  return (
    <div className="h-full w-full bg-white">
      <StocksMemo />
    </div>
  );
};

export default StocksPage;
