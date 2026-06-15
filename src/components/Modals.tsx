import { motion, AnimatePresence } from 'motion/react';
import { FileItem } from '../types';
import { X, ShieldCheck, Download, AlertTriangle, Printer } from 'lucide-react';

interface FileModalProps {
  isOpen: boolean;
  file: FileItem | null;
  onClose: () => void;
  folderName: string;
}

export function FileModal({ isOpen, file, onClose, folderName }: FileModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && file && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#020305]/90 backdrop-blur-3xl border border-white/10 rounded-[40px] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden flex flex-col"
            >
              <div className="bg-white/5 border-b border-white/10 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10">
                    <FileTextIcon type={file.type} className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-extrabold text-white text-sm truncate max-w-[280px]">{file.name}</h3>
                </div>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="bg-cyan-500/10 rounded-2xl p-5 border border-cyan-500/20 text-center text-sm text-cyan-300 flex flex-col items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-cyan-400" />
                  <p className="font-semibold">Resource verified and hosted securely.</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-300 text-sm uppercase tracking-wider text-[10px]">Resource Context</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Viewing properties for the document from the <strong className="font-bold text-white">{folderName}</strong> module. Make sure to review the contents before executing any exercises.
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-5 text-xs text-slate-400 space-y-3 border border-white/5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span>Size:</span>
                    <span className="font-bold text-white">{file.size}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span>Format:</span>
                    <span className="font-bold text-slate-300 uppercase px-2 py-0.5 bg-white/10 rounded">{file.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Updated:</span>
                    <span className="font-bold text-white">{file.modified}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border-t border-white/10 px-6 py-4 flex justify-between items-center rounded-b-[40px]">
                <button onClick={handlePrint} className="px-4 py-2.5 text-slate-300 text-sm font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Printer className="w-4 h-4" /> Print
                </button>
                <div className="flex gap-3">
                  <button onClick={onClose} className="px-5 py-2.5 text-slate-300 text-sm font-bold rounded-xl hover:bg-white/10 transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => { alert('Saved to local machine'); onClose(); }} className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hidden print:block fixed inset-0 z-[100] bg-white text-black p-12 print-container">
            <style>
              {`
                @media print {
                  body * {
                    visibility: hidden;
                  }
                  .print-container, .print-container * {
                    visibility: visible;
                  }
                  .print-container {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: auto;
                    min-height: 100vh;
                    background: white;
                    color: black;
                  }
                }
              `}
            </style>
            <div className="max-w-4xl mx-auto border border-gray-200 rounded-lg p-10 mt-10">
              <div className="flex justify-between items-end border-b border-gray-200 pb-6 mb-8">
                <div>
                  <h1 className="text-4xl font-extrabold text-black mb-2">{file.name}</h1>
                  <p className="text-gray-500 text-lg">Module: {folderName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 font-mono">Generated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-sm">
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Document Properties</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">File Size</span>
                      <span className="font-semibold text-gray-900">{file.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Format</span>
                      <span className="font-semibold text-gray-900">{file.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Modified</span>
                      <span className="font-semibold text-gray-900">{file.modified}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-sm">
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Record Authorization</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className="font-semibold text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Verified
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Access Tier</span>
                      <span className="font-semibold text-gray-900">Standard Academic</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Document ID</span>
                      <span className="font-semibold font-mono text-gray-900">{file.id}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center opacity-60">
                <span className="text-sm font-semibold">ICT Virtual Lab Portal</span>
                <span className="text-xs">&copy; Neha Siddiqui</span>
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafetyModal({ isOpen, onClose }: SafetyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#020305]/90 backdrop-blur-3xl border border-white/10 rounded-[40px] w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="bg-amber-500/10 border-b border-amber-500/20 text-white p-6 sm:p-8 flex items-center gap-5">
              <div className="p-3 bg-amber-500/20 rounded-2xl shadow-inner border border-amber-500/20">
                <AlertTriangle className="w-10 h-10 text-amber-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-white">Workshop Safety Regulations</h3>
                <p className="text-amber-400 text-sm font-bold mt-1">Essential rules for academic sessions</p>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 font-black shrink-0 border border-white/10">1</div>
                  <div>
                    <h4 className="font-bold text-white">E-Safety Protocol</h4>
                    <p className="text-sm text-slate-400 mt-1">Never share user credentials, passwords, or cloud configurations outside the secure campus sandbox environment.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 font-black shrink-0 border border-white/10">2</div>
                  <div>
                    <h4 className="font-bold text-white">Tech Pre-approval</h4>
                    <p className="text-sm text-slate-400 mt-1">Ensure any external devices are checked by administrative support before joining the lab LAN network.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 font-black shrink-0 border border-white/10">3</div>
                  <div>
                    <h4 className="font-bold text-white">Emergency Powercut</h4>
                    <p className="text-sm text-slate-400 mt-1">Know the designated emergency master shutoff location inside the main ICT electrical cabinet at all times.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-6 border-t border-white/10 flex justify-end">
              <button onClick={onClose} className="bg-white text-black hover:bg-slate-200 text-sm font-bold px-8 py-3 rounded-xl transition-all shadow-md">
                I Understand & Agree
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Quick inline icon component to avoid circular dep inside simple file view
function FileTextIcon({ type, className }: { type: string, className?: string }) {
  // Simplification for modal
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
}
