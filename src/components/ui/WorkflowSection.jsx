import React from 'react';
import { motion } from 'framer-motion';
import { FilePlus, UserCheck, BarChart3, MessageSquare } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Raise Grievance",
    description: "Employees log issues directly via the portal with attachments and priority levels.",
    icon: FilePlus,
  },
  {
    id: 2,
    title: "Manager Review",
    description: "Department heads receive instant alerts to review and assign tasks.",
    icon: UserCheck,
  },
  {
    id: 3,
    title: "Admin Oversight",
    description: "Admins monitor SLAs and system performance via real-time dashboards.",
    icon: BarChart3,
  },
  {
    id: 4,
    title: "Collaborate",
    description: "Seamless chat integration allows everyone to close tickets faster.",
    icon: MessageSquare,
  }
];

const WorkflowSection = () => {
  return (
    <section className="py-24 bg-[#050505] text-white">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Simple, transparent, and efficient.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                  <Icon size={24} />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WorkflowSection;