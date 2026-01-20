import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Body, Caption1, Spacer } from '@/components';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { Moment, EchoType } from '@/api/schemas';
import { useEchoMoment, useRemoveEcho } from '@/api/hooks';
import { Image as ExpoImage } from 'expo-image';
import { useTranslation } from 'react-i18next';

interface MomentCardProps {
  moment: Moment;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
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

  const echoButtons: { type: EchoType; emoji: string; label: string }[] = [
    { type: 'like', emoji: '👍', label: 'Like' },
    { type: 'love', emoji: '❤️', label: 'Love' },
    { type: 'fire', emoji: '🔥', label: 'Fire' },
    { type: 'wow', emoji: '😮', label: 'Wow' },
  ];

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      {/* User header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.accent.primaryMuted }]}>
            {moment.author.avatar ? (
              <ExpoImage source={{ uri: moment.author.avatar }} style={styles.avatarImage} />
            ) : (
              <Body>{moment.author.name[0].toUpperCase()}</Body>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <Body style={{ fontWeight: '600' }}>{moment.author.name}</Body>
              <Caption1 color="tertiary">· {formatTimeAgo(moment.createdAt)}</Caption1>
            </View>
            <Caption1 color="secondary">@{moment.author.username}</Caption1>
          </View>
        </View>
        {moment.interest && (
          <View style={[styles.interestChip, { backgroundColor: colors.accent.primaryMuted }]}>
            <Caption1 style={{ color: colors.accent.primary, fontWeight: '600' }}>
              {moment.interest.icon && `${moment.interest.icon} `}{moment.interest.name}
            </Caption1>
          </View>
        )}
      </View>

      <Spacer size="md" />

      {/* Content */}
      <Body>{moment.content}</Body>

      {/* Location */}
      {moment.location && (
        <>
          <Spacer size="sm" />
          <Caption1 color="tertiary">📍 {moment.location}</Caption1>
        </>
      )}

      {/* Images */}
      {moment.images && moment.images.length > 0 && (
        <>
          <Spacer size="md" />
          <View style={styles.imagesContainer}>
            {moment.images.slice(0, 2).map((image, index) => (
              <View
                key={index}
                style={[
                  styles.imageWrapper,
                  moment.images!.length === 1 ? styles.singleImage : styles.multipleImages,
                ]}
              >
                <ExpoImage
                  source={{ uri: image }}
                  style={[styles.image, { borderRadius: radius.md }]}
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
        {echoButtons.map(({ type, emoji, label }) => {
          const isActive = moment.userEcho === type;
          
          return (
            <TouchableOpacity
              key={type}
              style={[
                styles.echoButton,
                {
                  backgroundColor: isActive ? colors.accent.primaryMuted : 'transparent',
                },
              ]}
              onPress={() => handleEcho(type)}
              activeOpacity={0.7}
            >
              <Body style={{ fontSize: 18 }}>{emoji}</Body>
              {isActive && (
                <>
                  <Spacer size="xs" horizontal />
                  <Caption1 style={{ color: colors.accent.primary, fontWeight: '600' }}>
                    {label}
                  </Caption1>
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <Spacer size="sm" />

      {/* Footer actions */}
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.lg }}>
          <TouchableOpacity style={styles.footerButton}>
            <Caption1 color="secondary">
              {moment.echoCount > 0 && `${moment.echoCount} `}echoes
            </Caption1>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Caption1 color="secondary">
              {moment.commentCount > 0 && `${moment.commentCount} `}comments
            </Caption1>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.footerButton}>
          <Caption1 color="secondary">share</Caption1>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
    padding: spacing.base,
    borderRadius: radius.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: spacing.md,
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
    marginLeft: spacing.sm,
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
    gap: spacing.md,
  },
  echoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
});
