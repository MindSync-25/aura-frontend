import { useColorScheme as useRNColorScheme } from 'react-native';
import { colors, ColorScheme } from './tokens';

export function useColorScheme(): ColorScheme {
  const scheme = useRNColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

export function useThemeColors() {
  const scheme = useColorScheme();
  return colors[scheme];
}
