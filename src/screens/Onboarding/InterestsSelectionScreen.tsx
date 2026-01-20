import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Title1, Body, Spacer, Button } from '@/components';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { OnboardingStackParamList } from '@/navigation/OnboardingNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'InterestsSelection'>;

// Mock interests data
const MOCK_INTERESTS = [
  { id: '1', name: 'Technology', icon: 'laptop-outline' },
  { id: '2', name: 'Sports', icon: 'football-outline' },
  { id: '3', name: 'Music', icon: 'musical-notes-outline' },
  { id: '4', name: 'Art', icon: 'color-palette-outline' },
  { id: '5', name: 'Food', icon: 'pizza-outline' },
  { id: '6', name: 'Travel', icon: 'airplane-outline' },
  { id: '7', name: 'Books', icon: 'book-outline' },
  { id: '8', name: 'Movies', icon: 'film-outline' },
  { id: '9', name: 'Gaming', icon: 'game-controller-outline' },
  { id: '10', name: 'Fitness', icon: 'barbell-outline' },
  { id: '11', name: 'Photography', icon: 'camera-outline' },
  { id: '12', name: 'Fashion', icon: 'shirt-outline' },
];

export function InterestsSelectionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const colors = useThemeColors();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      } else if (prev.length < 8) {
        return [...prev, interestId];
      }
      return prev;
    });
  };

  const handleContinue = async () => {
    await AsyncStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
    navigation.navigate('LocationSelection');
  };

  const handleSkip = () => {
    navigation.navigate('LocationSelection');
  };

  const canContinue = selectedInterests.length >= 3;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        pointerEvents="none"
        colors={['#EFEFF7', '#F7F7F7']}
        locations={[0, 1]}
        style={styles.topAtmosphere}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Title1>{t('onboarding.interests.title')}</Title1>
            <View style={styles.countPill}>
              <Text style={styles.countPillText}>{selectedInterests.length}/8</Text>
            </View>
          </View>

          <Spacer size="sm" />
          <Body color="secondary" style={styles.subtitle}>
            {t('onboarding.interests.subtitle')}
          </Body>

          <Spacer size="xs" />
          <Text style={styles.countLine}>
            {t('onboarding.interests.selectionCount', {
              count: selectedInterests.length,
              max: 8,
            })}
          </Text>
        </View>

        <Spacer size="xl" />

        <FlatList
          data={MOCK_INTERESTS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isSelected = selectedInterests.includes(item.id);
            return (
              <TouchableOpacity
                style={[
                  styles.interestPill,
                  isSelected && styles.interestPillSelected,
                ]}
                onPress={() => toggleInterest(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
                  <Ionicons
                    name={item.icon as keyof typeof Ionicons.glyphMap}
                    size={18}
                    color={isSelected ? '#4F5DFF' : '#6B6B6B'}
                  />
                </View>
                <Text style={[styles.interestLabel, isSelected && styles.interestLabelSelected]} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<Spacer size="2xl" />}
        />

        <View style={styles.footer}>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onPress={handleContinue}
            disabled={!canContinue}
          >
            {t('onboarding.interests.continue')}
          </Button>
          <Spacer size="md" />
          <Button variant="text" size="medium" fullWidth onPress={handleSkip}>
            {t('onboarding.interests.skip')}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  topAtmosphere: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    alignItems: 'flex-start',
  },
  headerTopRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 14,
  },
  countPill: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(17,17,17,0.08)',
  },
  countPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111111',
  },
  countLine: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B6B6B',
  },
  row: {
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: spacing['4xl'],
  },
  interestPill: {
    flex: 1,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(17,17,17,0.08)',
  },
  interestPillSelected: {
    backgroundColor: 'rgba(79, 93, 255, 0.12)',
    borderColor: '#4F5DFF',
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(17,17,17,0.06)',
    marginRight: 10,
  },
  iconWrapSelected: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderColor: 'rgba(79, 93, 255, 0.22)',
  },
  interestLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  interestLabelSelected: {
    color: '#111111',
  },
  footer: {
    paddingBottom: spacing.lg,
  },
});
