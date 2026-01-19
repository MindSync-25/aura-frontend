import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Body, Caption1, Spacer } from '@/components';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { Pulse } from '@/api/schemas';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTranslation } from 'react-i18next';

interface PulseCardProps {
  pulse: Pulse;
  compact?: boolean;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

export function PulseCard({ pulse, compact = false }: PulseCardProps) {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('PulseRoom', { pulseId: pulse.id });
  };

  const getStatusColor = () => {
    switch (pulse.status) {
      case 'live':
        return colors.semantic.error;
      case 'upcoming':
        return colors.accent.primary;
      default:
        return colors.text.tertiary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        compact ? styles.compactCard : styles.fullCard,
        {
          backgroundColor: colors.surface,
          borderColor: pulse.status === 'live' ? colors.semantic.error : colors.border,
          borderWidth: pulse.status === 'live' ? 2 : 1,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]} />
        <Caption1 style={{ color: getStatusColor(), fontWeight: '600', textTransform: 'uppercase' }}>
          {pulse.status}
        </Caption1>
      </View>

      <Spacer size="sm" />

      <Body style={{ fontWeight: '600' }} numberOfLines={compact ? 2 : undefined}>
        {pulse.title}
      </Body>

      <Spacer size="xs" />

      <Caption1 color="tertiary">
        {pulse.topic}
      </Caption1>

      {!compact && (
        <>
          <Spacer size="md" />
          <Caption1 color="secondary">
            {t('pulse.participants', { count: pulse.participantCount })}
          </Caption1>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.base,
  },
  fullCard: {
    marginBottom: spacing.md,
  },
  compactCard: {
    marginRight: spacing.md,
    width: 240,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
});
