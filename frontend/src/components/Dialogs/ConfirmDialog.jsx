import React from "react";

const ConfirmDialog = ({ message, cancelProps, confirmProps, loading }) => {
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <div className="py-5">
          <p className="mb-4">{message}</p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={cancelProps.onCancel}
            className={`px-4 py-2 bg-blue-400 text-white rounded ${cancelProps.customclass}`}
          >
            {cancelProps.icon && <span>{cancelProps.icon}</span>}
            {cancelProps.text && <span>{cancelProps.text}</span>}
          </button>
          <button
            disabled={loading}
            onClick={confirmProps.onConfirm}
            className={`px-4 py-2 bg-blue-400 text-white rounded ${confirmProps.customclass}`}
          >
            {confirmProps.icon && <span>{confirmProps.icon}</span>}
            {confirmProps.text && <span>{confirmProps.text}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
