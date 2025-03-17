"use client";

import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

export default function LoadingSpinner({ size = 40, color = "#3b82f6" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center"
    >
      <ClipLoader size={size} color={color} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-lg font-medium text-white"
      >
        Loading...
      </motion.p>
    </motion.div>
  );
}
