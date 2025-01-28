import React from "react";
import { ClipLoader } from "react-spinners";

const ConfirmDialog = ({ message, optionCancel, optionConfirm, loading }) => {
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <div className="py-5">
          <p className="mb-4">{message}</p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={optionCancel.onCancel}
            className={`px-4 py-2 bg-blue-400 text-white rounded ${optionCancel.customclass}`}
          >
            <p>{optionCancel.text}</p>
          </button>
          <button
            disabled={loading}
            onClick={optionConfirm.onConfirm}
            className={`px-4 py-2 bg-blue-400 text-white rounded ${optionConfirm.customclass}`}
          >
            <span className="flex gap-2 justify-around items-center">
              {loading && (
                <i className="flex justify-center items-center">
                  <ClipLoader color="#ffffff" size={15} loading={loading} />
                </i>
              )}
              <p>{optionConfirm.text}</p>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
