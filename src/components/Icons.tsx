import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Company Icons
export const GoogleIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const AmazonIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.493.128.102.174.058.354-.135.54-.193.186-.726.55-1.6 1.09-1.02.63-2.2 1.14-3.54 1.53-1.34.39-2.68.583-4.02.583-1.978 0-3.9-.36-5.756-1.08C4.66 21.2 2.93 20.22 1.41 19.03c-.45-.353-.66-.606-.63-.76z" fill="#FF9900"/>
    <path d="M6.29 15.99c0-1.155.312-2.127.937-2.917.625-.79 1.45-1.327 2.476-1.612.862-.238 1.79-.356 2.783-.356.285 0 .67.017 1.156.05V9.51c0-.655-.07-1.09-.21-1.307-.14-.218-.444-.327-.912-.327l-.252.01c-.32.023-.57.117-.752.284-.18.168-.308.454-.38.858-.048.263-.162.423-.34.48-.18.057-.405.016-.675-.123l-1.326-.685c-.238-.127-.37-.265-.396-.417-.025-.152.033-.336.176-.552.382-.576.945-1 1.69-1.275.744-.274 1.632-.41 2.663-.41 1.312 0 2.334.298 3.066.893.732.595 1.098 1.503 1.098 2.725v5.076c0 .26.043.46.13.595.086.136.25.26.49.37.16.072.27.143.33.215.06.072.09.177.09.316 0 .363-.282.633-.846.81-.564.177-1.05.266-1.458.266-.742 0-1.254-.32-1.536-.96-.612.64-1.532.96-2.76.96-1.036 0-1.878-.286-2.528-.86-.65-.573-.974-1.332-.974-2.278zm4.073.143c.454 0 .85-.107 1.19-.32.338-.214.553-.48.646-.798V12.89c-.263-.024-.583-.036-.96-.036-.714 0-1.27.143-1.665.43-.396.285-.594.687-.594 1.205 0 .44.12.786.36 1.04.242.253.574.38.998.38l.025.02z" fill="#221F1F"/>
  </svg>
);

export const MetaIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="url(#meta-gradient)"/>
    <defs>
      <linearGradient id="meta-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0088FF"/>
        <stop offset="1" stopColor="#0055FF"/>
      </linearGradient>
    </defs>
  </svg>
);

export const AppleIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill="currentColor"/>
  </svg>
);

export const MicrosoftIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3H11V11H3V3Z" fill="#F25022"/>
    <path d="M13 3H21V11H13V3Z" fill="#7FBA00"/>
    <path d="M3 13H11V21H3V13Z" fill="#00A4EF"/>
    <path d="M13 13H21V21H13V13Z" fill="#FFB900"/>
  </svg>
);

export const NetflixIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24h-4.715zm8.489 0v9.63L18.6 22.951c.696.096 1.455.163 2.102.253-.156-.6-1.87-5.25-1.87-5.25l-5.943-17.9-.002-.054z" fill="#E50914"/>
  </svg>
);

export const UberIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#000"/>
    <path d="M6.5 8V13.5C6.5 14.88 7.62 16 9 16C10.38 16 11.5 14.88 11.5 13.5V8H10V13.5C10 14.05 9.55 14.5 9 14.5C8.45 14.5 8 14.05 8 13.5V8H6.5ZM12.5 8V16H14V12.72L16.5 16H18.2L15.3 12.16L18 8H16.4L14 11.44V8H12.5Z" fill="white"/>
  </svg>
);

