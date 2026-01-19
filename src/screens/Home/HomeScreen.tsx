import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Title2, Body, Caption1, Spacer } from '@/components';
import { spacing } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { useFeed, useLivePulses } from '@/api/hooks';
import { MomentCard } from '@/components/cards/MomentCard';
import { PulseCard } from '@/components/cards/PulseCard';
import { useTranslation } from 'react-i18next';

export function HomeScreen() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  
  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useFeed();

  const { data: livePulses } = useLivePulses();

  const moments = feedData?.pages.flatMap((page) => page.moments) || [];
  const showLiveStrip = livePulses && livePulses.length > 0;

  const renderHeader = () => (
    <View>
      {/* App header */}
      <View style={styles.header}>
        <Title2>Aura</Title2>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <View style={[styles.iconPlaceholder, { backgroundColor: colors.text.tertiary + '20' }]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Live Pulses strip */}
      {showLiveStrip && (
        <View>
          <Spacer size="lg" />
          <Caption1 color="secondary" style={{ paddingHorizontal: spacing.lg, fontWeight: '600' }}>
            {t('home.liveNow')} 🔴
          </Caption1>
          <Spacer size="sm" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.livePulsesContainer}
          >
            {livePulses!.slice(0, 3).map((pulse: any) => (
              <PulseCard key={pulse.id} pulse={pulse} compact />
            ))}
          </ScrollView>
          <Spacer size="lg" />
        </View>
      )}

      <Spacer size="base" />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Body style={{ fontSize: 48 }}>✨</Body>
      <Spacer size="md" />
      <Body color="secondary" style={{ textAlign: 'center' }}>
        {t('home.feedEmpty')}
      </Body>
      <Spacer size="xs" />
      <Caption1 color="tertiary" style={{ textAlign: 'center' }}>
        {t('home.feedEmptySubtitle')}
      </Caption1>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.emptyContainer}>
      <Body color="tertiary">{t('common.loading')}</Body>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {isLoading ? (
        renderLoading()
      ) : (
        <FlashList
          data={moments}
          renderItem={({ item }) => <MomentCard moment={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={400}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.accent.primary} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: spacing.sm,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  livePulsesContainer: {
    paddingHorizontal: spacing.lg,
  },
  list: {
    paddingHorizontal: spacing.lg,
  },
  emptyContainer: {
    paddingTop: spacing['4xl'],
    alignItems: 'center',
  },
});
