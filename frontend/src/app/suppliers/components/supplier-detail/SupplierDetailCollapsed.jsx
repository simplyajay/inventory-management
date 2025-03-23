import React from "react";
import { ButtonCon, ButtonConfirmBlueLight } from "@/components/button/CustomButtons";
import { EditIcon } from "@/components/icons/Icons";

const SupplierDetailCollapsed = ({ supplier, onEdit }) => {
  const { name, address, contact, openbalance, totaloverdue } = supplier;
  const { city, street1 } = address;
  const { firstname, lastname, phone, email, website } = contact;
  const contactFullName = firstname && lastname ? `${firstname} ${lastname}` : null;

  return (
    <div className="w-full h-full flex flex-col sm:flex-row items-center overflow-hidden border-b border-gray-300">
      <div className="flex-1 h-full w-full flex flex-col md:flex-row p-4">
        <div className="flex-1 flex flex-col md:flex-row justify-around items-start gap-2">
          <div className="flex-1 flex md:flex-col flex-row md:justify-start md:items-start items-center md:gap-0 gap-3">
            <p className="text-responsive-xs text-gray-500">COMPANY NAME </p>
            <p className="text-responsive-sm font-semibold text-gray-700">{name}</p>
          </div>
          {(city || street1) && (
            <div className="flex-1 flex md:flex-col flex-row md:justify-start md:items-start items-center md:gap-0 gap-3">
              <p className="text-responsive-xs  text-gray-500">ADDRESS</p>
              <p className="text-responsive-sm text-gray-700">{`${
                city ? (street1 ? `${city}, ${street1}` : city) : street1 ? `${street1}` : ""
              }`}</p>
            </div>
          )}
          <div className="flex-1 flex flex-col md:flex-row md:gap-6 gap-2 justify-start flex-wrap sm:content-center">
            <span className="flex md:flex-col items-center md:items-start gap-3 md:gap-0">
              <p className="text-responsive-xs text-gray-500">OPEN BALANCE</p>
              <p className="text-responsive-sm  font-semibold">{openbalance}</p>
            </span>
            <span className="flex md:flex-col items-center md:items-start gap-3 md:gap-0">
              <p className="text-responsive-xs text-gray-500">TOTAL OVERDUE</p>
              <p className="text-responsive-sm font-semibold">{totaloverdue}</p>
            </span>
          </div>
        </div>

        <div className=" self-start">
          <ButtonConfirmBlueLight onClick={onEdit} icon={<EditIcon />} />
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailCollapsed;
