import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Title2, Body, Caption1, Spacer } from '@/components';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { languages, saveLanguage, getLanguage, type Language } from '@/i18n';
import { useTranslation } from 'react-i18next';

export function SettingsScreen() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const currentLanguage = getLanguage();

  const handleLanguageChange = (lang: Language) => {
    saveLanguage(lang);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Body>←</Body>
          </TouchableOpacity>
          <Title2>{t('settings.title')}</Title2>
          <View style={{ width: 40 }} />
        </View>

        <Spacer size="lg" />

        {/* Language Section */}
        <View style={styles.section}>
          <Body style={{ fontWeight: '600' }}>{t('settings.language')}</Body>
          <Spacer size="md" />
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.settingItem,
                {
                  backgroundColor: currentLanguage === lang.code ? colors.accent.primaryMuted : colors.surface,
                  borderColor: currentLanguage === lang.code ? colors.accent.primary : colors.border,
                },
              ]}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <View>
                <Body style={{ fontWeight: currentLanguage === lang.code ? '600' : '400' }}>
                  {lang.nativeName}
                </Body>
                <Caption1 color="tertiary">{lang.name}</Caption1>
              </View>
              {currentLanguage === lang.code && (
                <Body style={{ color: colors.accent.primary }}>✓</Body>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Spacer size="xl" />

        {/* Other Settings */}
        <View style={styles.section}>
          <Body style={{ fontWeight: '600' }}>{t('settings.notifications')}</Body>
          <Spacer size="md" />
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <Body>{t('settings.enableNotifications')}</Body>
          </TouchableOpacity>
        </View>

        <Spacer size="xl" />

        <View style={styles.section}>
          <Body style={{ fontWeight: '600' }}>{t('settings.location')}</Body>
          <Spacer size="md" />
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <Body>{t('settings.enableLocation')}</Body>
          </TouchableOpacity>
        </View>

        <Spacer size="xl" />

        <View style={styles.section}>
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <Body color="secondary">{t('settings.about')}</Body>
          </TouchableOpacity>
          <Spacer size="md" />
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.semantic.errorMuted }]}>
            <Body style={{ color: colors.semantic.error }}>{t('settings.logout')}</Body>
          </TouchableOpacity>
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
  section: {
    paddingHorizontal: spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
