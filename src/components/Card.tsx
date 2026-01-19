import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { spacing, radius, shadows } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof spacing;
}

export function Card({ 
  children, 
  variant = 'default', 
  padding = 'base',
  style, 
  ...props 
}: CardProps) {
  const colors = useThemeColors();

  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      padding: spacing[padding],
    };

    switch (variant) {
      case 'elevated':
        return { ...baseStyle, ...shadows.md };
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: colors.border,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <View style={[getCardStyle(), style]} {...props}>
      {children}
    </View>
  );
}
