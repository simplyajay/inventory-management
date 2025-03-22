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
        <div className="flex-1 flex justify-around items-start">
          <div className="w-full flex-col gap-4">
            <p className="text-responsive-xs font-semibold text-gray-500">COMPANY NAME </p>
            <p className="text-responsive-md font-bold text-gray-700">{name}</p>
          </div>
          {(city || street1) && (
            <div className="w-full flex-col gap-4">
              <p className="text-responsive-xs font-semibold text-gray-500">ADDRESS</p>
              <p className="text-responsive-md font-medium text-gray-700">{`${
                city ? (street1 ? `${city}, ${street1}` : city) : street1 ? `${street1}` : ""
              }`}</p>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="w-full h-full flex flex-col items-start gap-1">
            <p className="text-responsive-xs font-semibold text-gray-500">CONTACT INFORMATION</p>
            <div>
              {contactFullName && (
                <p className="text-responsive-sm font-semibold text-gray-700">{contactFullName}</p>
              )}
              {email && <p className="text-responsive-sm font-semibold text-gray-700">{email}</p>}
              {phone && <p className="text-responsive-sm font-semibold text-gray-700">{phone}</p>}
            </div>
          </div>
        </div>
        <div className="p-1 self-start">
          <ButtonConfirmBlueLight onClick={onEdit} icon={<EditIcon />} />
        </div>
      </div>
      <div className="h-full w-full sm:w-auto flex flex-col md:flex-row gap-6 justify-start flex-wrap sm:content-center p-5">
        <span className="flex flex-col">
          <p className="text-responsive-xs font-semibold text-gray-500">OPEN BALANCE</p>
          <p className="text-responsive-sm  font-semibold">{openbalance}</p>
        </span>
        <span className="flex flex-col">
          <p className="text-responsive-xs font-semibold text-gray-500">TOTAL OVERDUE</p>
          <p className="text-responsive-sm font-semibold">{totaloverdue}</p>
        </span>
      </div>
    </div>
  );
};

export default SupplierDetailCollapsed;
