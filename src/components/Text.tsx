import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';

type TypographyVariant = keyof typeof typography;

interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
}

export function Text({ 
  variant = 'body', 
  color = 'primary', 
  style, 
  ...props 
}: TextProps) {
  const colors = useThemeColors();
  
  return (
    <RNText
      style={[
        typography[variant],
        { color: colors.text[color] },
        style,
      ]}
      {...props}
    />
  );
}

// Convenience components
export function LargeTitle(props: Omit<TextProps, 'variant'>) {
  return <Text variant="largeTitle" {...props} />;
}

export function Title1(props: Omit<TextProps, 'variant'>) {
  return <Text variant="title1" {...props} />;
}

export function Title2(props: Omit<TextProps, 'variant'>) {
  return <Text variant="title2" {...props} />;
}

export function Title3(props: Omit<TextProps, 'variant'>) {
  return <Text variant="title3" {...props} />;
}

export function Headline(props: Omit<TextProps, 'variant'>) {
  return <Text variant="headline" {...props} />;
}

export function Body(props: Omit<TextProps, 'variant'>) {
  return <Text variant="body" {...props} />;
}

export function Callout(props: Omit<TextProps, 'variant'>) {
  return <Text variant="callout" {...props} />;
}

export function Subheadline(props: Omit<TextProps, 'variant'>) {
  return <Text variant="subheadline" {...props} />;
}

export function Footnote(props: Omit<TextProps, 'variant'>) {
  return <Text variant="footnote" {...props} />;
}

export function Caption1(props: Omit<TextProps, 'variant'>) {
  return <Text variant="caption1" {...props} />;
}

export function Caption2(props: Omit<TextProps, 'variant'>) {
  return <Text variant="caption2" {...props} />;
}
