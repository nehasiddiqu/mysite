import type { Folder, Announcement, Appearance } from './types';

export const defaultAppearance: Appearance = {
  title: 'ICT Virtual lab',
  subtitle: 'Organized Learning Hub',
  logoType: 'icon',
  logoIcon: 'terminal',
  logoUrl: '',
  color: 'cyan',
  rounding: 'rounded-[40px]',
  darkMode: true,
  bannerText: 'Welcome to the Virtual Lab! Access dynamic resources and folders.',
  heroTag: 'Welcome Students',
  heroTitle: 'ICT Virtual lab Portal',
  heroDesc: 'Your launchpad for lesson assignments, digital innovation resources, and computer system blueprints. Select a folder to explore.',
  profileName: 'Neha Siddiqui',
  profileTitle: 'Technologist | Educator | Digital Transformation & Innovation Leader',
  profileQuote: 'Empowering minds. Transforming ideas. Building a smarter, more inclusive future.',
  profileBio: 'Neha Siddiqui is an accomplished educator, technologist, and innovation leader with extensive experience in educational technology, digital transformation, artificial intelligence, and curriculum innovation. As Head of Information Technology, she is passionate about empowering learners and educators through technology-driven teaching and learning practices that foster creativity, critical thinking, and future-ready skills.\n\nWith expertise spanning digital learning, AI integration, STEM education, computational thinking, and educational leadership, Neha has led transformative initiatives that bridge the gap between emerging technologies and impactful classroom practice. She has successfully designed and implemented innovative curricula, facilitated international professional development programs, and mentored educators in adopting cutting-edge educational technologies.\n\nA recognized leader in the global education community, Neha holds numerous prestigious certifications, including Microsoft Innovative Educator Expert (MIEE), Google Certified Educator Levels 1 and 2, Samsung Certified Educator, National Geographic Certified Educator, and multiple AI, data science, and educational technology credentials from leading organizations such as Google, Microsoft, IBM, Apple, and STEM.org.\n\nBeyond the classroom, she actively contributes to educational research, professional learning networks, AI in Education think tanks, and international leadership programs. Her work focuses on creating inclusive, technology-enhanced learning environments that prepare students to thrive in an increasingly digital world.\n\nAs a speaker, trainer, researcher, and advocate for innovation in education, Neha continues to inspire growth, empower futures, and lead meaningful transformation through technology, leadership, and lifelong learning.',
  profileImageUrl: '/neha_siddiqui_portrait.jpg',
  socialInstagram: 'https://www.instagram.com/techaics/?hl=en',
  socialLinkedin: 'https://www.linkedin.com/in/neha-siddiqui-fcct-med-8669a4145/?skipRedirect=true'
};

export const defaultFolders: Folder[] = [
  {
    id: 'after-school',
    name: 'After school Club',
    category: 'stem',
    driveUrl: 'https://drive.google.com',
    driveEmbedUrl: '',
    files: [
      { id: 'as1', name: 'Robotics Workshop Schedule.pdf', type: 'pdf', size: '1.2 MB', modified: 'Jan 15' },
      { id: 'as2', name: 'Club Safety and Conduct Guide.docx', type: 'doc', size: '840 KB', modified: 'Feb 10' }
    ]
  },
  {
    id: 'ai-frameworks',
    name: 'AI frameworks and architectures',
    category: 'ai',
    driveUrl: 'https://drive.google.com',
    driveEmbedUrl: '',
    files: [
      { id: 'aif1', name: 'Machine Learning Design Ethics.pdf', type: 'pdf', size: '1.8 MB', modified: 'Mar 1' }
    ]
  },
  {
    id: 'ai-innovation',
    name: 'AI Innovation',
    category: 'ai',
    driveUrl: 'https://drive.google.com',
    driveEmbedUrl: '',
    files: [
      { id: 'aii1', name: 'AI Generative Design Assets.zip', type: 'zip', size: '15.4 MB', modified: 'Feb 18' }
    ]
  },
  {
    id: 'courses',
    name: 'Courses',
    category: 'stem',
    driveUrl: 'https://drive.google.com',
    driveEmbedUrl: '',
    files: [
      { id: 'c1', name: 'Syllabus and Assessment Criteria.pdf', type: 'pdf', size: '3.0 MB', modified: 'Sep 3' }
    ]
  },
  {
    id: 'e-safety',
    name: 'E Safety',
    category: 'stem',
    driveUrl: 'https://drive.google.com',
    driveEmbedUrl: '',
    files: [
      { id: 'es1', name: 'Online Safety Workshop Guide.pdf', type: 'pdf', size: '920 KB', modified: 'Jan 8' }
    ]
  },
  {
    id: 'stem-resources',
    name: 'STEM Resources',
    category: 'stem',
    driveUrl: 'https://drive.google.com',
    driveEmbedUrl: '',
    files: [
      { id: 'sr1', name: '3D Printer Calibration Blueprint.gcode', type: 'gcode', size: '4.2 MB', modified: 'Feb 20' }
    ]
  }
];

export const defaultAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Term Project Submissions',
    category: 'General',
    content: 'All computer science portfolios must be uploaded to their respective folders. Check the rubric spreadsheet for criteria weights.',
    date: 'May 10',
    author: 'Neha Siddiqui',
    actionLink: '#'
  },
  {
    id: '2',
    title: 'E-Safety Framework Notice',
    category: 'Safety',
    content: 'New guidelines require all pupils to complete their safe password assessments before executing programming logic models.',
    date: 'May 8',
    author: 'Neha Siddiqui',
    actionLink: '#'
  }
];
