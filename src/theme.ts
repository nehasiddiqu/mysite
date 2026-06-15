export const getThemeStyles = (color: string) => {
  const themes: Record<string, any> = {
    cyan: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      textLight: 'text-cyan-200',
      hoverBg: 'hover:bg-cyan-500/20',
      hoverText: 'hover:text-cyan-300',
      softBg: 'bg-cyan-400/5',
      activeTab: 'bg-white/10 border border-white/10 text-white shadow-sm',
      gradient: 'from-cyan-400/10 to-[#020305]',
      border: 'border-white/10',
      ring: 'focus:ring-cyan-500/50'
    },
    indigo: {
      bg: 'bg-indigo-600',
      text: 'text-indigo-600',
      textLight: 'text-indigo-200',
      hoverBg: 'hover:bg-indigo-50',
      hoverText: 'hover:text-indigo-700',
      softBg: 'bg-indigo-50',
      activeTab: 'bg-indigo-600 text-white shadow-sm',
      gradient: 'from-indigo-600 to-violet-700',
      border: 'border-indigo-200',
      ring: 'focus:ring-indigo-500'
    },
    emerald: {
      bg: 'bg-emerald-600',
      text: 'text-emerald-600',
      textLight: 'text-emerald-200',
      hoverBg: 'hover:bg-emerald-50',
      hoverText: 'hover:text-emerald-700',
      softBg: 'bg-emerald-50',
      activeTab: 'bg-emerald-600 text-white shadow-sm',
      gradient: 'from-emerald-600 to-teal-700',
      border: 'border-emerald-200',
      ring: 'focus:ring-emerald-500'
    },
    rose: {
      bg: 'bg-rose-600',
      text: 'text-rose-600',
      textLight: 'text-rose-200',
      hoverBg: 'hover:bg-rose-50',
      hoverText: 'hover:text-rose-700',
      softBg: 'bg-rose-50',
      activeTab: 'bg-rose-600 text-white shadow-sm',
      gradient: 'from-rose-600 to-pink-700',
      border: 'border-rose-200',
      ring: 'focus:ring-rose-500'
    },
    amber: {
      bg: 'bg-amber-600',
      text: 'text-amber-600',
      textLight: 'text-amber-200',
      hoverBg: 'hover:bg-amber-50',
      hoverText: 'hover:text-amber-700',
      softBg: 'bg-amber-50',
      activeTab: 'bg-amber-600 text-white shadow-sm',
      gradient: 'from-amber-600 to-yellow-600',
      border: 'border-amber-200',
      ring: 'focus:ring-amber-500'
    },
    slate: {
      bg: 'bg-slate-800',
      text: 'text-slate-800',
      textLight: 'text-slate-300',
      hoverBg: 'hover:bg-slate-100',
      hoverText: 'hover:text-slate-900',
      softBg: 'bg-slate-100',
      activeTab: 'bg-slate-800 text-white shadow-sm',
      gradient: 'from-slate-700 to-slate-900',
      border: 'border-slate-300',
      ring: 'focus:ring-slate-500'
    }
  };
  return themes[color as keyof typeof themes] || themes.indigo;
};

export const getBadgeStyles = (category: string) => {
  switch (category) {
    case 'Safety': return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'Competition': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Homework': return 'bg-sky-50 text-sky-700 border-sky-200';
    default: return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }
};
