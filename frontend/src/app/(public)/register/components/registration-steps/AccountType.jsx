import React from "react";
import CardButton from "@/components/button/CardButton";
import { SingleUserIcon, MultiUserIcon } from "@/components/icons/Icons";

const AccountType = ({ setSelected, selected }) => {
  return (
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-4">
      <CardButton
        onClick={() => setSelected("individual")}
        image={<SingleUserIcon width="2em" height="2em" fill="#424242" />}
        name="individual"
        value="individual"
        selected={selected}
      >
        <h1 className="text-responsive-md">Individual</h1>
        <p className="text-responsive-xs text-justify text-gray-500">
          For small businesses that requires only one user
        </p>
      </CardButton>
      <CardButton
        onClick={() => setSelected("organization")}
        image={<MultiUserIcon width="2em" height="2em" fill="#424242" />}
        name="organization"
        value="organization"
        selected={selected}
      >
        <h1 className="text-responsive-md">Organization</h1>
        <p className="text-responsive-xs text-justify text-gray-500">
          For medium businesses that will require more than 2 users
        </p>
      </CardButton>
    </div>
  );
};

export default AccountType;
