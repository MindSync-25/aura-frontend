// Design tokens for Aura - Your Space
// Premium, calm, classy aesthetic

export const colors = {
  // Light mode
  light: {
    background: '#FFFFFF',
    surface: '#FAFAFA',
    surfaceElevated: '#FFFFFF',
    border: '#E5E5E5',
    borderSubtle: '#F0F0F0',
    
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
      tertiary: '#999999',
      disabled: '#CCCCCC',
    },
    
    accent: {
      primary: '#6B5CE7',      // Soft purple
      primaryHover: '#5A4CD6',
      primaryMuted: '#F0EDFC',
    },
    
    semantic: {
      success: '#10B981',
      successMuted: '#D1FAE5',
      warning: '#F59E0B',
      warningMuted: '#FEF3C7',
      error: '#EF4444',
      errorMuted: '#FEE2E2',
      info: '#3B82F6',
      infoMuted: '#DBEAFE',
    },
    
    echo: {
      like: '#FF6B9D',
      insightful: '#6B5CE7',
      lol: '#F59E0B',
      wow: '#3B82F6',
    },
  },
  
  // Dark mode
  dark: {
    background: '#000000',
    surface: '#1A1A1A',
    surfaceElevated: '#262626',
    border: '#333333',
    borderSubtle: '#262626',
    
    text: {
      primary: '#FFFFFF',
      secondary: '#A3A3A3',
      tertiary: '#666666',
      disabled: '#404040',
    },
    
    accent: {
      primary: '#8B7EF7',
      primaryHover: '#9C90F8',
      primaryMuted: '#2D2850',
    },
    
    semantic: {
      success: '#34D399',
      successMuted: '#1A3A2E',
      warning: '#FBBF24',
      warningMuted: '#3A2E1A',
      error: '#F87171',
      errorMuted: '#3A1A1A',
      info: '#60A5FA',
      infoMuted: '#1A2A3A',
    },
    
    echo: {
      like: '#FF6B9D',
      insightful: '#8B7EF7',
      lol: '#FBBF24',
      wow: '#60A5FA',
    },
  },
};

// 8pt grid spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
};

// Border radius
export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Typography scale
export const typography = {
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
    letterSpacing: 0.37,
  },
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.36,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.35,
  },
  title3: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600' as const,
    letterSpacing: 0.38,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.41,
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: -0.41,
  },
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400' as const,
    letterSpacing: -0.32,
  },
  subheadline: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.08,
  },
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400' as const,
    letterSpacing: 0.06,
  },
};

// Shadows (subtle, minimal)
export const shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Animation durations (in ms)
export const animation = {
  fast: 150,
  base: 200,
  slow: 300,
  slower: 400,
};

export type ColorScheme = 'light' | 'dark';
