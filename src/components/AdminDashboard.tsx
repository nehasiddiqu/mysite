import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Appearance, Folder, Announcement, FileItem, ActivityLog, Slot } from '../types';
import { getThemeStyles } from '../theme';
import { 
  Palette, FolderPlus, Megaphone, Plus, Trash2, 
  Settings, LayoutDashboard, FileText, Edit, Save,
  UploadCloud, Activity, Calendar, Snowflake, Unlock, AlertTriangle
} from 'lucide-react';

interface AdminDashboardProps {
  appearance: Appearance;
  setAppearance: (a: Appearance) => void;
  folders: Folder[];
  setFolders: (f: Folder[]) => void;
  announcements: Announcement[];
  setAnnouncements: (a: Announcement[]) => void;
  activityLogs: ActivityLog[];
  setActivityLogs: (logs: ActivityLog[]) => void;
  slots: Slot[];
  setSlots: (slots: Slot[]) => void;
  setIsProcessing: (p: boolean) => void;
}

export function AdminDashboard({ 
  appearance, setAppearance, 
  folders, setFolders, 
  announcements, setAnnouncements,
  activityLogs, setActivityLogs,
  slots, setSlots,
  setIsProcessing
}: AdminDashboardProps) {
  const theme = getThemeStyles(appearance.color);
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'appearance' | 'folders' | 'announcements' | 'slots' | 'activity'>('overview');

  // Form states
  const [newFolder, setNewFolder] = useState({ name: '', category: 'ai', driveUrl: '', driveEmbedUrl: '' });
  const [newPost, setNewPost] = useState({ title: '', category: 'General', author: appearance.subtitle || 'Admin', content: '' });

  // File management
  const [selectedFolderForFiles, setSelectedFolderForFiles] = useState<string | null>(null);
  const [newFile, setNewFile] = useState({ name: '', type: 'pdf', size: '1.2 MB' });

  const logActivity = (action: string, target: string) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action,
      target,
      timestamp: new Date().toLocaleString()
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  const handleCreateFolder = () => {
    if (!newFolder.name) return;
    setIsProcessing(true);
    setTimeout(() => {
      const folder: Folder = {
        id: Date.now().toString(),
        name: newFolder.name,
        category: newFolder.category,
        driveUrl: newFolder.driveUrl || 'https://drive.google.com',
        driveEmbedUrl: newFolder.driveEmbedUrl,
        files: []
      };
      setFolders([folder, ...folders]);
      logActivity('Created Module', newFolder.name);
      setNewFolder({ name: '', category: 'ai', driveUrl: '', driveEmbedUrl: '' });
      setIsProcessing(false);
      alert("New Module specific tab added.");
    }, 600);
  };

  const handleUpdateFolderUrl = (id: string, embedUrl: string) => {
    const folder = folders.find(f => f.id === id);
    setFolders(folders.map(f => f.id === id ? { ...f, driveEmbedUrl: embedUrl } : f));
    if (folder) logActivity('Updated Url for Module', folder.name);
  };

  const handleDeleteFolder = (id: string) => {
    const folder = folders.find(f => f.id === id);
    if (confirm("Are you sure you want to delete this module and all its files?")) {
      setIsProcessing(true);
      setTimeout(() => {
        setFolders(folders.filter(f => f.id !== id));
        if (folder) logActivity('Deleted Module', folder.name);
        if (selectedFolderForFiles === id) setSelectedFolderForFiles(null);
        setIsProcessing(false);
      }, 500);
    }
  };

  const handleAddFile = (folderId: string) => {
    if (!newFile.name) return;
    setIsProcessing(true);
    setTimeout(() => {
      const file: FileItem = {
        id: Date.now().toString(),
        name: newFile.name,
        type: newFile.type,
        size: newFile.size,
        modified: new Date().toLocaleDateString()
      };
      const folder = folders.find(f => f.id === folderId);
      setFolders(folders.map(f => {
        if (f.id === folderId) {
          return { ...f, files: [...(f.files || []), file] };
        }
        return f;
      }));
      if (folder) logActivity('Added File to Module', `${newFile.name} -> ${folder.name}`);
      setNewFile({ name: '', type: 'pdf', size: '1.2 MB' });
      setIsProcessing(false);
    }, 400);
  };

  const handleDeleteFile = (folderId: string, fileId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const folder = folders.find(f => f.id === folderId);
      const file = folder?.files.find(f => f.id === fileId);
      setFolders(folders.map(f => {
        if (f.id === folderId) {
          return { ...f, files: f.files.filter(file => file.id !== fileId) };
        }
        return f;
      }));
      if (folder && file) logActivity('Deleted File from Module', `${file.name} from ${folder.name}`);
      setIsProcessing(false);
    }, 400);
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;
    setIsProcessing(true);
    setTimeout(() => {
      const post: Announcement = {
        id: Date.now().toString(),
        title: newPost.title,
        category: newPost.category,
        author: newPost.author,
        content: newPost.content,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        actionLink: '#'
      };
      setAnnouncements([post, ...announcements]);
      logActivity('Published Broadcast', newPost.title);
      setNewPost({ title: '', category: 'General', author: appearance.subtitle || 'Admin', content: '' });
      setIsProcessing(false);
      alert("Published active announcement live!");
    }, 600);
  };

  const handleDeleteAnnouncement = (id: string) => {
    const post = announcements.find(a => a.id === id);
    if (confirm("Are you sure you want to delete this announcement?")) {
      setIsProcessing(true);
      setTimeout(() => {
        setAnnouncements(announcements.filter(a => a.id !== id));
        if (post) logActivity('Deleted Broadcast', post.title);
        setIsProcessing(false);
      }, 500);
    }
  };

  const [newSlot, setNewSlot] = useState({ date: '', startTime: '', endTime: '' });

  const handleCreateSlot = () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) return;
    setIsProcessing(true);
    setTimeout(() => {
      const slot: Slot = {
        id: Date.now().toString(),
        date: newSlot.date,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        status: 'available'
      };
      setSlots([...slots, slot]);
      logActivity('Created Coaching Slot', `${newSlot.date} ${newSlot.startTime}-${newSlot.endTime}`);
      setNewSlot({ date: '', startTime: '', endTime: '' });
      setIsProcessing(false);
    }, 400);
  };

  const handleSlotAction = (id: string, action: 'freeze' | 'unfreeze' | 'delete') => {
    setIsProcessing(true);
    setTimeout(() => {
      if (action === 'delete') {
        const slot = slots.find(s => s.id === id);
        setSlots(slots.filter(s => s.id !== id));
        if (slot) logActivity('Deleted Slot', `${slot.date} ${slot.startTime}`);
      } else {
        const status = action === 'freeze' ? 'frozen' : 'available';
        setSlots(slots.map(s => s.id === id ? { ...s, status } : s));
        logActivity(`${action === 'freeze' ? 'Froze' : 'Unfroze'} Slot`, id);
      }
      setIsProcessing(false);
    }, 400);
  };

  const isDark = appearance.darkMode;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className={`rounded-[40px] overflow-hidden border flex flex-col md:flex-row min-h-[70vh] shadow-xl ${isDark ? 'bg-[#020305]/80 backdrop-blur-3xl border-white/10' : 'bg-white border-slate-200'}`}
    >
      {/* Admin Sidebar */}
      <div className={`w-full md:w-64 border-b md:border-b-0 md:border-r p-6 flex flex-col gap-2 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className={`p-2 rounded-xl ${isDark ? 'bg-white/10' : theme.softBg}`}>
            <Settings className={`w-5 h-5 ${isDark ? 'text-white' : theme.text}`} />
          </div>
          <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Control Panel</h2>
        </div>

        <nav className="flex flex-col gap-1">
          <button onClick={() => setActiveAdminTab('overview')} className={`flex items-center gap-3 px-4 py-3 rounded-[20px] text-sm font-medium transition-all ${activeAdminTab === 'overview' ? (isDark ? 'bg-white/10 text-white border border-white/10' : theme.activeTab) : (isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')}`}>
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>
          <button onClick={() => setActiveAdminTab('appearance')} className={`flex items-center gap-3 px-4 py-3 rounded-[20px] text-sm font-medium transition-all ${activeAdminTab === 'appearance' ? (isDark ? 'bg-white/10 text-white border border-white/10' : theme.activeTab) : (isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')}`}>
            <Palette className="w-4 h-4" /> Theme Identity
          </button>
          <button onClick={() => setActiveAdminTab('folders')} className={`flex items-center gap-3 px-4 py-3 rounded-[20px] text-sm font-medium transition-all ${activeAdminTab === 'folders' ? (isDark ? 'bg-white/10 text-white border border-white/10' : theme.activeTab) : (isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')}`}>
            <FolderPlus className="w-4 h-4" /> Manage Modules
          </button>
          <button onClick={() => setActiveAdminTab('announcements')} className={`flex items-center gap-3 px-4 py-3 rounded-[20px] text-sm font-medium transition-all ${activeAdminTab === 'announcements' ? (isDark ? 'bg-white/10 text-white border border-white/10' : theme.activeTab) : (isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')}`}>
            <Megaphone className="w-4 h-4" /> Broadcasts
          </button>
          <button onClick={() => setActiveAdminTab('slots')} className={`flex items-center gap-3 px-4 py-3 rounded-[20px] text-sm font-medium transition-all ${activeAdminTab === 'slots' ? (isDark ? 'bg-white/10 text-white border border-white/10' : theme.activeTab) : (isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')}`}>
            <Calendar className="w-4 h-4" /> Coaching Slots
          </button>
          <button onClick={() => setActiveAdminTab('activity')} className={`flex items-center gap-3 px-4 py-3 rounded-[20px] text-sm font-medium transition-all ${activeAdminTab === 'activity' ? (isDark ? 'bg-white/10 text-white border border-white/10' : theme.activeTab) : (isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')}`}>
            <Activity className="w-4 h-4" /> Activity Log
          </button>
        </nav>
      </div>

      {/* Admin Content Window */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {activeAdminTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <h3 className={`text-3xl font-extralight tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>System Overview</h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>High-level metrics and quick actions for your virtual lab.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-[32px] border flex flex-col gap-2 relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                {isDark && <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>}
                <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${isDark ? 'bg-white/10 border border-white/10' : theme.softBg}`}>
                  <FolderPlus className={`w-5 h-5 ${isDark ? 'text-cyan-400' : theme.text}`} />
                </div>
                <span className={`relative z-10 text-4xl font-extralight tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{folders.length}</span>
                <span className="relative z-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Modules</span>
              </div>
              <div className={`p-6 rounded-[32px] border flex flex-col gap-2 relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                {isDark && <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>}
                <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${isDark ? 'bg-white/10 border border-white/10' : theme.softBg}`}>
                  <FileText className={`w-5 h-5 ${isDark ? 'text-purple-400' : theme.text}`} />
                </div>
                <span className={`relative z-10 text-4xl font-extralight tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{folders.reduce((acc, f) => acc + (f.files?.length || 0), 0)}</span>
                <span className="relative z-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Resources</span>
              </div>
              <div className={`p-6 rounded-[32px] border flex flex-col gap-2 relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                {isDark && <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>}
                <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${isDark ? 'bg-white/10 border border-white/10' : theme.softBg}`}>
                  <Megaphone className={`w-5 h-5 ${isDark ? 'text-blue-400' : theme.text}`} />
                </div>
                <span className={`relative z-10 text-4xl font-extralight tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{announcements.length}</span>
                <span className="relative z-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Broadcasts</span>
              </div>
            </div>
            
            <div className={`p-8 rounded-[32px] border relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
               <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Quick Actions</h4>
               <div className="flex flex-wrap gap-4 relative z-10">
                  <button onClick={() => setActiveAdminTab('folders')} className={`px-6 py-3 rounded-2xl text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'}`}>
                    <FolderPlus className="w-4 h-4" /> New Module
                  </button>
                  <button onClick={() => setActiveAdminTab('announcements')} className={`px-6 py-3 rounded-2xl text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'}`}>
                    <Megaphone className="w-4 h-4" /> Post Update
                  </button>
               </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'appearance' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <h3 className={`text-3xl font-extralight tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Theme & Identity</h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Configure your lab's branding, colours, and welcome messaging.</p>
            </div>

            <div className={`p-8 rounded-[32px] border space-y-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className={`text-[10px] uppercase tracking-widest border-b pb-3 ${isDark ? 'text-slate-500 border-white/10' : 'text-slate-500 font-bold border-slate-200'}`}>Website Identity</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Portal Title</label>
                  <input type="text" value={appearance.title} onChange={e => setAppearance({...appearance, title: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Author / Subtitle</label>
                  <input type="text" value={appearance.subtitle} onChange={e => setAppearance({...appearance, subtitle: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                </div>
              </div>
              <h4 className={`text-[10px] uppercase tracking-widest border-b pb-3 mt-6 ${isDark ? 'text-slate-500 border-white/10' : 'text-slate-500 font-bold border-slate-200'}`}>Brand Logo</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Logo Type</label>
                  <select value={appearance.logoType} onChange={e => setAppearance({...appearance, logoType: e.target.value as any})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all font-medium ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 text-slate-700 focus:ring-indigo-500'}`}>
                    <option value="icon">Material Icon</option>
                    <option value="image">Image URL</option>
                  </select>
                </div>
                {appearance.logoType === 'icon' ? (
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Icon Name</label>
                    <select value={appearance.logoIcon} onChange={e => setAppearance({...appearance, logoIcon: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all font-medium ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 text-slate-700 focus:ring-indigo-500'}`}>
                      <option value="compass">Compass</option>
                      <option value="terminal">Terminal</option>
                      <option value="cpu">CPU</option>
                      <option value="monitor">Monitor</option>
                      <option value="globe">Globe</option>
                      <option value="server">Server</option>
                    </select>
                  </div>
                ) : (
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL</label>
                    <input type="text" value={appearance.logoUrl} onChange={e => setAppearance({...appearance, logoUrl: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                  </div>
                )}
              </div>

              <h4 className={`text-[10px] uppercase tracking-widest border-b pb-3 mt-8 ${isDark ? 'text-slate-500 border-white/10' : 'text-slate-500 font-bold border-slate-200'}`}>Leader Profile</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Display Name</label>
                  <input type="text" value={appearance.profileName} onChange={e => setAppearance({...appearance, profileName: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Role / Title</label>
                  <input type="text" value={appearance.profileTitle} onChange={e => setAppearance({...appearance, profileTitle: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Profile Image</label>
                <div className="flex gap-3">
                  <input type="text" value={appearance.profileImageUrl} onChange={e => setAppearance({...appearance, profileImageUrl: e.target.value})} placeholder="https://... or upload" className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                  <label className={`flex items-center justify-center flex-shrink-0 cursor-pointer border rounded-2xl px-6 py-3 text-sm font-semibold transition-all ${isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}>
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAppearance({...appearance, profileImageUrl: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Quote</label>
                <input type="text" value={appearance.profileQuote} onChange={e => setAppearance({...appearance, profileQuote: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Biography</label>
                <textarea rows={6} value={appearance.profileBio} onChange={e => setAppearance({...appearance, profileBio: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Instagram Profile URL</label>
                  <input type="text" value={appearance.socialInstagram || ''} onChange={e => setAppearance({...appearance, socialInstagram: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">LinkedIn Profile URL</label>
                  <input type="text" value={appearance.socialLinkedin || ''} onChange={e => setAppearance({...appearance, socialLinkedin: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-[32px] border space-y-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className={`text-[10px] uppercase tracking-widest border-b pb-3 ${isDark ? 'text-slate-500 border-white/10' : 'text-slate-500 font-bold border-slate-200'}`}>Styling System</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Color Scheme</label>
                  <select value={appearance.color} onChange={e => setAppearance({...appearance, color: e.target.value as any})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all font-medium ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 text-slate-700 focus:ring-indigo-500'}`}>
                    <option value="cyan">Neon Cyan (Immersive)</option>
                    <option value="indigo">Indigo & Violet</option>
                    <option value="emerald">Emerald & Mint</option>
                    <option value="rose">Rose Crimson</option>
                    <option value="amber">Warm Amber</option>
                    <option value="slate">Monochrome Tech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Roundness Style</label>
                  <select value={appearance.rounding} onChange={e => setAppearance({...appearance, rounding: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all font-medium ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 text-slate-700 focus:ring-indigo-500'}`}>
                    <option value="rounded-[40px]">Max Round (Immersive)</option>
                    <option value="rounded-3xl">Extra Round (Soft)</option>
                    <option value="rounded-xl">Medium Round</option>
                    <option value="rounded-none">Sharp Corners</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Dark Mode</label>
                  <button onClick={() => setAppearance({...appearance, darkMode: !appearance.darkMode})} className={`w-full py-3 rounded-2xl text-[10px] tracking-widest uppercase font-bold transition-all border ${appearance.darkMode ? 'bg-white/10 text-white border-white/20' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
                    {appearance.darkMode ? '🌙 Enabled' : '☀️ Disabled'}
                  </button>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-[32px] border space-y-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className={`text-[10px] uppercase tracking-widest border-b pb-3 ${isDark ? 'text-slate-500 border-white/10' : 'text-slate-500 font-bold border-slate-200'}`}>Hero Messaging Configuration</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Banner Ticker</label>
                  <input type="text" value={appearance.bannerText} onChange={e => setAppearance({...appearance, bannerText: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Hero Tagline</label>
                  <input type="text" value={appearance.heroTag} onChange={e => setAppearance({...appearance, heroTag: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Hero Main Heading</label>
                  <input type="text" value={appearance.heroTitle} onChange={e => setAppearance({...appearance, heroTitle: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 outline-none transition-all ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}/>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Hero Description Paragraph</label>
                  <textarea rows={3} value={appearance.heroDesc} onChange={e => setAppearance({...appearance, heroDesc: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:ring-2 outline-none transition-all resize-none ${isDark ? 'bg-black/50 border-white/10 text-white focus:ring-cyan-500/50' : 'bg-white border-slate-200 focus:ring-indigo-500'}`}></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'folders' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <h3 className={`text-3xl font-extralight tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Content Modules</h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Create folder tabs, add external links, and manage static resources.</p>
            </div>

            <div className={`rounded-[32px] p-8 border shadow-sm ${isDark ? 'bg-cyan-500/5 border-cyan-500/10' : 'bg-indigo-50 border-indigo-100'}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${isDark ? 'text-cyan-400' : 'text-indigo-900'}`}>
                <FolderPlus className="w-4 h-4" />
                Add New Module Tab
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Folder Tab Name" value={newFolder.name} onChange={e => setNewFolder({...newFolder, name: e.target.value})} className={`border rounded-2xl px-4 py-3 text-sm outline-none font-bold placeholder-slate-400 transition-all ${isDark ? 'bg-black/40 border-cyan-500/20 text-white focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/50' : 'bg-white border-indigo-200 focus:ring-2 focus:ring-indigo-500'}`}/>
                <select value={newFolder.category} onChange={e => setNewFolder({...newFolder, category: e.target.value})} className={`border rounded-2xl px-4 py-3 text-sm outline-none font-medium transition-all ${isDark ? 'bg-black/40 border-cyan-500/20 text-white focus:border-cyan-400/50' : 'bg-white border-indigo-200 focus:ring-2 focus:ring-indigo-500'}`}>
                  <option value="ai">Emerging Tech & AI</option>
                  <option value="stem">STEM & Extracurricular</option>
                </select>
              </div>
              <div className="mb-6">
                <input type="text" placeholder="Embed Iframe Link (e.g. Google Drive)" value={newFolder.driveEmbedUrl} onChange={e => setNewFolder({...newFolder, driveEmbedUrl: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm outline-none font-mono text-xs placeholder-slate-400/50 transition-all ${isDark ? 'bg-black/40 border-cyan-500/20 text-white focus:border-cyan-400/50' : 'bg-white border-indigo-200 focus:ring-2 focus:ring-indigo-500'}`}/>
              </div>
              <button onClick={handleCreateFolder} className={`text-[10px] tracking-[0.2em] uppercase font-bold px-6 py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto ${isDark ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                <Plus className="w-4 h-4" /> Publish Tab
              </button>
            </div>

            <div className="space-y-4">
              <h4 className={`text-[10px] uppercase tracking-widest border-b pb-3 ${isDark ? 'text-slate-500 border-white/10' : 'text-slate-500 font-bold border-slate-200'}`}>Active Module Hierarchy</h4>
              <div className="space-y-6">
                {folders.map(f => (
                  <div key={f.id} className={`flex flex-col gap-4 p-6 rounded-[32px] shadow-sm transition-colors border ${isDark ? 'bg-white/5 border-white/10 hover:border-cyan-500/30' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="sm:w-1/3">
                        <span className={`font-bold text-lg block truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{f.name}</span>
                        <span className={`text-[10px] font-bold uppercase mt-1 inline-block px-2 py-0.5 rounded ${isDark ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-slate-100 text-slate-400'}`}>{f.category}</span>
                      </div>
                      <div className="flex-1 w-full flex items-center gap-2">
                        <input type="text" value={f.driveEmbedUrl || ''} onChange={e => handleUpdateFolderUrl(f.id, e.target.value)} placeholder="Attach embed URL..." className={`flex-1 border rounded-xl px-4 py-2.5 text-xs outline-none font-mono transition-all ${isDark ? 'bg-black/40 border-white/10 text-slate-300 focus:border-cyan-500/50' : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-indigo-500'}`}/>
                        <button onClick={() => handleDeleteFolder(f.id)} className={`p-3 rounded-xl transition-colors border ${isDark ? 'text-slate-400 border-white/5 hover:border-rose-500/30 hover:text-rose-400 hover:bg-rose-500/10' : 'text-slate-400 border-transparent hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50'}`}>
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* File Editor inside Folder block */}
                    <div className={`mt-2 pt-4 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                      <div className="flex justify-between items-center mb-4">
                        <h5 className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Static Resources ({f.files?.length || 0})</h5>
                        <button 
                          onClick={() => setSelectedFolderForFiles(selectedFolderForFiles === f.id ? null : f.id)} 
                          className={`text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-xl border transition-colors ${selectedFolderForFiles === f.id ? (isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-200') : (isDark ? 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50')}`}
                        >
                          {selectedFolderForFiles === f.id ? 'Close Quick Edit' : 'Manage Files'}
                        </button>
                      </div>
                      
                      {selectedFolderForFiles === f.id && (
                        <div className={`p-5 rounded-2xl border mb-4 space-y-4 ${isDark ? 'bg-black/20 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                           <div className="flex flex-col sm:flex-row gap-3">
                             <input type="text" placeholder="File Display Name" value={newFile.name} onChange={e => setNewFile({...newFile, name: e.target.value})} className={`flex-1 border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors ${isDark ? 'bg-black/50 border-white/10 text-white focus:border-cyan-500/50' : 'bg-white border-slate-200 focus:ring-1 focus:ring-indigo-500'}`}/>
                             <select value={newFile.type} onChange={e => setNewFile({...newFile, type: e.target.value})} className={`w-full sm:w-32 border rounded-xl px-4 py-2.5 text-sm outline-none transition-colors uppercase ${isDark ? 'bg-black/50 border-white/10 text-white focus:border-cyan-500/50' : 'bg-white border-slate-200 focus:ring-1 focus:ring-indigo-500'}`}>
                               <option value="pdf">PDF</option>
                               <option value="doc">DOC</option>
                               <option value="slides">SLIDES</option>
                               <option value="excel">EXCEL</option>
                               <option value="zip">ZIP</option>
                             </select>
                             <button onClick={() => handleAddFile(f.id)} className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 ${isDark ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/30' : 'bg-slate-800 text-white hover:bg-slate-900'}`}>
                               <UploadCloud className="w-4 h-4" /> Add File
                             </button>
                           </div>

                           {f.files && f.files.length > 0 ? (
                             <ul className="space-y-2 mt-4">
                               {f.files.map(file => (
                                 <li key={file.id} className={`flex justify-between items-center p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-semibold">{file.name}</span>
                                      <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{file.type} // {file.size}</span>
                                    </div>
                                    <button onClick={() => handleDeleteFile(f.id, file.id)} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-500 hover:text-rose-400 hover:bg-rose-500/10' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'}`}>
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                 </li>
                               ))}
                             </ul>
                           ) : (
                             <div className="text-xs font-mono uppercase text-center py-6 text-slate-500">No resources linked yet.</div>
                           )}
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'announcements' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <h3 className={`text-3xl font-extralight tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Broadcasts & News</h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Push information live to the student dashboard immediately.</p>
            </div>

            <div className={`rounded-[32px] p-8 border shadow-sm ${isDark ? 'bg-purple-500/5 border-purple-500/10' : 'bg-emerald-50 border-emerald-100'}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-emerald-900'}`}>
                <Megaphone className="w-4 h-4" />
                Dispatch Comms
              </h4>
              
              <div className="space-y-5">
                <input type="text" placeholder="Catchy Headline" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm font-bold outline-none transition-all ${isDark ? 'bg-black/40 border-purple-500/20 text-white focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/50' : 'bg-white border-emerald-200 focus:ring-2 focus:ring-emerald-500'}`}/>
                
                <div className="grid grid-cols-2 gap-4">
                  <select value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} className={`border rounded-2xl px-4 py-3 text-sm font-medium outline-none transition-all ${isDark ? 'bg-black/40 border-purple-500/20 text-white focus:border-purple-400/50' : 'bg-white border-emerald-200 focus:ring-2 focus:ring-emerald-500'}`}>
                    <option>General</option>
                    <option>Safety</option>
                    <option>Competition</option>
                    <option>Homework</option>
                  </select>
                  <input type="text" placeholder="Author Override" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} className={`border rounded-2xl px-4 py-3 text-sm outline-none transition-all ${isDark ? 'bg-black/40 border-purple-500/20 text-white focus:border-purple-400/50' : 'bg-white border-emerald-200 focus:ring-2 focus:ring-emerald-500'}`}/>
                </div>

                <textarea rows={4} placeholder="Full message details..." value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} className={`w-full border rounded-2xl px-4 py-3 text-sm outline-none resize-none transition-all ${isDark ? 'bg-black/40 border-purple-500/20 text-white focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/50' : 'bg-white border-emerald-200 focus:ring-2 focus:ring-emerald-500'}`}></textarea>
              </div>

              <button onClick={handleCreatePost} className={`mt-6 text-[10px] tracking-[0.2em] font-bold uppercase px-6 py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto ${isDark ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                 Transmit Live
              </button>
            </div>

            <div className="space-y-4">
              <h4 className={`text-[10px] uppercase tracking-widest border-b pb-3 ${isDark ? 'text-slate-500 border-white/10' : 'text-slate-500 font-bold border-slate-200'}`}>Feed History</h4>
              <div className="grid gap-4">
                {announcements.map(post => (
                   <div key={post.id} className={`p-6 rounded-[32px] border flex items-start justify-between gap-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                     <div>
                       <div className="flex gap-2 items-center mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded ${isDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-slate-100 text-slate-500'}`}>{post.category}</span>
                          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{post.date}</span>
                       </div>
                       <h5 className={`font-bold text-lg leading-tight mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>{post.title}</h5>
                       <p className={`text-sm line-clamp-3 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{post.content}</p>
                     </div>
                     <button onClick={() => handleDeleteAnnouncement(post.id)} className={`p-3 rounded-xl border transition-colors shrink-0 ${isDark ? 'text-slate-400 border-transparent hover:border-rose-500/30 hover:text-rose-400 hover:bg-rose-500/10' : 'text-slate-400 border-transparent hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50'}`}>
                       <Trash2 className="w-5 h-5" />
                     </button>
                   </div>
                ))}
                {announcements.length === 0 && (
                  <div className="text-[10px] font-mono uppercase tracking-widest text-center py-8 text-slate-500">No broadcasts recorded.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'slots' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <h3 className={`text-3xl font-extralight tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Coaching Slots</h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Manage available sessions, freeze your schedule, or view bookings.</p>
            </div>

            <div className={`rounded-[32px] p-8 border shadow-sm ${isDark ? 'bg-cyan-500/5 border-cyan-500/10' : 'bg-blue-50 border-blue-100'}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`}>
                <Plus className="w-4 h-4" />
                Add New Time Slot
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2">Date</label>
                  <input type="date" value={newSlot.date} onChange={e => setNewSlot({...newSlot, date: e.target.value})} className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all ${isDark ? 'bg-black/40 border-cyan-500/20 text-white focus:ring-cyan-500/50' : 'bg-white border-blue-200 focus:ring-blue-500'}`}/>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2">Start Time</label>
                  <input type="time" value={newSlot.startTime} onChange={e => setNewSlot({...newSlot, startTime: e.target.value})} className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all ${isDark ? 'bg-black/40 border-cyan-500/20 text-white focus:ring-cyan-500/50' : 'bg-white border-blue-200 focus:ring-blue-500'}`}/>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2">End Time</label>
                  <input type="time" value={newSlot.endTime} onChange={e => setNewSlot({...newSlot, endTime: e.target.value})} className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all ${isDark ? 'bg-black/40 border-cyan-500/20 text-white focus:ring-cyan-500/50' : 'bg-white border-blue-200 focus:ring-blue-500'}`}/>
                </div>
              </div>

              <button onClick={handleCreateSlot} className={`text-[10px] tracking-[0.2em] font-bold uppercase px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto ${isDark ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                Create Slot
              </button>
            </div>

            <div className={`rounded-[32px] border overflow-hidden ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <table className="w-full text-left text-sm">
                <thead className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
                  <tr>
                    <th className="px-6 py-4">Slot Details</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Bookings</th>
                    <th className="px-6 py-4 text-right">Controls</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-white/5 bg-black/20' : 'divide-slate-200 bg-white'}`}>
                  {slots.map(slot => (
                    <tr key={slot.id} className="group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{new Date(slot.date).toLocaleDateString()}</div>
                        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{slot.startTime} - {slot.endTime}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                          slot.status === 'available' ? 'bg-emerald-500/10 text-emerald-500' :
                          slot.status === 'booked' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-slate-500/10 text-slate-500'
                        }`}>
                          {slot.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {slot.bookedBy ? (
                          <div>
                            <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{slot.bookedBy.name}</div>
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{slot.bookedBy.email}</div>
                          </div>
                        ) : (
                          <span className={`text-xs italic ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          {slot.status === 'available' && (
                            <button onClick={() => handleSlotAction(slot.id, 'freeze')} className={`p-2 rounded-lg transition-colors border ${isDark ? 'border-white/10 hover:bg-white/10 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`} title="Freeze Slot">
                              <Snowflake className="w-4 h-4" />
                            </button>
                          )}
                          {slot.status === 'frozen' && (
                            <button onClick={() => handleSlotAction(slot.id, 'unfreeze')} className={`p-2 rounded-lg transition-colors border ${isDark ? 'border-white/10 hover:bg-white/10 text-emerald-400' : 'border-slate-200 hover:bg-slate-50 text-emerald-600'}`} title="Unfreeze Slot">
                              <Unlock className="w-4 h-4" />
                            </button>
                          )}
                          <button onClick={() => handleSlotAction(slot.id, 'delete')} className={`p-2 rounded-lg transition-colors border ${isDark ? 'border-transparent text-slate-500 hover:text-rose-400 hover:bg-rose-500/10' : 'border-transparent text-slate-400 hover:text-rose-600 hover:bg-rose-50'}`} title="Delete Slot">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {slots.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-[10px] uppercase tracking-widest font-mono text-slate-500">
                        No coaching slots have been created yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeAdminTab === 'activity' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <h3 className={`text-3xl font-extralight tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Activity Log</h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Review recent system changes, additions, and deletions.</p>
            </div>
            
            <div className={`rounded-[32px] p-8 border shadow-sm ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
              <h4 className={`text-[10px] uppercase tracking-widest border-b pb-3 mb-4 ${isDark ? 'text-slate-500 border-white/10' : 'text-slate-500 font-bold border-slate-200'}`}>Event History</h4>
              
              <div className="space-y-3">
                {activityLogs.map(log => (
                  <div key={log.id} className={`flex items-start justify-between gap-4 p-4 rounded-2xl border ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex gap-4 items-center">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                        <Activity className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                          {log.action} <span className={isDark ? 'text-cyan-400' : 'text-indigo-600'}>{log.target}</span>
                        </p>
                        <p className={`text-[10px] mt-1 font-mono uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{log.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {activityLogs.length === 0 && (
                  <div className="text-[10px] font-mono uppercase tracking-widest text-center py-8 text-slate-500">No activity logged yet.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
