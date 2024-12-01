import React from "react";

const ConfirmDialog = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p className="mb-4">{message}</p>{" "}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>{" "}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ConfirmDialog;