export const AirbnbIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 18.275C11.535 17.625 11.118 16.958 10.751 16.275C10.168 15.158 9.668 13.975 9.668 12.825C9.668 11.475 10.718 10.375 12.001 10.375C13.285 10.375 14.335 11.475 14.335 12.825C14.335 13.975 13.835 15.158 13.251 16.275C12.885 16.958 12.468 17.625 12.001 18.275ZM12.001 6.708C8.935 6.708 6.501 9.308 6.501 12.475C6.501 14.308 7.235 16.058 8.035 17.575C8.918 19.225 9.935 20.708 10.801 21.858C11.135 22.308 11.535 22.808 12.001 22.808C12.468 22.808 12.868 22.308 13.201 21.858C14.068 20.708 15.085 19.225 15.968 17.575C16.768 16.058 17.501 14.308 17.501 12.475C17.501 9.308 15.068 6.708 12.001 6.708ZM12.001 1.208C5.735 1.208 0.668 6.275 0.668 12.541C0.668 15.941 2.168 19.008 4.535 21.141C4.935 21.491 5.551 21.458 5.901 21.058C6.251 20.658 6.218 20.041 5.818 19.691C3.868 17.941 2.668 15.391 2.668 12.541C2.668 7.375 6.835 3.208 12.001 3.208C17.168 3.208 21.335 7.375 21.335 12.541C21.335 15.391 20.135 17.941 18.185 19.691C17.785 20.041 17.751 20.658 18.101 21.058C18.285 21.275 18.535 21.375 18.785 21.375C19.001 21.375 19.218 21.308 19.401 21.141C21.835 19.008 23.335 15.941 23.335 12.541C23.335 6.275 18.268 1.208 12.001 1.208Z" fill="#FF5A5F"/>
  </svg>
);

export const StripeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#635BFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.128 8.194C11.128 7.578 11.633 7.332 12.472 7.332C13.656 7.332 15.155 7.702 16.339 8.317V5.015C15.045 4.523 13.767 4.338 12.472 4.338C9.713 4.338 7.86 5.878 7.86 8.379C7.86 12.328 13.326 11.652 13.326 13.377C13.326 14.101 12.695 14.347 11.803 14.347C10.509 14.347 8.863 13.793 7.553 13.1V16.449C9.007 17.065 10.479 17.327 11.803 17.327C14.625 17.327 16.605 15.834 16.605 13.3C16.59 9.029 11.128 9.844 11.128 8.194Z" fill="white"/>
  </svg>
);

export const SpotifyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM16.586 16.424C16.398 16.717 16.019 16.809 15.726 16.621C13.197 15.09 10.024 14.726 6.514 15.545C6.177 15.625 5.844 15.418 5.764 15.081C5.684 14.745 5.89 14.411 6.227 14.331C10.07 13.432 13.566 13.85 16.382 15.562C16.675 15.75 16.774 16.131 16.586 16.424ZM17.81 13.715C17.576 14.078 17.1 14.19 16.737 13.956C13.837 12.186 9.423 11.67 6.226 12.677C5.82 12.8 5.386 12.574 5.263 12.168C5.14 11.762 5.367 11.328 5.773 11.205C9.453 10.052 14.306 10.628 17.612 12.66C17.975 12.895 18.088 13.352 17.81 13.715ZM17.915 10.893C14.423 8.818 8.95 8.596 5.82 9.553C5.332 9.703 4.816 9.429 4.666 8.94C4.516 8.452 4.79 7.936 5.279 7.786C8.907 6.671 15.014 6.936 19.025 9.337C19.466 9.6 19.608 10.177 19.345 10.618C19.082 11.059 18.356 11.155 17.915 10.893Z" fill="#1DB954"/>
  </svg>
);

export const HealthcareIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="url(#heart-gradient)"/>
    <path d="M9 10H11V8H13V10H15V12H13V14H11V12H9V10Z" fill="white"/>
    <defs>
      <linearGradient id="heart-gradient" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6B6B"/>
        <stop offset="1" stopColor="#EE5A5A"/>
      </linearGradient>
    </defs>
  </svg>
);

// Category Icons
export const BehavioralIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="url(#behavioral-gradient)"/>
    <path d="M4 20C4 16.6863 7.13401 14 12 14C16.866 14 20 16.6863 20 20V21H4V20Z" fill="url(#behavioral-gradient)"/>
    <defs>
      <linearGradient id="behavioral-gradient" x1="4" y1="4" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8B5CF6"/>
        <stop offset="1" stopColor="#6366F1"/>
      </linearGradient>
    </defs>
  </svg>
);

export const TechnicalIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="14" rx="2" fill="url(#technical-gradient)"/>
    <path d="M8 9L5 12L8 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 9L19 12L16 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 8L10 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 20H16" stroke="url(#technical-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="technical-gradient" x1="2" y1="4" x2="22" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#059669"/>
      </linearGradient>
    </defs>
  </svg>
);

