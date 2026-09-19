import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { AkhilProfile } from "./AkhilProfile";
import { Link } from "react-router-dom";

interface AkhilProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AkhilProfileModal: React.FC<AkhilProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative z-10 w-full h-full max-h-screen overflow-y-auto bg-white shadow-2xl selection:bg-[#0070ad] selection:text-white"
          >
            {/* Top Quick Actions Floating Bar */}
            <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-50 flex items-center gap-2">
              <Link
                to="/leadership/akhil-singh"
                target="_blank"
                rel="noopener noreferrer"
                title="Open profile in standalone tab"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-sky-50 backdrop-blur-xl border border-slate-200/90 text-[#0E0A42] hover:text-[#0070AD] text-xs font-semibold shadow-lg shadow-slate-900/5 transition-all duration-200 hover:scale-105"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#0070AD]" />
                <span className="hidden sm:inline">Open Standalone</span>
              </Link>
              <button
                onClick={onClose}
                aria-label="Close profile modal"
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/95 hover:bg-slate-100 backdrop-blur-xl border border-slate-200/90 text-slate-700 hover:text-[#0E0A42] shadow-lg shadow-slate-900/5 transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Content */}
            <AkhilProfile onClose={onClose} isModal={true} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AkhilProfileModal;
