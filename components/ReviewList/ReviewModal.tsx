import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    name: string;
    referer: string;
    procedure: string;
    rating: number;
    clinic_name: string;
    message: string;
  } | null;
  onYes: () => void;
  onNo: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, review, onYes, onNo }) => {
  if (!isOpen || !review) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Review Details</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Rating:</span>
                <div className="flex items-center">
                  <span className="font-bold text-base mr-2">{review.rating}</span>
                  <FaStar size={20} color="#FFD700" />
                </div>
              </div>

              <div>
                <span className="font-semibold">Name:</span>
                <p>{review.name}</p>
              </div>

              <div>
                <span className="font-semibold">Referer:</span>
                <p>{review.referer}</p>
              </div>

              <div>
                <span className="font-semibold">Procedure:</span>
                <p>{review.procedure}</p>
              </div>

              <div>
                <span className="font-semibold">Clinic Name:</span>
                <p>{review.clinic_name}</p>
              </div>

              <div>
                <span className="font-semibold">Review:</span>
                <p className="mt-1">{review.message}</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onNo}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                No
              </button>
              <button
                onClick={onYes}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Yes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal; 