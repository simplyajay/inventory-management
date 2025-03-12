import React from "react";
import Stocks from "./components/Stocks";

export const metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
  title: "Stocks",
};

const StocksPage = () => {
  const StocksMemo = React.memo(Stocks);
  return (
    <div className="h-full p-4">
      <StocksMemo />
    </div>
  );
};

export default StocksPage;
