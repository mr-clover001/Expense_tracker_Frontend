import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm ">
          <div className=" flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-300 border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 ">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 text-lg font-medium text-gray-300 hover:bg-gray-200 rounded-lg p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              X
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
