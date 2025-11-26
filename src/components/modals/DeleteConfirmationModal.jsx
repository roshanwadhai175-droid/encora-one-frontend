import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" 
                        onClick={!isDeleting ? onClose : undefined} 
                    />
                    
                    {/* Modal Content */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: 20 }} 
                        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl pointer-events-auto overflow-hidden border border-slate-100">
                            <div className="p-8 text-center">
                                {/* Warning Icon */}
                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
                                    <AlertTriangle className="w-8 h-8 text-red-600" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-slate-800 mb-3">Cancel Complaint?</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-2">
                                    Are you sure you want to cancel this complaint? 
                                </p>
                                <p className="text-red-500 text-xs font-semibold bg-red-50 inline-block px-3 py-1 rounded-full">
                                    This action cannot be undone.
                                </p>
                            </div>

                            {/* Footer Buttons */}
                            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-center">
                                <button 
                                    onClick={onClose}
                                    disabled={isDeleting}
                                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50 shadow-sm"
                                >
                                    No, Keep it
                                </button>
                                <button 
                                    onClick={onConfirm}
                                    disabled={isDeleting}
                                    className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isDeleting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Cancelling...
                                        </>
                                    ) : (
                                        "Yes, Cancel it"
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DeleteConfirmationModal;