import React from "react";
import { ClipLoader } from "react-spinners";
import { ButtonCancelGrayDark, ButtonConfirmRed } from "../button/CustomButtons";

const ConfirmDialog = ({ message, optionCancel, optionConfirm, loading }) => {
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <div className="py-5">
          <p className="mb-4">{message}</p>
        </div>

        <div className="flex justify-end space-x-2">
          <ButtonCancelGrayDark
            onClick={optionCancel.onCancel}
            className={optionCancel.customclass}
            text={optionCancel.text}
          />

          <ButtonConfirmRed
            disabled={loading}
            onClick={optionConfirm.onConfirm}
            className={optionConfirm.customclass}
            icon={loading && <ClipLoader color="#ffffff" size={15} loading={loading} />}
            text={optionConfirm.text}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
