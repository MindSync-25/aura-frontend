import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body, Caption1, Spacer } from '@/components';
import { spacing } from '@/theme';
import { useLivePulses } from '@/api/hooks';
import { PulseCard } from '@/components/cards/PulseCard';
import { AndroidGlassCard } from '../../components/surfaces/AndroidGlassCard';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

const H_PADDING = 20;
const GAP_AFTER_HEADER = 6;
const GAP_BELOW_SECTION_TITLE = 8;
const GAP_MAJOR_SECTION = 16;
const PULSE_TILE_GAP = 14;
const TOP_BG_HEIGHT = 520;
const TRENDING_THUMB_SIZE = 44;
const TRENDING_THUMB_GAP = 12;

export function HomeScreen() {
  const { t } = useTranslation();
  const { data: pulses } = useLivePulses();
  const { width: screenWidth } = useWindowDimensions();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const trendingItems = useMemo(
    () => [
      {
        id: 'art',
        emoji: '🎨',
        label: 'Art',
        title: 'New digital art techniques discussion',
        meta: '234 people engaged',
      },
      {
        id: 'fitness',
        emoji: '💪',
        label: 'Fitness',
        title: 'Morning routine habits that stick',
        meta: '189 people engaged',
      },
    ],
    []
  );

  const getTrendingThumbUri = (label: string) => {
    const key = label.toLowerCase();
    if (key.includes('art')) return 'https://picsum.photos/seed/aura-art/120/120';
    if (key.includes('fitness')) return 'https://picsum.photos/seed/aura-fitness/120/120';
    if (key.includes('tech')) return 'https://picsum.photos/seed/aura-tech/120/120';
    if (key.includes('movie')) return 'https://picsum.photos/seed/aura-movies/120/120';
    return 'https://picsum.photos/seed/aura-calm/120/120';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('home.goodMorning');
    if (hour < 17) return t('home.goodAfternoon');
    return t('home.goodEvening');
  };

  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDayLabel = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };


  // Mock data for Today's Focus - rotate between types
  const todaysFocus = {
    type: 'poll', // 'poll' | 'discussion' | 'question'
    title: 'Do you prefer working late or early?',
    options: ['Late night', 'Early morning'],
  };

  const pulseTileWidth = useMemo(() => Math.round(screenWidth * 0.8), [screenWidth]);
  const pulseTileHeight = 140;
  const pulseSnapInterval = pulseTileWidth + PULSE_TILE_GAP;

  return (
    <View style={styles.container}>
      {/* Cloudy sky backdrop (reference-style) */}
      <Image
        pointerEvents="none"
        source={{ uri: 'https://picsum.photos/seed/aura-sky/1200/900' }}
        style={styles.topSky}
        contentFit="cover"
        transition={120}
      />

      {/* Android-first premium atmosphere */}
      <LinearGradient
        pointerEvents="none"
        colors={['#E9ECFF', '#F6F7FF', '#FFFFFF']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.2, y: 1 }}
        style={styles.topAtmosphere}
      />
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(79,93,255,0.14)', 'rgba(79,93,255,0.00)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.2, y: 1 }}
        style={styles.topGlow}
      />
      <View pointerEvents="none" style={styles.mist} />

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton} accessibilityRole="button">
              <Ionicons name="menu" size={22} color="#6B6B6B" />
            </TouchableOpacity>

            <Text style={styles.appName}>Aura</Text>

            <View style={{ flex: 1 }} />

            <TouchableOpacity style={styles.iconButton} accessibilityRole="button">
              <Ionicons name="search-outline" size={21} color="#6B6B6B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} accessibilityRole="button">
              <View style={styles.notificationWrap}>
                <Ionicons name="notifications-outline" size={21} color="#6B6B6B" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>2</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarButton} accessibilityRole="button">
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
                style={styles.avatarImage}
                contentFit="cover"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerMetaRow}>
            <Text style={styles.headerMetaText}>{getDayLabel()} • </Text>
            <Text style={styles.headerMetaText}>{t('home.locationPlaceholder')} • </Text>
            <Ionicons name="rainy-outline" size={14} color="#8A8FA3" />
            <Text style={styles.headerMetaText}> {t('home.weatherPlaceholder')}</Text>
          </View>

          <View style={{ height: GAP_AFTER_HEADER }} />

          {/* Explore Today's Pulses - ONLY ONCE */}
          {pulses && pulses.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('home.explorePulses')}</Text>
                <TouchableOpacity accessibilityRole="button">
                  <Text style={styles.sectionAction}>{t('home.seeAll')} ›</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: GAP_BELOW_SECTION_TITLE }} />
              <FlashList
                horizontal
                data={pulses.slice(0, 3) as any[]}
                keyExtractor={(item: any) => String(item.id)}
                renderItem={({ item }: { item: any }) => (
                  <View style={{ width: pulseTileWidth, height: pulseTileHeight }}>
                    <PulseCard pulse={item} compact />
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
                estimatedItemSize={pulseSnapInterval}
                contentContainerStyle={styles.pulsesCarousel}
                ItemSeparatorComponent={() => <View style={{ width: PULSE_TILE_GAP }} />}
                snapToInterval={pulseSnapInterval}
                snapToAlignment="start"
                decelerationRate="fast"
                disableIntervalMomentum
              />
              <View style={{ height: GAP_MAJOR_SECTION }} />
            </>
          )}

          {/* Today’s Poll - true glass card */}
          <AndroidGlassCard style={styles.pollOuter} contentStyle={styles.pollContent} radius={22}>
            <View style={styles.pollHeaderRow}>
              <Text style={styles.pollHeaderTitle}>{t('home.todaysPoll')}</Text>
              <TouchableOpacity accessibilityRole="button" activeOpacity={0.8}>
                <Text style={styles.pollHeaderAction}>{t('home.vote')} ›</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.pollQuestion}>{todaysFocus.title}</Text>

            <View style={styles.pollPillsRow}>
              <TouchableOpacity
                style={[styles.pollPill, selectedOptionIndex === 0 && styles.pollPillSelected]}
                activeOpacity={0.9}
                onPress={() => setSelectedOptionIndex(0)}
              >
                <View style={styles.pollPillContent}>
                  <Ionicons
                    name="moon-outline"
                    size={16}
                    color={selectedOptionIndex === 0 ? '#4F5DFF' : '#5F6B8A'}
                  />
                  <Text
                    style={[
                      styles.pollPillText,
                      selectedOptionIndex === 0 && styles.pollPillTextSelected,
                    ]}
                  >
                    {todaysFocus.options[0]}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.pollPill, selectedOptionIndex === 1 && styles.pollPillSelected]}
                activeOpacity={0.9}
                onPress={() => setSelectedOptionIndex(1)}
              >
                <View style={styles.pollPillContent}>
                  <Ionicons
                    name="sunny-outline"
                    size={16}
                    color={selectedOptionIndex === 1 ? '#4F5DFF' : '#D39B2A'}
                  />
                  <Text
                    style={[
                      styles.pollPillText,
                      selectedOptionIndex === 1 && styles.pollPillTextSelected,
                    ]}
                  >
                    {todaysFocus.options[1]}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </AndroidGlassCard>

          <View style={{ height: GAP_MAJOR_SECTION }} />

          {/* Trending in Your Interests */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.trendingInterests')}</Text>
          </View>

          <View style={{ height: GAP_BELOW_SECTION_TITLE }} />

          {trendingItems.map((item, index) => (
            <View key={item.id}>
              <View style={styles.trendingRow}>
                <View style={styles.trendingRowTop}>
                  <Image
                    source={{ uri: getTrendingThumbUri(item.label) }}
                    style={styles.trendingThumb}
                    contentFit="cover"
                    transition={120}
                  />
                  <View style={styles.trendingRowBody}>
                    <View style={styles.trendingChip}>
                      <Text style={styles.trendingChipText}>
                        {item.emoji} {item.label}
                      </Text>
                    </View>
                    <Text style={styles.trendingText} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Caption1 style={styles.meta}>{item.meta}</Caption1>
                  </View>
                </View>
              </View>

              {index < trendingItems.length - 1 && <View style={styles.trendingDivider} />}
            </View>
          ))}

          <Spacer size="4xl" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FF',
  },
  topSky: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: TOP_BG_HEIGHT,
    opacity: 0.18,
  },
  mist: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  scrollContent: {
    paddingBottom: spacing['4xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: H_PADDING,
    paddingTop: spacing.sm,
  },
  appName: {
    fontSize: 28,
    fontWeight: Platform.OS === 'android' ? '600' : '500',
    color: '#111111',
    letterSpacing: -0.4,
    fontFamily: Platform.OS === 'android' ? 'serif' : 'serif',
  },
  headerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: H_PADDING,
    marginTop: 6,
  },
  headerMetaText: {
    fontSize: 13,
    color: '#8A8FA3',
    fontWeight: '500',
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,

    backgroundColor: 'rgba(255,255,255,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.42)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 1,
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#EDEDED',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
  },
  avatarImage: {
    width: 44,
    height: 44,
  },
  notificationWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_PADDING,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    letterSpacing: -0.2,
  },
  sectionAction: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F5DFF',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F5DFF',
  },
  pulsesCarousel: {
    paddingLeft: H_PADDING,
    paddingRight: 6,
  },
  pulseHeroTile: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  pulseHeroImage: {
    borderRadius: 20,
  },
  pulseHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  pulseHeroContent: {
    flex: 1,
    padding: 14,
  },
  pulseHeroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  pulseHeroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  pulseHeroBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.92)',
  },
  pulseHeroTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    lineHeight: 21,
  },
  pulseHeroSubline: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.75)',
  },
  pollOuter: {
    marginHorizontal: H_PADDING,
    // Shadow handled by AndroidGlassCard (keep rhythm-only here)
  },
  pollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  pollHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pollHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    letterSpacing: -0.2,
  },
  pollHeaderAction: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F5DFF',
    letterSpacing: -0.1,
  },
  pollQuestion: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '600' : '700',
    color: '#111111',
    letterSpacing: -0.2,
    lineHeight: 24,
  },
  pollPillsRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 12,
  },
  pollPill: {
    flex: 1,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.64)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.32)',

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 1,
  },
  pollPillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pollPillSelected: {
    backgroundColor: 'rgba(79,93,255,0.10)',
    borderColor: 'rgba(79,93,255,0.52)',
  },
  pollPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  pollPillTextSelected: {
    color: '#2733FF',
  },
  trendingRow: {
    paddingHorizontal: H_PADDING,
    paddingVertical: 14,
  },
  trendingRowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: TRENDING_THUMB_GAP,
  },
  trendingThumb: {
    width: TRENDING_THUMB_SIZE,
    height: TRENDING_THUMB_SIZE,
    borderRadius: 12,
  },
  trendingRowBody: {
    flex: 1,
    paddingTop: 2,
  },
  trendingChip: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#F2F2F2',
  },
  trendingChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B6B6B',
  },
  trendingText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    lineHeight: 20,
    marginTop: 8,
  },
  trendingDivider: {
    height: 1,
    backgroundColor: '#EDEDED',
    marginLeft: H_PADDING + TRENDING_THUMB_SIZE + TRENDING_THUMB_GAP,
    marginRight: H_PADDING,
    marginVertical: 0,
  },
  meta: {
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: spacing.xs,
  },
  topAtmosphere: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: TOP_BG_HEIGHT,
  },
  topGlow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 260,
  },

});
