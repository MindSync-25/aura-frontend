import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Body, Callout, Caption1, Spacer, Card } from '@/components';
import { spacing, radius, shadows } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { Moment, EchoType } from '@/api/schemas';
import { useEchoMoment, useRemoveEcho } from '@/api/hooks';
import { Image as ExpoImage } from 'expo-image';
import { useTranslation } from 'react-i18next';

interface MomentCardProps {
  moment: Moment;
}

export function MomentCard({ moment }: MomentCardProps) {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const echoMutation = useEchoMoment();
  const removeEchoMutation = useRemoveEcho();

  const handleEcho = (echo: EchoType) => {
    if (moment.userEcho === echo) {
      removeEchoMutation.mutate(moment.id);
    } else {
      echoMutation.mutate({ momentId: moment.id, echo });
    }
  };

  const echoButtons: { type: EchoType; label: string; color: string }[] = [
    { type: 'like', label: t('moments.like'), color: colors.echo.like },
    { type: 'insightful', label: t('moments.insightful'), color: colors.echo.insightful },
    { type: 'lol', label: t('moments.lol'), color: colors.echo.lol },
    { type: 'wow', label: t('moments.wow'), color: colors.echo.wow },
  ];

  return (
    <Card variant="default" padding="base" style={styles.card}>
      {/* User header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.accent.primaryMuted }]}>
            {moment.user.avatar ? (
              <ExpoImage source={{ uri: moment.user.avatar }} style={styles.avatarImage} />
            ) : (
              <Body>{moment.user.name[0].toUpperCase()}</Body>
            )}
          </View>
          <View>
            <Body style={{ fontWeight: '600' }}>{moment.user.name}</Body>
            <Caption1 color="tertiary">@{moment.user.username}</Caption1>
          </View>
        </View>
        {moment.interest && (
          <View style={[styles.interestChip, { backgroundColor: colors.accent.primaryMuted }]}>
            <Caption1 style={{ color: colors.accent.primary, fontWeight: '600' }}>
              {moment.interest}
            </Caption1>
          </View>
        )}
      </View>

      <Spacer size="md" />

      {/* Content */}
      <Body>{moment.content}</Body>

      {/* Images */}
      {moment.images && moment.images.length > 0 && (
        <>
          <Spacer size="md" />
          <View style={styles.imagesContainer}>
            {moment.images.slice(0, 2).map((image, index) => (
              <View
                key={image.id}
                style={[
                  styles.imageWrapper,
                  moment.images!.length === 1 ? styles.singleImage : styles.multipleImages,
                ]}
              >
                <ExpoImage
                  source={{ uri: image.url }}
                  style={[
                    styles.image,
                    { borderRadius: radius.md },
                  ]}
                  contentFit="cover"
                />
              </View>
            ))}
          </View>
        </>
      )}

      <Spacer size="md" />

      {/* Echo buttons */}
      <View style={styles.echoContainer}>
        {echoButtons.map(({ type, label, color }) => {
          const count = moment.echoCounts[type];
          const isActive = moment.userEcho === type;
          
          return (
            <TouchableOpacity
              key={type}
              style={[
                styles.echoButton,
                {
                  backgroundColor: isActive ? color + '20' : colors.surface,
                  borderColor: isActive ? color : colors.border,
                },
              ]}
              onPress={() => handleEcho(type)}
              activeOpacity={0.7}
            >
              <Caption1
                style={{
                  color: isActive ? color : colors.text.secondary,
                  fontWeight: isActive ? '600' : '400',
                }}
              >
                {label}
              </Caption1>
              {count > 0 && (
                <>
                  <Spacer size="xs" horizontal />
                  <Caption1 style={{ color: isActive ? color : colors.text.tertiary }}>
                    {count}
                  </Caption1>
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <Spacer size="sm" />

      {/* Footer actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Caption1 color="secondary">{t('moments.comment')}</Caption1>
          {moment.commentCount > 0 && (
            <>
              <Spacer size="xs" horizontal />
              <Caption1 color="tertiary">{moment.commentCount}</Caption1>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Caption1 color="secondary">
            {moment.isBookmarked ? '★' : '☆'} {t('moments.bookmark')}
          </Caption1>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  interestChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  imageWrapper: {
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  singleImage: {
    flex: 1,
    height: 300,
  },
  multipleImages: {
    flex: 1,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  echoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  echoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
});
