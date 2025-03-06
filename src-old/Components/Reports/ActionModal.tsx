import React, { useState } from "react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: string;
  onConfirm: (reason: string) => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, actionType, onConfirm }) => {
  if (!isOpen) return null;

  const [selectedReason, setSelectedReason] = useState("");

  const reasons = [
    "Once you delete the Union, all members and your Union posts will be deleted permanently",
    "This action cannot be undone",
    "Make sure you have reviewed the report before proceeding",
  ];

  // Determine button text based on actionType
  const actionButtonText =
    actionType.toLowerCase().includes("delete") ? "Delete" :
    actionType.toLowerCase().includes("block") ? "Block" :
    actionType.toLowerCase().includes("reject") ? "Reject" : "Confirm";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-2xl font-semibold text-center">Are you sure?</h2>
        <p className="text-lg text-center mt-2">
          You want to <span className="text-blue-500 font-semibold">{actionType}..</span>
        </p>

        <div className="mt-4">
          <p className="font-semibold mb-3 text-gray-700">Reason for {actionType}</p>
          {reasons.map((reason, index) => (
            <label key={index} className="flex items-center gap-3 mb-3 cursor-pointer">
              <input
                type="radio"
                name="reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
              />
              <span className="text-gray-600 text-base">{reason}</span>
            </label>
          ))}
        </div>

        {/* Matched buttons as per design */}
        <div className="flex justify-between mt-6">
          <button
            className={`px-5 py-2 rounded-lg text-white transition-all ${
              selectedReason
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!selectedReason}
            onClick={() => onConfirm(selectedReason)}
          >
            {actionButtonText}
          </button>
          <button
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
