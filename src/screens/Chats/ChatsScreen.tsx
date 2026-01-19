import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Title2, Body, Caption1, Spacer } from '@/components';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { useConversations } from '@/api/hooks';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTranslation } from 'react-i18next';
import { Image as ExpoImage } from 'expo-image';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export function ChatsScreen() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { data: conversations, isLoading } = useConversations();

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Body style={{ fontSize: 48 }}>💬</Body>
      <Spacer size="md" />
      <Body color="secondary" style={{ textAlign: 'center' }}>
        {t('chats.empty')}
      </Body>
      <Spacer size="xs" />
      <Caption1 color="tertiary" style={{ textAlign: 'center' }}>
        {t('chats.emptySubtitle')}
      </Caption1>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Title2>{t('chats.title')}</Title2>
      </View>

      <FlatList
        data={conversations || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.conversationItem, { borderBottomColor: colors.border }]}
            onPress={() =>
              navigation.navigate('ChatThread', {
                chatId: item.id,
                userName: item.otherUser.name,
              })
            }
          >
            <View style={[styles.avatar, { backgroundColor: colors.accent.primaryMuted }]}>
              {item.otherUser.avatar ? (
                <ExpoImage source={{ uri: item.otherUser.avatar }} style={styles.avatarImage} />
              ) : (
                <Body>{item.otherUser.name[0].toUpperCase()}</Body>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Body style={{ fontWeight: '600' }}>{item.otherUser.name}</Body>
              {item.lastMessage && (
                <>
                  <Spacer size="xs" />
                  <Caption1 color="secondary" numberOfLines={1}>
                    {item.lastMessage.content}
                  </Caption1>
                </>
              )}
            </View>
            {item.unreadCount > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.accent.primary }]}>
                <Caption1 style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '600' }}>
                  {item.unreadCount}
                </Caption1>
              </View>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  emptyContainer: {
    paddingTop: spacing['4xl'],
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
});
