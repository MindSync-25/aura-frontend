import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Title2, Body, Caption1, Spacer, Button } from '@/components';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { usePulse, useJoinPulse, useLeavePulse } from '@/api/hooks';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

type PulseRoomRouteProp = RouteProp<RootStackParamList, 'PulseRoom'>;

export function PulseRoomScreen() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<PulseRoomRouteProp>();
  const { pulseId } = route.params;

  const { data: pulse, isLoading } = usePulse(pulseId);
  const joinMutation = useJoinPulse();
  const leaveMutation = useLeavePulse();

  if (isLoading || !pulse) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Body color="tertiary">{t('common.loading')}</Body>
      </SafeAreaView>
    );
  }

  const isEnded = pulse.status === 'ended';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Body>←</Body>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Title2 numberOfLines={1}>{pulse.title}</Title2>
          <Caption1 color="tertiary">
            {t('pulse.participants', { count: pulse.participantCount })}
          </Caption1>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {isEnded ? (
          <View style={styles.endedContainer}>
            <Body style={{ fontSize: 48 }}>✓</Body>
            <Spacer size="md" />
            <Body style={{ fontWeight: '600' }}>{t('pulse.ended')}</Body>
            <Spacer size="lg" />
            <Button variant="primary" onPress={() => navigation.goBack()}>
              {t('pulse.seeRelated')}
            </Button>
          </View>
        ) : pulse.currentPrompt ? (
          <View style={styles.promptContainer}>
            <Body style={{ fontSize: 20, fontWeight: '600', textAlign: 'center' }}>
              {pulse.currentPrompt.question}
            </Body>
            <Spacer size="xl" />

            {pulse.currentPrompt.type === 'poll' && pulse.currentPrompt.options && (
              <View style={styles.optionsContainer}>
                {pulse.currentPrompt.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.optionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  >
                    <Body>{option}</Body>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {pulse.currentPrompt.type === 'swipe' && (
              <View style={styles.swipeContainer}>
                <Button variant="ghost" size="large" style={{ flex: 1 }}>
                  👎 No
                </Button>
                <Spacer size="md" horizontal />
                <Button variant="primary" size="large" style={{ flex: 1 }}>
                  👍 Yes
                </Button>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyPrompt}>
            <Body color="tertiary">Waiting for next prompt...</Body>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      {!isEnded && (
        <View style={styles.footer}>
          <Button
            variant="ghost"
            size="medium"
            fullWidth
            onPress={() => leaveMutation.mutate(pulseId)}
          >
            {t('pulse.leave')}
          </Button>
        </View>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  promptContainer: {
    paddingTop: spacing['2xl'],
    alignItems: 'center',
  },
  optionsContainer: {
    width: '100%',
    gap: spacing.md,
  },
  optionButton: {
    padding: spacing.base,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  swipeContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  endedContainer: {
    paddingTop: spacing['4xl'],
    alignItems: 'center',
  },
  emptyPrompt: {
    paddingTop: spacing['4xl'],
    alignItems: 'center',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
  },
});
