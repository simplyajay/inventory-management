import ActionButton from "@/components/table/TableAction";
import { EditIcon } from "@/components/icons/Icons";

export const tableHeaders = [
  { name: "COMPANY NAME", key: "name" },
  { name: "PHONE", key: "phone" },
  { name: "EMAIL", key: "email" },
  { name: "ADDRESS", key: "address" },
];

export const getSupplierTableActions = (handler) => {
  if (!handler) throw new Error("Missing handler");
  const tableActions = {
    name: "ACTIONS",
    key: "actions",
    components: [
      <ActionButton
        key={"edit"}
        onClick={(prod) => {
          handler({
            isEditForm: true,
            pageInfoVisible: true,
            selectedProduct: prod,
          });
        }}
        icon={<EditIcon />}
      />,
      <ActionButton
        key={"delete"}
        onClick={(prod) => {
          handler({
            showConfirmDialog: true,
            selectedProduct: prod,
            isEditForm: false,
            pageInfoVisible: false,
          });
        }}
        icon={<DeleteIcon />}
      />,
    ],
  };

  return tableActions;
};
