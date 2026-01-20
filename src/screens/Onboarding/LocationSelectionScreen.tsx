import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        pointerEvents="none"
        colors={['#EFEFF7', '#F7F7F7']}
        locations={[0, 1]}
        style={styles.topAtmosphere}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Title1>{t('onboarding.location.title')}</Title1>
          <Spacer size="sm" />
          <Body color="secondary">{t('onboarding.location.subtitle')}</Body>
        </View>

        <Spacer size="4xl" />

        <View style={styles.locationCard}>
          <BlurView
            intensity={32}
            tint="light"
            experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.locationCardContent}>
            <View style={styles.pinIconWrap}>
              <Ionicons name="location-outline" size={34} color="#4F5DFF" />
            </View>
            <Spacer size="lg" />
            <Text style={styles.locationBody}>{t('onboarding.location.description')}</Text>
          </View>
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
  locationCard: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 1 : 0,
    shadowRadius: 16,
    elevation: 2,
  },
  locationCardContent: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  pinIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(17,17,17,0.08)',
  },
  locationBody: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#6B6B6B',
    lineHeight: 20,
  },
  footer: {
    paddingBottom: spacing.lg,
  },
});
