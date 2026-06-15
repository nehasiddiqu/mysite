import { motion } from 'motion/react';
import { Appearance, Folder, Announcement } from '../types';
import { getThemeStyles, getBadgeStyles } from '../theme';
import { Sparkles, FolderSearch, ShieldAlert, Trash2, ArrowRight, Folder as FolderIcon } from 'lucide-react';

interface DashboardProps {
  appearance: Appearance;
  folders: Folder[];
  announcements: Announcement[];
  searchQuery: string;
  onSelectFolder: (f: Folder) => void;
  openSafetyGuide: () => void;
}

export function Dashboard({ appearance, folders, announcements, searchQuery, onSelectFolder, openSafetyGuide }: DashboardProps) {
  const theme = getThemeStyles(appearance.color);
  
  const filteredAnnouncements = announcements.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className={`text-white p-6 md:p-10 relative overflow-hidden shadow-lg transition-all duration-300 bg-gradient-to-r ${theme.gradient} ${appearance.rounding}`}>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
          <Sparkles className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/10"
          >
            {appearance.heroTag}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-3xl sm:text-5xl font-extrabold mt-4 tracking-tight leading-tight`}
          >
            {appearance.heroTitle}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 mt-4 text-sm sm:text-base leading-relaxed max-w-xl"
          >
            {appearance.heroDesc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button onClick={() => document.getElementById('drive-directory')?.scrollIntoView({ behavior: 'smooth' })} className={`bg-white hover:bg-slate-50 px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 ${theme.text}`}>
              <FolderSearch className="w-4 h-4" />
              Browse Materials
            </button>
            <button onClick={openSafetyGuide} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Safety Rules First
            </button>
          </motion.div>
        </div>
      </div>

      {/* Leadership Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`overflow-hidden border shadow-sm ${appearance.darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} ${appearance.rounding}`}
      >
        <div className="flex flex-col lg:flex-row">
          <div className={`p-8 lg:w-1/3 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r ${appearance.darkMode ? 'bg-black/20 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className="relative mb-6">
              <div className={`absolute inset-0 rounded-full blur-xl opacity-50 ${theme.bg}`}></div>
              {appearance.profileImageUrl ? (
                <img 
                  src={appearance.profileImageUrl} 
                  alt={appearance.profileName} 
                  className="w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover relative z-10 border-4 border-white/10 shadow-xl"
                />
              ) : (
                <div className={`w-48 h-48 lg:w-56 lg:h-56 rounded-full relative z-10 border-4 border-white/10 shadow-xl flex items-center justify-center text-4xl font-bold ${appearance.darkMode ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  {appearance.profileName ? appearance.profileName.charAt(0) : 'U'}
                </div>
              )}
            </div>
            <h3 className={`text-2xl font-black tracking-tight mb-2 ${appearance.darkMode ? 'text-white' : 'text-slate-900'}`}>{appearance.profileName}</h3>
            <p className={`text-xs font-bold uppercase tracking-widest leading-relaxed ${theme.text}`}>
              {appearance.profileTitle}
            </p>
            {(appearance.socialInstagram || appearance.socialLinkedin) && (
              <div className="flex items-center gap-4 mt-6">
                {appearance.socialLinkedin && (
                  <a href={appearance.socialLinkedin} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${appearance.darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                )}
                {appearance.socialInstagram && (
                  <a href={appearance.socialInstagram} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${appearance.darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>
          <div className={`p-8 lg:p-10 lg:w-2/3 flex flex-col justify-center`}>
            {appearance.profileQuote && (
              <blockquote className={`text-xl font-medium italic mb-8 border-l-4 pl-6 ${appearance.darkMode ? 'text-white/90 border-white/20' : 'text-slate-800 border-slate-300'}`}>
                "{appearance.profileQuote}"
              </blockquote>
            )}
            <div className={`space-y-4 text-sm leading-relaxed ${appearance.darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {appearance.profileBio.split('\n').filter(p => p.trim() !== '').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-xl font-extrabold tracking-tight ${appearance.darkMode ? 'text-white' : 'text-slate-900'}`}>Academic Board</h3>
            <p className="text-sm text-slate-500 mt-1">Updates on computer workshops, assignments, and school events.</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full animate-pulse border ${theme.softBg} ${theme.text} ${theme.border}`}>
            {filteredAnnouncements.length} active updates
          </span>
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div className={`p-8 text-center text-sm text-slate-500 border rounded-[40px] ${appearance.darkMode ? 'bg-white/5 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'}`}>
            No announcements match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAnnouncements.map((post, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={post.id} 
                className={`border p-6 flex flex-col shadow-sm hover:shadow-md transition-all relative ${appearance.darkMode ? 'bg-white/5 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'} ${appearance.rounding}`}
              >
                <div className="flex items-center justify-between mb-4 pr-6">
                  <span className={`text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${getBadgeStyles(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                </div>
                <h4 className={`font-bold text-lg mb-2 pr-4 ${appearance.darkMode ? 'text-white' : 'text-slate-900'}`}>{post.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{post.content}</p>
                <div className={`pt-4 flex items-center justify-between border-t ${appearance.darkMode ? 'border-white/10' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${appearance.darkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {post.author.slice(0,2).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{post.author}</span>
                  </div>
                  {post.actionLink && post.actionLink !== '#' && (
                    <a href={post.actionLink} target="_blank" rel="noreferrer" className={`text-xs font-bold hover:opacity-80 flex items-center gap-1 ${theme.text}`}>
                      Read Details <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div id="drive-directory" className="pt-4">
        <h3 className={`text-xl font-extrabold tracking-tight mb-2 ${appearance.darkMode ? 'text-white' : 'text-slate-900'}`}>Explore Modules</h3>
        <p className="text-sm text-slate-500 mb-6">Directory view mirroring your resource folders.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {folders.map((folder, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={folder.id}
              onClick={() => onSelectFolder(folder)}
              className={`group border p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 relative overflow-hidden ${appearance.darkMode ? 'bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300'} ${appearance.rounding}`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              
              <div>
                <div className="flex items-start justify-between">
                  <span className={`p-2.5 rounded-xl transition-colors ${appearance.darkMode ? 'bg-white/5 border border-white/10' : 'bg-slate-50'} group-hover:${theme.softBg}`}>
                    <FolderIcon className={`w-6 h-6 transition-colors ${appearance.darkMode ? 'text-slate-400' : 'text-slate-400'} group-hover:${theme.text}`} />
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">{folder.category}</span>
                </div>
                <h4 className={`font-bold mt-4 leading-tight truncate text-sm transition-colors ${appearance.darkMode ? 'text-white group-hover:text-slate-300' : 'text-slate-800 '} group-hover:${theme.text}`}>
                  {folder.name}
                </h4>
              </div>
              <div className={`flex items-center justify-between pt-3 border-t text-xs font-medium border-slate-100/10 ${appearance.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>{folder.files?.length || 0} Assets</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
