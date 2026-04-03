// Zine App — Design System
// Aesthetic: 90s Xerox photocopied punk zine meets 2016 tumblr scrapbook

export const Colors = {
  // Paper & Ink
  paper: '#F5EFE0',        // aged paper base
  paperDark: '#E8E0CC',    // slightly darker paper for cards
  ink: '#1C1A15',          // near-black ink
  inkFaded: '#4A4438',     // faded ink for secondary text

  // Accents
  red: '#C41E1E',          // urgent red — like a rubber stamp
  redFaded: '#C41E1E22',
  yellow: '#E8C84A',       // highlighter yellow
  blue: '#1A3A6B',         // mimeograph blue

  // UI
  tabBar: '#1C1A15',
  tabBarBorder: '#3A3630',
  tabActive: '#E8C84A',
  tabInactive: '#6B6355',

  // Overlays
  grain: 'rgba(0,0,0,0.04)',
} as const;

export const Typography = {
  // Special Elite — feels like an old typewriter
  display: 'SpecialElite_400Regular',
  // IBM Plex Mono — editorial code/data feel
  body: 'IBMPlexMono_400Regular',
  bodyBold: 'IBMPlexMono_700Bold',
  bodyItalic: 'IBMPlexMono_400Regular_Italic',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
  xxl: 64,
} as const;

export const BorderRadius = {
  none: 0,
  sm: 2,
  md: 4,
} as const;
