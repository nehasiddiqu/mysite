import { motion } from 'motion/react';
import { Appearance, Folder, FileItem } from '../types';
import { getThemeStyles } from '../theme';
import { ChevronRight, Home, FolderOpen, Globe, AlertTriangle, FileText, FileEdit, Presentation, Table, Archive, File, Eye, Download } from 'lucide-react';

interface FolderViewProps {
  appearance: Appearance;
  folder: Folder | null;
  setActiveTab: (tab: string) => void;
  onOpenFile: (file: FileItem) => void;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return FileText;
    case 'doc': return FileEdit;
    case 'slides': return Presentation;
    case 'excel': return Table;
    case 'zip': return Archive;
    default: return File;
  }
};

const getFileIconColor = (type: string) => {
  switch (type) {
    case 'pdf': return 'text-rose-600';
    case 'doc': return 'text-blue-600';
    case 'slides': return 'text-amber-600';
    case 'excel': return 'text-emerald-600';
    default: return 'text-slate-600';
  }
};

const getFileIconBg = (type: string) => {
  switch (type) {
    case 'pdf': return 'bg-rose-50';
    case 'doc': return 'bg-blue-50';
    case 'slides': return 'bg-amber-50';
    case 'excel': return 'bg-emerald-50';
    default: return 'bg-slate-50';
  }
};

export function FolderView({ appearance, folder, setActiveTab, onOpenFile }: FolderViewProps) {
  const theme = getThemeStyles(appearance.color);

  if (!folder) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-1 transition-colors ${theme.hoverText}`}>
          <Home className="w-3.5 h-3.5" />
          Hub Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-400 uppercase tracking-widest text-[10px]">{folder.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className={appearance.darkMode ? 'text-slate-300' : 'text-slate-900'}>{folder.name}</span>
      </nav>

      <div className={`border p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 ${appearance.darkMode ? 'bg-white/5 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'} ${appearance.rounding}`}>
        <div className="flex items-center gap-5 flex-1">
          <div className={`p-4 rounded-2xl ${theme.softBg}`}>
            <FolderOpen className={`w-8 h-8 ${theme.text}`} />
          </div>
          <div>
            <h2 className={`text-2xl font-black tracking-tight ${appearance.darkMode ? 'text-white' : 'text-slate-900'}`}>{folder.name}</h2>
            <p className={`text-xs font-bold mt-1 flex items-center gap-1.5 ${theme.text}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse border-2 border-white"></span> 
              Live Indexed Source
            </p>
          </div>
        </div>
        
        {folder.driveUrl && (
          <a href={folder.driveUrl} target="_blank" rel="noreferrer" className={`text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 hover:opacity-90 ${theme.bg}`}>
            <Globe className="w-4 h-4" />
            Open Full Drive
          </a>
        )}
      </div>

      {folder.driveEmbedUrl ? (
        <div className={`overflow-hidden shadow-sm border transition-all duration-300 ${appearance.darkMode ? 'bg-white/5 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'} ${appearance.rounding}`}>
          <div className={`px-4 py-3 border-b flex items-center justify-between text-xs font-semibold ${appearance.darkMode ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              Live Viewer Window
            </span>
            <span>Secure End-to-End</span>
          </div>
          <div className="w-full h-96 relative bg-slate-100">
             <iframe src={folder.driveEmbedUrl} className="w-full h-full border-0 absolute inset-0 bg-slate-100" title="Drive Viewer"></iframe>
          </div>
        </div>
      ) : (
        <div className={`bg-amber-50 rounded-2xl border border-amber-200 p-6 flex items-start gap-4 ${appearance.darkMode ? 'bg-amber-900/20 border-amber-800/50' : ''}`}>
          <AlertTriangle className={`w-6 h-6 shrink-0 mt-0.5 ${appearance.darkMode ? 'text-amber-500' : 'text-amber-600'}`} />
          <div>
            <h4 className={`font-bold text-sm ${appearance.darkMode ? 'text-amber-400' : 'text-amber-800'}`}>External Link Not Configured</h4>
            <p className={`text-xs mt-1 leading-relaxed ${appearance.darkMode ? 'text-amber-500/80' : 'text-amber-700'}`}>
              An embed link hasn't been set up yet for this page. Admins can click the configuration sliders icon in the top right to paste a Google Drive folder URL to enable the live window viewer.
            </p>
          </div>
        </div>
      )}

      <div className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-extrabold tracking-tight ${appearance.darkMode ? 'text-white' : 'text-slate-900'}`}>Static Resource Index</h3>
          <span className={`text-xs font-semibold px-2 py-1 rounded border ${theme.softBg} ${theme.text} ${theme.border}`}>
            {folder.files?.length || 0} items
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {folder.files?.map((file, i) => {
            const Icon = getFileIcon(file.type);
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                key={file.id} 
                className={`border p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-4 ${appearance.darkMode ? 'bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10' : 'bg-white border-slate-100'} ${appearance.rounding}`}
              >
                <div className={`p-3 rounded-xl shrink-0 ${appearance.darkMode ? 'bg-white/5 border border-white/10' : getFileIconBg(file.type)}`}>
                  <Icon className={`w-6 h-6 ${getFileIconColor(file.type)}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={`font-bold text-sm truncate ${appearance.darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{file.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{file.size} &bull; Modified {file.modified}</p>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <button 
                      onClick={() => onOpenFile(file)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${appearance.darkMode ? 'bg-white/10 hover:bg-white/20 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button 
                      onClick={() => alert(`Downloading ${file.name}`)}
                      className={`px-3 py-1.5 border text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm ${appearance.darkMode ? 'bg-white/5 border-white/20 hover:bg-white/10 text-slate-300' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                    >
                      <Download className="w-3.5 h-3.5" /> Get
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
          {(!folder.files || folder.files.length === 0) && (
            <div className={`col-span-full py-8 text-center text-sm font-medium border rounded-2xl border-dashed ${appearance.darkMode ? 'border-white/10 text-slate-500' : 'border-slate-300 text-slate-400'}`}>
              No files have been added to this module yet.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
