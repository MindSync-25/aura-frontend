import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

import { Pulse } from '@/api/schemas';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useThemeColors } from '@/theme/useTheme';

interface PulseCardProps {
  pulse: Pulse;
  compact?: boolean; // used in Home carousel
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

function getPulseCoverByInterestName(name?: string): string {
  const key = (name || '').toLowerCase();

  if (key.includes('sport') || key.includes('cricket') || key.includes('nba')) {
    return 'https://picsum.photos/seed/aura-sports/900/600';
  }
  if (key.includes('movie') || key.includes('cinema') || key.includes('film')) {
    return 'https://picsum.photos/seed/aura-movies/900/600';
  }
  if (key.includes('fitness') || key.includes('workout') || key.includes('health')) {
    return 'https://picsum.photos/seed/aura-fitness/900/600';
  }
  if (key.includes('tech') || key.includes('ai') || key.includes('coding')) {
    return 'https://picsum.photos/seed/aura-tech/900/600';
  }
  if (key.includes('music')) {
    return 'https://picsum.photos/seed/aura-music/900/600';
  }
  return 'https://picsum.photos/seed/aura-calm/900/600';
}

export function PulseCard({ pulse, compact = false }: PulseCardProps) {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const cover = useMemo(
    () => getPulseCoverByInterestName(pulse?.interest?.name),
    [pulse?.interest?.name]
  );

  const handlePress = () => {
    navigation.navigate('PulseRoom', { pulseId: pulse.id });
  };

  const status = pulse.status; // 'live' | 'upcoming' | 'ended' (assumed)
  const isLive = status === 'live';

  const statusLabel = useMemo(() => {
    switch (status) {
      case 'live':
        return t('pulse.statusLive'); // "LIVE"
      case 'upcoming':
        return t('pulse.statusUpcoming'); // "UPCOMING"
      default:
        return t('pulse.statusEnded'); // "ENDED"
    }
  }, [status, t]);

  return (
    <TouchableOpacity
      style={[
        styles.tile,
        compact ? styles.compact : styles.full,
      ]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {/* Cover Image */}
      <Image
        source={cover}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        transition={120}
      />

      {/* Gradient overlay for readability */}
      <LinearGradient
        colors={['rgba(0,0,0,0.10)', 'rgba(0,0,0,0.70)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.2, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top row: status pill */}
      <View style={styles.topRow}>
        <View style={styles.pill}>
          <View
            style={[
              styles.pillDot,
              { backgroundColor: isLive ? '#FF3B30' : 'rgba(255,255,255,0.60)' },
            ]}
          />
          <Text style={styles.pillText}>{statusLabel}</Text>
        </View>
      </View>

      {/* Bottom content */}
      <View style={styles.bottomBlock}>
        <Text style={styles.title} numberOfLines={2}>
          {pulse.title}
        </Text>

        <View style={{ height: 8 }} />

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            {pulse.participantCount
              ? t('pulse.participants', { count: pulse.participantCount })
              : (pulse.interest?.name ?? '')}
          </Text>
        </View>

        {/* Optional: interest label */}
        {!pulse.participantCount && !!pulse.interest?.name && (
          <Text style={styles.subMeta} numberOfLines={1}>
            {pulse.interest.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  compact: {
    width: '100%',
    height: 140, // matches Home carousel height
  },
  full: {
    width: '100%',
    height: 150,
  },
  topRow: {
    paddingTop: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: 'rgba(255,255,255,0.22)',
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#FFFFFF',
  },
  bottomBlock: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    marginTop: 'auto',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    lineHeight: 22,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.78)',
  },
  subMeta: {
    marginTop: 6,
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
  },
});
