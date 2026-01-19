import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Body, Caption1, Spacer, Button } from '@/components';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { useCreateMoment } from '@/api/hooks';
import { useTranslation } from 'react-i18next';

export function CreateMomentModal() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'followers'>('public');
  
  const createMutation = useCreateMoment();

  const handlePost = async () => {
    if (content.trim()) {
      await createMutation.mutateAsync({
        content: content.trim(),
        privacy,
      });
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Body>{t('create.cancel')}</Body>
          </TouchableOpacity>
          <Body style={{ fontWeight: '600' }}>{t('create.title')}</Body>
          <Button
            variant="primary"
            size="small"
            onPress={handlePost}
            disabled={!content.trim()}
            loading={createMutation.isPending}
          >
            {t('create.post')}
          </Button>
        </View>

        {/* Content input */}
        <View style={styles.content}>
          <TextInput
            style={[styles.input, { color: colors.text.primary }]}
            placeholder={t('create.placeholder')}
            placeholderTextColor={colors.text.tertiary}
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={500}
            autoFocus
          />
          
          <Caption1 color="tertiary" style={{ alignSelf: 'flex-end' }}>
            {content.length}/500
          </Caption1>
        </View>

        {/* Actions */}
        <View style={[styles.actions, { borderTopColor: colors.border }]}>
          <TouchableOpacity style={styles.actionButton}>
            <Body>📷 {t('create.addImage')}</Body>
          </TouchableOpacity>
          
          <View style={styles.privacySelector}>
            <TouchableOpacity
              style={[
                styles.privacyButton,
                privacy === 'public' && { backgroundColor: colors.accent.primaryMuted },
              ]}
              onPress={() => setPrivacy('public')}
            >
              <Caption1 style={{ fontWeight: privacy === 'public' ? '600' : '400' }}>
                {t('create.public')}
              </Caption1>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.privacyButton,
                privacy === 'followers' && { backgroundColor: colors.accent.primaryMuted },
              ]}
              onPress={() => setPrivacy('followers')}
            >
              <Caption1 style={{ fontWeight: privacy === 'followers' ? '600' : '400' }}>
                {t('create.followers')}
              </Caption1>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  input: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  actions: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
  },
  actionButton: {
    paddingVertical: spacing.md,
  },
  privacySelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  privacyButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
});
