import React from 'react';
import { motion } from 'motion/react';
import { Appearance, Folder } from '../types';
import { getThemeStyles } from '../theme';
import { 
  Terminal, Cpu, Monitor, Globe, Server, Compass, 
  Search, Bell, Sliders, Trash2, Shapes, Calendar
} from 'lucide-react';

interface HeaderProps {
  appearance: Appearance;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  dbConnected: boolean;
  isProcessing?: boolean;
  onContactClick: () => void;
}

export function Header({ appearance, activeTab, setActiveTab, searchQuery, setSearchQuery, dbConnected, isProcessing, onContactClick }: HeaderProps) {
  const theme = getThemeStyles(appearance.color);
  
  const renderLogo = () => {
    if (appearance.logoType === 'image' && appearance.logoUrl) {
      return <img src={appearance.logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded-lg" />;
    }
    const icons: Record<string, React.ReactNode> = {
      terminal: <Terminal className="w-6 h-6" />,
      cpu: <Cpu className="w-6 h-6" />,
      monitor: <Monitor className="w-6 h-6" />,
      globe: <Globe className="w-6 h-6" />,
      server: <Server className="w-6 h-6" />,
      compass: <Compass className="w-6 h-6" />
    };
    return (
      <div className={`text-white p-2 rounded-xl shadow-md transition-all duration-300 ${theme.bg}`}>
        {icons[appearance.logoIcon] || <Compass className="w-6 h-6" />}
      </div>
    );
  };

  return (
    <>
      <div className={`text-white py-2 px-4 text-center text-sm font-semibold relative overflow-hidden flex items-center justify-center gap-2 transition-all duration-300 ${theme.bg}`}>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span>{appearance.bannerText}</span>
      </div>

      <header className={`border-b sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${appearance.darkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-white/90 border-slate-200 text-slate-900'}`}>
        {isProcessing && (
          <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden z-50">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className={`absolute top-0 bottom-0 w-1/2 ${appearance.darkMode ? 'bg-cyan-400' : 'bg-indigo-500'}`}
              style={{ background: appearance.darkMode ? 'linear-gradient(90deg, transparent, #22d3ee, transparent)' : 'linear-gradient(90deg, transparent, #6366f1, transparent)' }}
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              {renderLogo()}
            </motion.div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight group-hover:opacity-80 transition-opacity">{appearance.title}</h1>
              <p className="text-xs font-semibold text-slate-500">{appearance.subtitle}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <input 
                type="text" 
                placeholder="Search resources, topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full border-0 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 transition-all duration-200 ${theme.ring} ${appearance.darkMode ? 'bg-white/5 border border-white/10 text-white shadow-inner backdrop-blur-sm' : 'bg-slate-100 text-slate-800 shadow-inner'}`}
              />
              <Search className={`w-4 h-4 absolute left-3 top-2.5 transition-colors ${searchQuery ? theme.text : 'text-slate-400'}`} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-[10px] font-bold uppercase tracking-tighter ${appearance.darkMode ? 'text-green-400' : 'text-emerald-700'}`}>
              <span className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-green-400 animate-pulse' : 'bg-green-400 animate-pulse'}`}></span>
              <span>System Ready</span>
            </div>
            
            <div className="flex items-center gap-1 border-l pl-4 border-white/10">
              <button
                onClick={onContactClick}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border ${appearance.darkMode ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'}`}
              >
                <span>Send Query</span>
              </button>

              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'dashboard' ? (appearance.darkMode ? 'bg-white/10 text-white border border-white/10' : theme.softBg + ' ' + theme.text) : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Telemetry</span>
              </button>

              <button 
                onClick={() => setActiveTab('coaching')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'coaching' ? (appearance.darkMode ? 'bg-white/10 text-white border border-white/10' : theme.softBg + ' ' + theme.text) : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Coaching</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('admin')}
                className={`p-2 rounded-xl transition-all duration-200 ${appearance.darkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'}`}
              >
                <Sliders className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

interface SidebarProps {
  appearance: Appearance;
  folders: Folder[];
  activeTab: string;
  selectedFolderId: string | null;
  onSelectFolder: (f: Folder) => void;
}

export function Sidebar({ appearance, folders, activeTab, selectedFolderId, onSelectFolder }: SidebarProps) {
  const theme = getThemeStyles(appearance.color);
  const aiFolders = folders.filter(f => f.category === 'ai');
  const stemFolders = folders.filter(f => f.category === 'stem');

  const renderFolderList = (categoryName: string, icon: any, foldArray: Folder[]) => (
    <div className="mb-6">
      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-3 mb-2 flex items-center justify-between">
        <span>{categoryName}</span>
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${theme.softBg} ${theme.text}`}>{foldArray.length}</span>
      </h4>
      <nav className="space-y-1">
        {foldArray.map(folder => {
          const isActive = activeTab === 'folder' && selectedFolderId === folder.id;
          return (
            <div key={folder.id} className="relative group">
              <button 
                onClick={() => onSelectFolder(folder)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-all ${isActive ? theme.activeTab : (appearance.darkMode ? 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent' : 'text-slate-700 ' + theme.hoverBg + ' ' + theme.hoverText)}`}
              >
                <div className="flex items-center gap-2.5">
                  {React.createElement(icon, { className: `w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? theme.textLight : theme.text}`})}
                  <span className="truncate max-w-[130px]">{folder.name}</span>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded-md transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white'} `}>
                  {folder.files?.length || 0}
                </span>
              </button>
            </div>
          );
        })}
        {foldArray.length === 0 && (
          <div className="text-center py-4 text-xs text-slate-400 italic">No tabs yet.</div>
        )}
      </nav>
    </div>
  );

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-white p-5 shadow-lg relative overflow-hidden transition-all duration-300 bg-gradient-to-br ${theme.gradient} ${appearance.rounding}`}
      >
        <div className="relative z-10">
          <h3 className="font-bold text-base">Resource Directory</h3>
          <p className="text-xs text-white/80 mt-1 leading-relaxed">Folders populate in real time below as navigation tabs when added via the control panel.</p>
        </div>
      </motion.div>

      <div className={`p-4 shadow-sm space-y-2 transition-all duration-300 border ${appearance.darkMode ? 'bg-white/5 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'} ${appearance.rounding}`}>
        {renderFolderList('Emerging Tech & AI', Cpu, aiFolders)}
        {renderFolderList('STEM & Extracurricular', Shapes, stemFolders)}
      </div>
    </aside>
  );
}
