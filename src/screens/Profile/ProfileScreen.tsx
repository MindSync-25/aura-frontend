import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Title2, Body, Caption1, Spacer, Button } from '@/components';
import { spacing } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { useProfile } from '@/api/hooks';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTranslation } from 'react-i18next';
import { Image as ExpoImage } from 'expo-image';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export function ProfileScreen() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { data: profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Body color="tertiary">{t('common.loading')}</Body>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Title2>{t('tabs.profile')}</Title2>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Body>⚙️</Body>
          </TouchableOpacity>
        </View>

        <Spacer size="xl" />

        {/* Profile info */}
        <View style={styles.profileInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.accent.primaryMuted }]}>
            {profile.avatar ? (
              <ExpoImage source={{ uri: profile.avatar }} style={styles.avatarImage} />
            ) : (
              <Body style={{ fontSize: 32 }}>{profile.name[0].toUpperCase()}</Body>
            )}
          </View>
          
          <Spacer size="md" />
          
          <Title2>{profile.name}</Title2>
          <Caption1 color="tertiary">@{profile.username}</Caption1>
          
          {profile.bio && (
            <>
              <Spacer size="md" />
              <Body color="secondary" style={{ textAlign: 'center' }}>
                {profile.bio}
              </Body>
            </>
          )}
          
          <Spacer size="lg" />
          
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Body style={{ fontWeight: '600' }}>0</Body>
              <Caption1 color="tertiary">{t('profile.moments')}</Caption1>
            </View>
            <View style={styles.stat}>
              <Body style={{ fontWeight: '600' }}>0</Body>
              <Caption1 color="tertiary">{t('profile.pulses')}</Caption1>
            </View>
          </View>
          
          <Spacer size="lg" />
          
          <Button variant="secondary" size="medium">
            {t('profile.editProfile')}
          </Button>
        </View>

        <Spacer size="xl" />

        {/* Content tabs would go here */}
        <View style={{ paddingHorizontal: spacing.lg }}>
          <Body color="tertiary">Your moments will appear here</Body>
        </View>
      </ScrollView>
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
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  stats: {
    flexDirection: 'row',
    gap: spacing['2xl'],
  },
  stat: {
    alignItems: 'center',
  },
});
