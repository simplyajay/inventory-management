import {
  HomeIcon,
  ProductIcon,
  SupplierIcon,
  DocumentIcon,
  PurchaseIcon,
  SaleIcon,
} from "../../icons/Icons";

export const overview = [
  {
    id: "dashboard",
    name: "Dashboard",
    link: "/dashboard",
    icon: <HomeIcon width={18} height={18} />,
  },
  {
    id: "products",
    name: "Stocks",
    link: "/stocks",
    icon: <ProductIcon width={18} height={18} />,
  },
  {
    id: "suppliers",
    name: "Suppliers",
    link: "/suppliers",
    icon: <SupplierIcon width={18} height={18} />,
  },
  {
    id: "documents",
    name: "Documents",
    link: "/documents",
    icon: <DocumentIcon width={18} height={18} />,
  },
  {
    id: "purchase",
    name: "Purchase",
    link: "/purchase",
    icon: <PurchaseIcon width={18} height={18} />,
  },
  {
    id: "sale",
    name: "Sale",
    link: "/sale",
    icon: <SaleIcon width={18} height={18} />,
  },
];
