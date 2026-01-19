import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Title1, Body, Spacer } from '@/components';
import { languages, saveLanguage, type Language } from '@/i18n';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { OnboardingStackParamList } from '@/navigation/OnboardingNavigator';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'LanguageSelection'>;

export function LanguageSelectionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t, i18n } = useTranslation();
  const colors = useThemeColors();
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language>(
    i18n.language as Language
  );

  const handleSelectLanguage = (languageCode: Language) => {
    setSelectedLanguage(languageCode);
    saveLanguage(languageCode);
    
    // Navigate to next step after a brief delay
    setTimeout(() => {
      navigation.navigate('InterestsSelection');
    }, 300);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Title1>{t('onboarding.languageSelection.title')}</Title1>
          <Spacer size="sm" />
          <Body color="secondary">{t('onboarding.languageSelection.subtitle')}</Body>
        </View>

        <Spacer size="xl" />

        <FlatList
          data={languages}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.languageItem,
                {
                  backgroundColor: colors.surface,
                  borderColor: selectedLanguage === item.code ? colors.accent.primary : colors.border,
                  borderWidth: selectedLanguage === item.code ? 2 : 1,
                },
              ]}
              onPress={() => handleSelectLanguage(item.code)}
              activeOpacity={0.7}
            >
              <View>
                <Body style={{ fontWeight: '600' }}>{item.nativeName}</Body>
                <Spacer size="xs" />
                <Body color="secondary" style={{ fontSize: 14 }}>
                  {item.name}
                </Body>
              </View>
              {selectedLanguage === item.code && (
                <View
                  style={[
                    styles.checkmark,
                    { backgroundColor: colors.accent.primary },
                  ]}
                />
              )}
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <Spacer size="md" />}
          showsVerticalScrollIndicator={false}
        />
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
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
    borderRadius: radius.md,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
