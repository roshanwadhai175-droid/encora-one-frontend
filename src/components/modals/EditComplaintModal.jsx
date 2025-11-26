import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Save } from 'lucide-react';
import api from '../../api/axios';

const EditComplaintModal = ({ isOpen, onClose, complaint, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [dept, setDept] = useState('');
    const [desc, setDesc] = useState('');
    const [departments, setDepartments] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load Complaint Data when modal opens
    useEffect(() => {
        if (isOpen && complaint) {
            setTitle(complaint.title);
            setDesc(complaint.description);
            // We need to match Department Name to ID. 
            // Ideally DTO should send ID, but we only have Name. 
            // We'll fetch departments and find the ID.
            api.get('/Department').then(res => {
                setDepartments(res.data);
                const matchedDept = res.data.find(d => d.name === complaint.departmentName);
                if (matchedDept) setDept(matchedDept.departmentId);
            });
        }
    }, [isOpen, complaint]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.put(`/Complaint/${complaint.complaintId}`, { 
                title, 
                description: desc, 
                departmentId: parseInt(dept), 
                attachmentUrl: "" 
            });
            onUpdate(); 
            onClose();
        } catch (error) {
            alert("Failed to update complaint: " + (error.response?.data?.message || error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" onClick={onClose} />
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl pointer-events-auto">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-slate-800">Edit Grievance #{complaint?.complaintId}</h3>
                                <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-xl" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Department</label>
                                    <select value={dept} onChange={e => setDept(e.target.value)} className="w-full px-4 py-2 border rounded-xl" required>
                                        <option value="">Select...</option>
                                        {departments.map(d => <option key={d.departmentId} value={d.departmentId}>{d.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                                    <textarea value={desc} onChange={e => setDesc(e.target.value)} rows="4" className="w-full px-4 py-2 border rounded-xl" required />
                                </div>
                                <button disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditComplaintModal;