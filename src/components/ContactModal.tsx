import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle } from 'lucide-react';
import { Appearance } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  appearance: Appearance;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, appearance }) => {
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const themeColors = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
    rose: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500',
    amber: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    slate: 'bg-slate-700 hover:bg-slate-800 focus:ring-slate-500',
    cyan: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500',
  };

  const buttonColor = themeColors[appearance.color] || themeColors.indigo;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.query) return;

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', query: '' });
          onClose();
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-md p-8 rounded-3xl shadow-2xl overflow-hidden ${appearance.darkMode ? 'bg-slate-900 border border-white/10 text-white' : 'bg-white border text-slate-800'}`}
          >
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100/10 text-emerald-500 mb-6 mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className={`text-sm ${appearance.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Thank you for reaching out. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold tracking-tight">Send a Query</h3>
                  <button onClick={onClose} className={`text-slate-400 hover:text-slate-600 transition-colors ${appearance.darkMode ? 'hover:text-white' : ''}`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${appearance.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className={`w-full rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${appearance.darkMode ? 'bg-white/5 border border-white/10 focus:ring-cyan-500/50' : 'bg-slate-50 border border-slate-200 focus:ring-indigo-500'}`}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${appearance.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className={`w-full rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${appearance.darkMode ? 'bg-white/5 border border-white/10 focus:ring-cyan-500/50' : 'bg-slate-50 border border-slate-200 focus:ring-indigo-500'}`}
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${appearance.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.query}
                      onChange={e => setFormData({...formData, query: e.target.value})}
                      className={`w-full rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all resize-none ${appearance.darkMode ? 'bg-white/5 border border-white/10 focus:ring-cyan-500/50' : 'bg-slate-50 border border-slate-200 focus:ring-indigo-500'}`}
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-xs font-medium">Something went wrong. Please try again.</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold shadow-md transition-all ${buttonColor} ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {status === 'submitting' ? 'Sending...' : (
                      <>
                        <Send className="w-4 h-4" /> Send Request
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