export const SystemDesignIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1.5" fill="url(#system-gradient)"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5" fill="url(#system-gradient)"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5" fill="url(#system-gradient)"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5" fill="url(#system-gradient)"/>
    <path d="M10 6.5H14" stroke="url(#system-gradient)" strokeWidth="2"/>
    <path d="M10 17.5H14" stroke="url(#system-gradient)" strokeWidth="2"/>
    <path d="M6.5 10V14" stroke="url(#system-gradient)" strokeWidth="2"/>
    <path d="M17.5 10V14" stroke="url(#system-gradient)" strokeWidth="2"/>
    <defs>
      <linearGradient id="system-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B"/>
        <stop offset="1" stopColor="#D97706"/>
      </linearGradient>
    </defs>
  </svg>
);

export const ProblemSolvingIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#problem-gradient)"/>
    <path d="M2 17L12 22L22 17" stroke="url(#problem-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="url(#problem-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="problem-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EC4899"/>
        <stop offset="1" stopColor="#DB2777"/>
      </linearGradient>
    </defs>
  </svg>
);

export const LeadershipIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#leadership-gradient)"/>
    <defs>
      <linearGradient id="leadership-gradient" x1="2" y1="2" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const SituationalIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#situational-gradient)"/>
    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="situational-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06B6D4"/>
        <stop offset="1" stopColor="#0891B2"/>
      </linearGradient>
    </defs>
  </svg>
);

export const CodingIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="18" rx="2" fill="url(#coding-gradient)"/>
    <path d="M7 8L4 11L7 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8L20 11L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 6L10 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="coding-gradient" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6"/>
        <stop offset="1" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
  </svg>
);

export const SQLIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="6" rx="8" ry="3" fill="url(#sql-gradient)"/>
    <path d="M4 6V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V6" stroke="url(#sql-gradient)" strokeWidth="2"/>
    <path d="M4 12V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V12" stroke="url(#sql-gradient)" strokeWidth="2"/>
    <defs>
      <linearGradient id="sql-gradient" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8B5CF6"/>
        <stop offset="1" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
  </svg>
);

export const AnalyticsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="14" width="4" height="7" rx="1" fill="url(#analytics-gradient)"/>
    <rect x="10" y="10" width="4" height="11" rx="1" fill="url(#analytics-gradient)"/>
    <rect x="17" y="6" width="4" height="15" rx="1" fill="url(#analytics-gradient)"/>
    <path d="M3 6L8 9L12 5L21 3" stroke="url(#analytics-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="21" cy="3" r="2" fill="url(#analytics-gradient)"/>
    <defs>
      <linearGradient id="analytics-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#14B8A6"/>
        <stop offset="1" stopColor="#0D9488"/>
      </linearGradient>
    </defs>
  </svg>
);

// Action Icons
export const MicrophoneIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="2" width="8" height="12" rx="4" fill="url(#mic-gradient)"/>
    <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="url(#mic-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 18V22" stroke="url(#mic-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 22H16" stroke="url(#mic-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="mic-gradient" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EF4444"/>
        <stop offset="1" stopColor="#DC2626"/>
      </linearGradient>
    </defs>
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#play-gradient)"/>
    <path d="M10 8L16 12L10 16V8Z" fill="white"/>
    <defs>
      <linearGradient id="play-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#22C55E"/>
        <stop offset="1" stopColor="#16A34A"/>
      </linearGradient>
    </defs>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#check-gradient)"/>
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="check-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#22C55E"/>
        <stop offset="1" stopColor="#16A34A"/>
      </linearGradient>
    </defs>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#close-gradient)"/>
    <path d="M15 9L9 15M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="close-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EF4444"/>
        <stop offset="1" stopColor="#DC2626"/>
      </linearGradient>
    </defs>
  </svg>
);

