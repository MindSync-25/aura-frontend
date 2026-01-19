import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { Text } from './Text';
import { spacing, radius, animation } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  children,
  ...props
}: ButtonProps) {
  const colors = useThemeColors();

  const getBackgroundColor = () => {
    if (disabled) return colors.text.disabled;
    
    switch (variant) {
      case 'primary':
        return colors.accent.primary;
      case 'secondary':
        return colors.surface;
      case 'ghost':
        return colors.accent.primaryMuted;
      case 'text':
        return 'transparent';
      default:
        return colors.accent.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.text.tertiary;
    
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
        return colors.text.primary;
      case 'ghost':
        return colors.accent.primary;
      case 'text':
        return colors.accent.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.base };
      case 'medium':
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.lg };
      case 'large':
        return { paddingVertical: spacing.base, paddingHorizontal: spacing.xl };
      default:
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.lg };
    }
  };

  const getTextVariant = () => {
    switch (size) {
      case 'small':
        return 'subheadline' as const;
      case 'medium':
        return 'callout' as const;
      case 'large':
        return 'headline' as const;
      default:
        return 'callout' as const;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: radius.md,
          ...getPadding(),
          ...(fullWidth && { width: '100%' }),
          ...(variant === 'secondary' && {
            borderWidth: 1,
            borderColor: colors.border,
          }),
        },
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          variant={getTextVariant()}
          style={[
            styles.text,
            { color: getTextColor(), fontWeight: '600' },
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // iOS HIG minimum touch target
  },
  text: {
    textAlign: 'center',
  },
});
