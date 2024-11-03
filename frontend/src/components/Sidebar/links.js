import {
  HomeIcon,
  ProductIcon,
  SupplierIcon,
  DocumentIcon,
  PurchaseIcon,
  UserIcon,
  SettingsIcon,
  LogoutIcon,
  SaleIcon,
} from "../Icons/Icons";

export const overview = [
  {
    id: "dashboard",
    name: "Dashboard",
    link: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    id: "products",
    name: "Products",
    link: "/products",
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
    icon: <UserIcon />,
  },
  {
    id: "logout",
    name: "Log Out",
    link: "/login",
    icon: <LogoutIcon />,
    hasFunction: true,
  },
];
