export interface Slot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'frozen';
  bookedBy?: {
    name: string;
    email: string;
    notes?: string;
  };
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  downloadUrl?: string;
}

export interface Folder {
  id: string;
  name: string;
  category: 'ai' | 'stem' | string;
  driveUrl: string;
  driveEmbedUrl: string;
  files: FileItem[];
}

export interface Announcement {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  author: string;
  actionLink: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface Appearance {
  title: string;
  subtitle: string;
  logoType: 'icon' | 'image';
  logoIcon: string;
  logoUrl: string;
  color: 'indigo' | 'emerald' | 'rose' | 'amber' | 'slate' | 'cyan';
  rounding: string;
  darkMode: boolean;
  bannerText: string;
  heroTag: string;
  heroTitle: string;
  heroDesc: string;
  profileName: string;
  profileTitle: string;
  profileQuote: string;
  profileBio: string;
  profileImageUrl: string;
  socialInstagram?: string;
  socialLinkedin?: string;
}
