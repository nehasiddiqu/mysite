import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Appearance, Folder, Announcement, FileItem, ActivityLog, Slot } from './types';
import { defaultAppearance, defaultFolders, defaultAnnouncements } from './data';
import { Header, Sidebar } from './components/Navigation';

import { Dashboard } from './components/Dashboard';
import { FolderView } from './components/FolderView';
import { FileModal, SafetyModal } from './components/Modals';
import { AdminDashboard } from './components/AdminDashboard';
import { ContactModal } from './components/ContactModal';
import { CoachingView } from './components/CoachingView';

export default function App() {
  // State Initialization
  const [appearance, setAppearance] = useState<Appearance>(defaultAppearance);
  const [folders, setFolders] = useState<Folder[]>(defaultFolders);
  const [announcements, setAnnouncements] = useState<Announcement[]>(defaultAnnouncements);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal Controls
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Persistence (LocalStorage)
  useEffect(() => {
    const savedState = localStorage.getItem('ictLabState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.appearance) {
          setAppearance({
            ...defaultAppearance,
            ...parsed.appearance,
            profileName: parsed.appearance.profileName || defaultAppearance.profileName,
            profileTitle: parsed.appearance.profileTitle || defaultAppearance.profileTitle,
            profileBio: parsed.appearance.profileBio || defaultAppearance.profileBio,
            profileImageUrl: parsed.appearance.profileImageUrl || defaultAppearance.profileImageUrl,
            profileQuote: parsed.appearance.profileQuote || defaultAppearance.profileQuote,
            socialInstagram: parsed.appearance.socialInstagram !== undefined ? parsed.appearance.socialInstagram : defaultAppearance.socialInstagram,
            socialLinkedin: parsed.appearance.socialLinkedin !== undefined ? parsed.appearance.socialLinkedin : defaultAppearance.socialLinkedin
          });
        }
        if (parsed.folders) setFolders(parsed.folders);
        if (parsed.announcements) setAnnouncements(parsed.announcements);
        if (parsed.activityLogs) setActivityLogs(parsed.activityLogs);
        if (parsed.slots) setSlots(parsed.slots);
      } catch (e) { console.error("Error restoring from cache"); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ictLabState', JSON.stringify({ appearance, folders, announcements, activityLogs, slots }));
  }, [appearance, folders, announcements, activityLogs, slots]);

  // Initial loading simulation
  useEffect(() => {
    setIsProcessing(true);
    const timer = setTimeout(() => setIsProcessing(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Handlers
  const handleSelectFolder = (folder: Folder) => {
    setIsProcessing(true);
    setTimeout(() => {
      setSelectedFolder(folder);
      setActiveTab('folder');
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className={`antialiased min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden ${appearance.darkMode ? 'bg-[#020305] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {appearance.darkMode && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]"></div>
          <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px]"></div>
        </div>
      )}
      <div className="relative z-10 flex flex-col min-h-screen h-full overflow-y-auto">
        <Header 
        appearance={appearance}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dbConnected={true} // Simulating connection
        isProcessing={isProcessing}
        onContactClick={() => setIsContactModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <Sidebar 
          appearance={appearance}
          folders={folders}
          activeTab={activeTab}
          selectedFolderId={selectedFolder?.id || null}
          onSelectFolder={handleSelectFolder}
        />

        <section className="flex-1 min-w-0 pb-16">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Dashboard 
                  appearance={appearance}
                  folders={folders}
                  announcements={announcements}
                  searchQuery={searchQuery}
                  onSelectFolder={handleSelectFolder}
                  openSafetyGuide={() => setIsSafetyOpen(true)}
                />
              </motion.div>
            ) : activeTab === 'admin' ? (
              <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AdminDashboard 
                  appearance={appearance}
                  setAppearance={setAppearance}
                  folders={folders}
                  setFolders={setFolders}
                  announcements={announcements}
                  setAnnouncements={setAnnouncements}
                  activityLogs={activityLogs}
                  setActivityLogs={setActivityLogs}
                  slots={slots}
                  setSlots={setSlots}
                  setIsProcessing={setIsProcessing}
                />
              </motion.div>
            ) : activeTab === 'coaching' ? (
              <motion.div key="coaching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CoachingView 
                  appearance={appearance}
                  slots={slots}
                  setSlots={setSlots}
                  setIsProcessing={setIsProcessing}
                />
              </motion.div>
            ) : (
              <motion.div key="folder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FolderView 
                  appearance={appearance}
                  folder={selectedFolder}
                  setActiveTab={setActiveTab}
                  onOpenFile={(f) => {
                    setIsProcessing(true);
                    setTimeout(() => {
                      setActiveFile(f);
                      setIsProcessing(false);
                    }, 400);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className={`border-t py-8 mt-auto transition-colors duration-300 relative z-10 ${appearance.darkMode ? 'bg-white/5 border-white/5 text-slate-400 backdrop-blur-md' : 'bg-white border-slate-200 text-slate-500'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[10px] uppercase tracking-widest space-y-2">
          <p>&copy; {new Date().getFullYear()} Neha Siddiqui. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals placed outside main flow for clean z-indexing */}
      <SafetyModal isOpen={isSafetyOpen} onClose={() => setIsSafetyOpen(false)} />
      
      <FileModal 
        isOpen={!!activeFile} 
        file={activeFile} 
        onClose={() => setActiveFile(null)} 
        folderName={selectedFolder?.name || ''} 
      />
      
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        appearance={appearance}
      />
      </div>
    </div>
  );
}
