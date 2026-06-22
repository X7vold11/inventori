import { useTheme } from '../ThemeContext';
import { Package } from 'lucide-react';

// Themed Button Component
export const ThemedButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const { themeConfig } = useTheme();
  
  const variants = {
    primary: `bg-gradient-to-r ${themeConfig.button} text-white shadow-sm shadow-theme-shadow/40 hover:shadow-md hover:shadow-theme-shadow/60`,
    secondary: `bg-theme-bg-light hover:bg-theme-bg-lighter text-theme-text border border-theme-border/60`,
    outline: `border border-theme-border-accent text-theme-text hover:bg-theme-bg-light/50`,
  };
  
  return (
    <button
      className={`${variants[variant]} px-5 py-2.5 rounded-xl font-semibold transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Themed Card Component
export const ThemedCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm ${
        hover ? `hover:shadow-md hover:-translate-y-0.5 transition-all duration-250` : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Themed Badge Component
export const ThemedBadge = ({ children, variant = 'default', className = '' }) => {
  const { themeConfig } = useTheme();
  
  const variants = {
    default: `bg-theme-bg-light text-theme-text border-theme-border`,
    solid: `bg-gradient-to-r ${themeConfig.button} text-white border-transparent`,
    outline: `border border-theme-border-accent text-theme-text`,
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Themed Icon Container
export const ThemedIconContainer = ({ children, size = 'md', className = '' }) => {
  const { themeConfig } = useTheme();
  
  const sizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-xl',
    xl: 'w-16 h-16 rounded-2xl',
  };
  
  return (
    <div className={`${sizes[size]} bg-gradient-to-br ${themeConfig.sidebar} flex items-center justify-center shadow-sm shadow-theme-shadow/30 ${className}`}>
      {children}
    </div>
  );
};

// Themed Input Component
export const ThemedInput = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-theme-primary/10 focus:border-theme-border-accent transition-all text-sm font-medium text-slate-700 placeholder-slate-400 premium-input ${className}`}
      {...props}
    />
  );
};

// Themed Select Component
export const ThemedSelect = ({ children, className = '', ...props }) => {
  return (
    <select
      className={`w-full px-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-theme-primary/10 focus:border-theme-border-accent transition-all text-sm font-medium text-slate-700 appearance-none cursor-pointer premium-input ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

// Themed Header Component
export const ThemedPageHeader = ({ title, subtitle, action, icon: Icon }) => {
  const { themeConfig } = useTheme();
  
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${themeConfig.sidebar}`}></div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            {subtitle}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {Icon && (
            <ThemedIconContainer size="md">
              <Icon size={20} className="text-white" />
            </ThemedIconContainer>
          )}
          <h1 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${themeConfig.cardHeader} tracking-tight leading-tight`}>
            {title}
          </h1>
        </div>
      </div>
      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
};

// Themed Stat Card
export const ThemedStatCard = ({ title, value, icon: Icon, suffix = '', className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all duration-250 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-theme-bg-light text-theme-text rounded-xl">
          <Icon size={18} />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-2xl font-bold text-slate-800 stat-value">
        {value}
        {suffix && <span className="text-xs font-medium text-slate-400 ml-1">{suffix}</span>}
      </p>
    </div>
  );
};

// Themed Loading Spinner
export const ThemedLoadingSpinner = ({ text = 'Memuat data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-3 border-slate-200 border-t-theme-primary animate-spin"></div>
        <Package size={16} className="absolute text-theme-primary" />
      </div>
      <p className="mt-4 text-slate-400 font-medium tracking-wide text-xs">{text}</p>
    </div>
  );
};

// Helper to get themed class
export const useThemedClass = (property) => {
  const { themeConfig } = useTheme();
  return themeConfig[property] || '';
};

