import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@/theme';

type SpacingKey = keyof typeof spacing;

interface SpacerProps {
  size?: SpacingKey;
  horizontal?: boolean;
}

export function Spacer({ size = 'base', horizontal = false }: SpacerProps) {
  return (
    <View
      style={
        horizontal
          ? { width: spacing[size] }
          : { height: spacing[size] }
      }
    />
  );
}