export const TimerIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="13" r="9" stroke="url(#timer-gradient)" strokeWidth="2"/>
    <path d="M12 9V13L15 15" stroke="url(#timer-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 2H15" stroke="url(#timer-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="timer-gradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B"/>
        <stop offset="1" stopColor="#D97706"/>
      </linearGradient>
    </defs>
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ className = '', size = 24, filled = false }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill={filled ? "url(#star-gradient)" : "none"}
      stroke={filled ? "none" : "#6B7280"}
      strokeWidth="2"
    />
    <defs>
      <linearGradient id="star-gradient" x1="2" y1="2" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 21H16" stroke="url(#trophy-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 17V21" stroke="url(#trophy-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 4H17V9C17 11.7614 14.7614 14 12 14C9.23858 14 7 11.7614 7 9V4Z" fill="url(#trophy-gradient)"/>
    <path d="M7 7H4C4 9.20914 5.79086 11 8 11" stroke="url(#trophy-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 7H20C20 9.20914 18.2091 11 16 11" stroke="url(#trophy-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 4H17" stroke="url(#trophy-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="trophy-gradient" x1="4" y1="4" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const ChartIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3V21H21" stroke="url(#chart-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 16L12 11L15 14L21 8" stroke="url(#chart-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="21" cy="8" r="2" fill="url(#chart-gradient)"/>
    <defs>
      <linearGradient id="chart-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1"/>
        <stop offset="1" stopColor="#4F46E5"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4C10.4087 4 8.88258 4.63214 7.75736 5.75736C6.63214 6.88258 6 8.4087 6 10C6 11.5913 6.63214 13.1174 7.75736 14.2426L12 18.4853L16.2426 14.2426C17.3679 13.1174 18 11.5913 18 10C18 8.4087 17.3679 6.88258 16.2426 5.75736C15.1174 4.63214 13.5913 4 12 4Z" fill="url(#brain-gradient)"/>
    <path d="M12 18.4853V22" stroke="url(#brain-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="10" cy="9" r="1" fill="white"/>
    <circle cx="14" cy="9" r="1" fill="white"/>
    <path d="M10 12C10 12 11 13 12 13C13 13 14 12 14 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="brain-gradient" x1="6" y1="4" x2="18" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EC4899"/>
        <stop offset="1" stopColor="#DB2777"/>
      </linearGradient>
    </defs>
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="url(#target-gradient)" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="url(#target-gradient)" strokeWidth="2"/>
    <circle cx="12" cy="12" r="1" fill="url(#target-gradient)"/>
    <defs>
      <linearGradient id="target-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EF4444"/>
        <stop offset="1" stopColor="#DC2626"/>
      </linearGradient>
    </defs>
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13401 2 5 5.13401 5 9C5 11.3869 6.20085 13.4892 8 14.6458V17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17V14.6458C17.7991 13.4892 19 11.3869 19 9C19 5.13401 15.866 2 12 2Z" fill="url(#bulb-gradient)"/>
    <path d="M9 21H15" stroke="url(#bulb-gradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 18V21H14V18" stroke="url(#bulb-gradient)" strokeWidth="2"/>
    <defs>
      <linearGradient id="bulb-gradient" x1="5" y1="2" x2="19" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="url(#doc-gradient)"/>
    <path d="M14 2V8H20" stroke="#4F46E5" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M8 13H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 17H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="doc-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1"/>
        <stop offset="1" stopColor="#4F46E5"/>
      </linearGradient>
    </defs>
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Company icon mapping helper
export const getCompanyIcon = (company: string, size = 24): React.ReactNode => {
  const icons: { [key: string]: React.ReactNode } = {
    'Google': <GoogleIcon size={size} />,
    'Amazon': <AmazonIcon size={size} />,
    'Meta': <MetaIcon size={size} />,
    'Apple': <AppleIcon size={size} />,
    'Microsoft': <MicrosoftIcon size={size} />,
    'Netflix': <NetflixIcon size={size} />,
    'Uber': <UberIcon size={size} />,
    'Airbnb': <AirbnbIcon size={size} />,
    'Stripe': <StripeIcon size={size} />,
    'Spotify': <SpotifyIcon size={size} />,
    'Healthcare Company': <HealthcareIcon size={size} />,
  };
  return icons[company] || <BrainIcon size={size} />;
};

// Category icon mapping helper
export const getCategoryIcon = (category: string, size = 24): React.ReactNode => {
  const icons: { [key: string]: React.ReactNode } = {
    'Behavioral': <BehavioralIcon size={size} />,
    'Technical': <TechnicalIcon size={size} />,
    'System Design': <SystemDesignIcon size={size} />,
    'Problem Solving': <ProblemSolvingIcon size={size} />,
    'Leadership': <LeadershipIcon size={size} />,
    'Situational': <SituationalIcon size={size} />,
    'Coding': <CodingIcon size={size} />,
    'SQL': <SQLIcon size={size} />,
    'Analytics': <AnalyticsIcon size={size} />,
  };
  return icons[category] || <BrainIcon size={size} />;
};
