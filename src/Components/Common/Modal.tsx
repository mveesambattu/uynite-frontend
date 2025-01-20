import React, { ReactNode } from "react";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  description?: string;
  children?: ReactNode; // Custom content (e.g., textarea or any JSX)
  submitButtonLabel?: string; // Label for the submit button
  closeButtonLabel?: string; // Optional label for the close button
  submitButtonDisabled?: boolean; // Whether to disable the submit button
};

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  title,
  description,
  children,
  submitButtonLabel = "Yes",
  closeButtonLabel = "Close",
  submitButtonDisabled = false,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        {description && (
          <p className="text-sm text-gray-700 mb-4">{description}</p>
        )}
        <div className="mb-4">{children}</div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2">
          {closeButtonLabel && (
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              {closeButtonLabel}
            </button>
          )}
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={submitButtonDisabled}
          >
            {submitButtonLabel}
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default Modal;
