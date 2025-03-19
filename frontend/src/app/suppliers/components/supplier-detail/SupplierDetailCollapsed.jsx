import React from "react";
import { ButtonConfirmBlue } from "@/components/button/CustomButtons";
import { EditIcon } from "@/components/icons/Icons";

const SupplierDetailCollapsed = ({ supplier, onEdit }) => {
  const { name, address, contact, openbalance, totaloverdue } = supplier;
  const { city, street1 } = address;
  const { firstname, lastname, phone, email, website } = contact;
  const contactFullName = firstname && lastname ? `${firstname} ${lastname}` : null;

  return (
    <div className="w-full h-full flex flex-col sm:flex-row gap-2 items-center bg-transparent overflow-hidden">
      <div className="flex-1 h-full w-full flex flex-col md:flex-row bg-white shadow-sm">
        <div className="flex-1 flex flex-col justify-between p-5 gap-2">
          <div className="w-full flex-col gap-2">
            <p className="text-responsive-xs font-semibold text-gray-500">COMPANY NAME </p>
            <p className="text-responsive-lg font-bold text-gray-700">{name}</p>
          </div>
          <div className="w-full flex-col gap-2">
            <p className="text-responsive-xs font-semibold text-gray-500">ADDRESS</p>
            <p className="text-responsive-md font-medium text-gray-700">{`${
              street1 ? `${city}, ${street1}` : city
            }`}</p>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full h-full p-5 flex flex-col gap-2">
            <p className="text-responsive-xs font-semibold text-gray-500">CONTACT INFORMATION</p>
            <div>
              {contactFullName && (
                <p className="text-responsive-sm font-semibold text-gray-700">{contactFullName}</p>
              )}
              {email && <p className="text-responsive-sm font-semibold text-gray-700">{email}</p>}
              {phone && <p className="text-responsive-sm font-semibold text-gray-700">{phone}</p>}
              {website && (
                <p className="text-responsive-sm font-semibold text-gray-700">{website}</p>
              )}
            </div>
          </div>
        </div>
        <div className="p-2">
          <ButtonConfirmBlue onClick={onEdit} icon={<EditIcon />} />
        </div>
      </div>
      <div className="h-full w-full sm:w-auto flex flex-row gap-6 justify-start flex-wrap sm:content-center sm:flex-col p-5 bg-white shadow-sm ">
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
