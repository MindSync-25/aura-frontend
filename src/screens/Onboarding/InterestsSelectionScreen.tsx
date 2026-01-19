import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Title1, Body, Spacer, Button } from '@/components';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { OnboardingStackParamList } from '@/navigation/OnboardingNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'InterestsSelection'>;

// Mock interests data
const MOCK_INTERESTS = [
  { id: '1', name: 'Technology', icon: '💻' },
  { id: '2', name: 'Sports', icon: '⚽' },
  { id: '3', name: 'Music', icon: '🎵' },
  { id: '4', name: 'Art', icon: '🎨' },
  { id: '5', name: 'Food', icon: '🍕' },
  { id: '6', name: 'Travel', icon: '✈️' },
  { id: '7', name: 'Books', icon: '📚' },
  { id: '8', name: 'Movies', icon: '🎬' },
  { id: '9', name: 'Gaming', icon: '🎮' },
  { id: '10', name: 'Fitness', icon: '💪' },
  { id: '11', name: 'Photography', icon: '📷' },
  { id: '12', name: 'Fashion', icon: '👗' },
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Title1>{t('onboarding.interests.title')}</Title1>
          <Spacer size="sm" />
          <Body color="secondary">{t('onboarding.interests.subtitle')}</Body>
          <Spacer size="sm" />
          <Body color="tertiary" style={{ fontSize: 14 }}>
            {selectedInterests.length}/8 selected
          </Body>
        </View>

        <Spacer size="xl" />

        <FlatList
          data={MOCK_INTERESTS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => {
            const isSelected = selectedInterests.includes(item.id);
            return (
              <TouchableOpacity
                style={[
                  styles.interestChip,
                  {
                    backgroundColor: isSelected ? colors.accent.primaryMuted : colors.surface,
                    borderColor: isSelected ? colors.accent.primary : colors.border,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
                onPress={() => toggleInterest(item.id)}
                activeOpacity={0.7}
              >
                <Body style={{ fontSize: 32 }}>{item.icon}</Body>
                <Spacer size="sm" />
                <Body style={{ fontWeight: isSelected ? '600' : '400' }}>
                  {item.name}
                </Body>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  interestChip: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: radius.md,
    marginHorizontal: spacing.xs,
  },
  footer: {
    paddingBottom: spacing.lg,
  },
});
