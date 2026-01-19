import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Title1, Body, Spacer, Button } from '@/components';
import { spacing } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { RootStackParamList } from '@/navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

export function LocationSelectionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const colors = useThemeColors();
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleEnableLocation = () => {
    // TODO: Request location permissions
    setLocationEnabled(true);
    completeOnboarding();
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    // Navigate to main app
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Title1>{t('onboarding.location.title')}</Title1>
          <Spacer size="sm" />
          <Body color="secondary">{t('onboarding.location.subtitle')}</Body>
        </View>

        <Spacer size="4xl" />

        <View style={[styles.locationCard, { backgroundColor: colors.surface }]}>
          <Body style={{ fontSize: 64, textAlign: 'center' }}>📍</Body>
          <Spacer size="lg" />
          <Body style={{ textAlign: 'center' }}>
            Location helps us show you relevant local Pulses and Moments from your area
          </Body>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.footer}>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onPress={handleEnableLocation}
          >
            {t('onboarding.location.enableLocation')}
          </Button>
          <Spacer size="md" />
          <Button variant="text" size="medium" fullWidth onPress={handleSkip}>
            {t('onboarding.location.skip')}
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
  locationCard: {
    padding: spacing.xl,
    borderRadius: 20,
    alignItems: 'center',
  },
  footer: {
    paddingBottom: spacing.lg,
  },
});
