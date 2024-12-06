import {
  HomeIcon,
  ProductIcon,
  SupplierIcon,
  DocumentIcon,
  PurchaseIcon,
  UserIcon,
  LogoutIcon,
  SaleIcon,
  Home2,
} from "../../icons/Icons";

export const overview = [
  {
    id: "dashboard",
    name: "Dashboard",
    link: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    id: "products",
    name: "Stocks",
    link: "/stocks",
    icon: <ProductIcon />,
  },
  {
    id: "suppliers",
    name: "Suppliers",
    link: "/suppliers",
    icon: <SupplierIcon />,
  },
  {
    id: "documents",
    name: "Documents",
    link: "/documents",
    icon: <DocumentIcon />,
  },
  {
    id: "purchase",
    name: "Purchase",
    link: "/purchase",
    icon: <PurchaseIcon />,
  },
  {
    id: "sale",
    name: "Sale",
    link: "/sale",
    icon: <SaleIcon />,
  },
];

export const account = [
  {
    id: "profile",
    name: "Profile",
    link: "/profile",
    icon: <UserIcon />,
  },
  {
    id: "logout",
    name: "Log Out",
    icon: <LogoutIcon />,
  },
];
