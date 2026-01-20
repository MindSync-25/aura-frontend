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
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';

const H_PADDING = 20;
const GAP_AFTER_HEADER = 6;
const GAP_BELOW_SECTION_TITLE = 8;
const GAP_MAJOR_SECTION = 16;
const PULSE_TILE_GAP = 14;
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
    title: "What's your preferred workout time?",
    options: ['Morning', 'Afternoon', 'Evening'],
  };

  const pulseTileWidth = useMemo(() => Math.round(screenWidth * 0.8), [screenWidth]);
  const pulseTileHeight = 140;
  const pulseSnapInterval = pulseTileWidth + PULSE_TILE_GAP;

  return (
    <View style={styles.container}>
      {/* Atmospheric background layer */}
      <LinearGradient
        colors={['#E9ECFF', '#F7F7F7']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.2, y: 1 }}
        style={styles.topAtmosphere}
      />


      {/* Optional: very subtle “mist” overlay */}
      <View pointerEvents="none" style={styles.mistOverlay} />

      {/* Top vignette for subtle depth */}
      <View pointerEvents="none" style={styles.topVignette} />

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.appName}>Aura</Text>
              <Caption1 style={styles.greeting}>
                {t('home.headerMeta', {
                  day: getDayLabel(),
                  location: t('home.locationPlaceholder'),
                  weather: t('home.weatherPlaceholder'),
                })}
              </Caption1>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton} accessibilityRole="button">
                <Ionicons name="search-outline" size={20} color="#6B6B6B" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} accessibilityRole="button">
                <View style={styles.notificationWrap}>
                  <Ionicons name="notifications-outline" size={20} color="#6B6B6B" />
                  <View style={styles.notificationDot} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.avatarButton} accessibilityRole="button">
                <Ionicons name="person-outline" size={20} color="#6B6B6B" />
              </TouchableOpacity>
            </View>
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
          <View style={styles.pollOuter}>
            <LinearGradient
              pointerEvents="none"
              colors={['rgba(79,93,255,0.16)', 'rgba(255,255,255,0.02)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.pollBackdrop}
            />

            <View
              style={styles.pollGlass}
              needsOffscreenAlphaCompositing
              renderToHardwareTextureAndroid
            >
              <BlurView
                intensity={Platform.OS === 'android' ? 65 : 28}
                tint="light"
                experimentalBlurMethod={
                  Platform.OS === 'android' ? 'dimezisBlurView' : undefined
                }
                style={StyleSheet.absoluteFillObject}
              />
              <View pointerEvents="none" style={styles.glassHighlight} />

              <View
                style={styles.pollContent}
                needsOffscreenAlphaCompositing
                renderToHardwareTextureAndroid
              >
                <View style={styles.pollHeaderRow}>
                  <Text style={styles.pollHeaderTitle}>{t('home.todaysPoll')}</Text>
                  <TouchableOpacity>
                    <Text style={styles.pollAction}>{t('home.vote')}</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.pollQuestion}>{todaysFocus.title}</Text>

                <View
                  style={styles.pollPillsRow}
                  needsOffscreenAlphaCompositing
                  renderToHardwareTextureAndroid
                >
                  <TouchableOpacity
                    style={[styles.pollPill, selectedOptionIndex === 0 && styles.pollPillSelected]}
                    activeOpacity={0.9}
                    onPress={() => setSelectedOptionIndex(0)}
                  >
                    <View
                      style={styles.pollPillInner}
                      needsOffscreenAlphaCompositing
                      renderToHardwareTextureAndroid
                    >
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
                    <View
                      style={styles.pollPillInner}
                      needsOffscreenAlphaCompositing
                      renderToHardwareTextureAndroid
                    >
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

                  <TouchableOpacity
                    style={[styles.pollPill, selectedOptionIndex === 2 && styles.pollPillSelected]}
                    activeOpacity={0.9}
                    onPress={() => setSelectedOptionIndex(2)}
                  >
                    <View
                      style={styles.pollPillInner}
                      needsOffscreenAlphaCompositing
                      renderToHardwareTextureAndroid
                    >
                      <Text
                        style={[
                          styles.pollPillText,
                          selectedOptionIndex === 2 && styles.pollPillTextSelected,
                        ]}
                      >
                        {todaysFocus.options[2] ?? `${t('home.more')}…`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

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
    backgroundColor: '#F7F7F7',
  },
  mistOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  topVignette: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 220,
    backgroundColor: 'rgba(0,0,0,0.035)',
  },
  scrollContent: {
    paddingBottom: spacing['4xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: H_PADDING,
    paddingTop: spacing.sm,
  },
  headerLeft: {
    flex: 1,
  },
  appName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111111',
    letterSpacing: -0.3,
  },
  greeting: {
    fontSize: 11,
    color: '#9A9A9A',
    marginTop: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EDEDED',
    backgroundColor: 'transparent',
  },
  notificationWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4F5DFF',
    borderWidth: 2,
    borderColor: '#F7F7F7',
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
    letterSpacing: -0.3,
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
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 3,
    position: 'relative',
    zIndex: 2,
  },
  pollBackdrop: {
    position: 'absolute',
    left: -10,
    right: -10,
    top: -10,
    bottom: -10,
    borderRadius: 24,
    zIndex: 0,
  },
  pollGlass: {
    borderRadius: 22,
    overflow: 'hidden',

    // airy frosted glass
    backgroundColor: 'rgba(255,255,255,0.38)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.30)',
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
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
  },
  pollAction: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F5DFF',
  },
  pollQuestion: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    letterSpacing: -0.2,
  },
  pollPillsRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 12,
  },
  pollPill: {
    flex: 1,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.26)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  pollPillSelected: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderColor: 'rgba(79,93,255,0.60)',
    shadowOpacity: 0.08,
    elevation: 3,
  },
  pollPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
    opacity: 0.99,
  },
  pollPillTextSelected: {
    color: '#111111',
  },
  pollPillInner: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
  height: 420, // only top area gets “mood”
},
glassHighlight: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  height: 60,
  backgroundColor: 'rgba(255,255,255,0.14)',
},

});
