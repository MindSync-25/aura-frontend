import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title2, Body, Caption1, Spacer } from '@/components';
import { PulseCard } from '@/components/cards/PulseCard';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { useLivePulses, useUserInterests } from '@/api/hooks';

export function DiscoverScreen() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: livePulses } = useLivePulses();
  const { data: userInterests } = useUserInterests();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <Title2 style={{ paddingHorizontal: spacing.lg }}>{t('discover.search').split('...')[0]}</Title2>
        <Spacer size="md" />

        {/* Search bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput
            style={[styles.searchInput, { color: colors.text.primary }]}
            placeholder={t('discover.search')}
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Spacer size="xl" />

        {/* Interests Section */}
        <View style={{ paddingHorizontal: spacing.lg }}>
          <View style={styles.sectionHeader}>
            <Body style={{ fontWeight: '600' }}>{t('discover.interestsTitle')}</Body>
            <TouchableOpacity>
              <Caption1 style={{ color: colors.accent.primary }}>{t('discover.editInterests')}</Caption1>
            </TouchableOpacity>
          </View>
          <Spacer size="md" />
          <View style={styles.interestsGrid}>
            {userInterests?.slice(0, 6).map((interest: any) => (
              <View
                key={interest.id}
                style={[styles.interestChip, { backgroundColor: colors.accent.primaryMuted }]}
              >
                <Caption1 style={{ color: colors.accent.primary }}>{interest.name}</Caption1>
              </View>
            ))}
          </View>
        </View>

        <Spacer size="xl" />

        {/* Live Pulses */}
        <View style={{ paddingHorizontal: spacing.lg }}>
          <Body style={{ fontWeight: '600' }}>{t('discover.liveNow')} 🔴</Body>
          <Spacer size="md" />
          {livePulses?.map((pulse: any) => (
            <PulseCard key={pulse.id} pulse={pulse} />
          ))}
        </View>

        <Spacer size="xl" />

        {/* Trending */}
        <View style={{ paddingHorizontal: spacing.lg }}>
          <Body style={{ fontWeight: '600' }}>{t('discover.trending')}</Body>
          <Spacer size="md" />
          <Body color="tertiary">Coming soon...</Body>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: spacing.lg,
  },
  searchBar: {
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  searchInput: {
    fontSize: 16,
    padding: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  interestChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
});
