import React, { useState } from 'react';
import { Appearance, Slot } from '../types';
import { getThemeStyles } from '../theme';
import { Calendar, User, Clock, ShieldCheck, Mail, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CoachingViewProps {
  appearance: Appearance;
  slots: Slot[];
  setSlots: (slots: Slot[]) => void;
  setIsProcessing: (val: boolean) => void;
}

export function CoachingView({ appearance, slots, setSlots, setIsProcessing }: CoachingViewProps) {
  const theme = getThemeStyles(appearance.color);
  const isDark = appearance.darkMode;

  const availableSlots = slots.filter(s => s.status === 'available').sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !formData.name || !formData.email) return;

    setStatus('submitting');
    setIsProcessing(true);

    setTimeout(() => {
      setSlots(slots.map(s => {
        if (s.id === selectedSlot.id) {
          return {
            ...s,
            status: 'booked',
            bookedBy: { ...formData }
          };
        }
        return s;
      }));
      setStatus('success');
      setIsProcessing(false);
      
      setTimeout(() => {
        setSelectedSlot(null);
        setStatus('idle');
        setFormData({ name: '', email: '', notes: '' });
      }, 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className={`p-8 rounded-[32px] md:rounded-[40px] shadow-sm relative overflow-hidden ${isDark ? 'bg-[#0a0a0f] border border-white/10' : 'bg-white border border-slate-200'}`}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), transparent)' }}></div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-2xl ${theme.softBg} ${theme.text}`}>
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Book a Coaching Session
            </h2>
            <p className={`text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Reserve a time slot for personal tutoring, guidance, or mentoring. Select an available block below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableSlots.length > 0 ? (
            availableSlots.map(slot => {
              const d = new Date(slot.date);
              const dateStr = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
              
              return (
                <div key={slot.id} className={`p-5 rounded-2xl border transition-all ${isDark ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'} flex flex-col justify-between h-full group`}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className={`w-4 h-4 ${theme.text}`} />
                      <span className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{dateStr}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{slot.startTime} - {slot.endTime}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${isDark ? 'bg-white/10 border-white/10 hover:bg-white/20 text-white' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'} group-hover:${theme.bg} group-hover:border-transparent group-hover:text-white`}
                  >
                    Select Slot
                  </button>
                </div>
              );
            })
          ) : (
            <div className={`col-span-full py-12 text-center rounded-2xl border border-dashed ${isDark ? 'border-white/10 text-slate-500' : 'border-slate-300 text-slate-400'}`}>
              <Calendar className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>No available slots right now.</p>
              <p className="text-xs mt-1">Please check back later.</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Form Modal Overlay */}
      <AnimatePresence>
        {selectedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => { if(status !== 'submitting') setSelectedSlot(null); }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`relative w-full max-w-md p-8 rounded-[40px] shadow-2xl z-10 
                ${isDark ? 'bg-slate-900 border border-white/10 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}
            >
              {status === 'success' ? (
                 <div className="text-center py-6">
                 <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-4">
                   <ShieldCheck className="w-8 h-8 text-emerald-500" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Slot Booked Successfully!</h3>
                 <p className="text-sm text-slate-400">An invitation will be sent to {formData.email}.</p>
               </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-1">Confirm Session</h3>
                    <p className={`text-sm flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <Calendar className="w-4 h-4" /> 
                      {new Date(selectedSlot.date).toLocaleDateString()} at {selectedSlot.startTime}
                    </p>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Full Name</label>
                    <div className="relative">
                      <User className={`w-4 h-4 absolute left-3 top-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className={`w-full rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-white/5 border border-white/10 focus:ring-cyan-500/50 text-white' : 'bg-slate-50 border border-slate-200 focus:ring-indigo-500 text-slate-900'}`}
                        placeholder="Your Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</label>
                    <div className="relative">
                      <Mail className={`w-4 h-4 absolute left-3 top-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className={`w-full rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-white/5 border border-white/10 focus:ring-cyan-500/50 text-white' : 'bg-slate-50 border border-slate-200 focus:ring-indigo-500 text-slate-900'}`}
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Notes (Optional)</label>
                    <textarea 
                      rows={3}
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      className={`w-full rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all resize-none ${isDark ? 'bg-white/5 border border-white/10 focus:ring-cyan-500/50 text-white' : 'bg-slate-50 border border-slate-200 focus:ring-indigo-500 text-slate-900'}`}
                      placeholder="What would you like to focus on?"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setSelectedSlot(null)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={status === 'submitting'}
                      className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-xl text-white text-sm font-bold shadow-md transition-all ${theme.bg} ${theme.hoverBg} ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {status === 'submitting' ? 'Booking...' : (
                        <>
                           Confirm <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
