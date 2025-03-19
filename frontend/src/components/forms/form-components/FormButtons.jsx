import React from "react";
import { ButtonCancelGrayLight, ButtonConfirmBlue } from "@/components/button/CustomButtons";

const FormButtons = ({ onCancelProps, onSubmitProps }) => {
  return (
    <div className="flex lg:justify-end md:justify-end justify-center p-3 gap-2 border-t border-gray-200">
      <ButtonCancelGrayLight type="button" {...onCancelProps} />
      <ButtonConfirmBlue type="submit" {...onSubmitProps} />
    </div>
  );
};

export default FormButtons;
