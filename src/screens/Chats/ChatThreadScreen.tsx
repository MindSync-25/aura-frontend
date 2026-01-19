import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Body, Caption1, Spacer } from '@/components';
import { spacing, radius } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';
import { useMessages, useSendMessage } from '@/api/hooks';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTranslation } from 'react-i18next';

type ChatThreadRouteProp = RouteProp<RootStackParamList, 'ChatThread'>;

export function ChatThreadScreen() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<ChatThreadRouteProp>();
  const { chatId, userName } = route.params;
  const [messageText, setMessageText] = useState('');

  const { data: messagesData } = useMessages(chatId);
  const sendMutation = useSendMessage();

  const messages = messagesData?.pages.flatMap((page) => page.messages) || [];

  const handleSend = async () => {
    if (messageText.trim()) {
      await sendMutation.mutateAsync({
        chatId,
        content: messageText.trim(),
      });
      setMessageText('');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Body>←</Body>
          </TouchableOpacity>
          <Body style={{ fontWeight: '600' }}>{userName}</Body>
          <View style={{ width: 40 }} />
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => {
            const isMe = item.senderId === 'currentUserId'; // TODO: Get from auth context
            return (
              <View
                style={[
                  styles.messageBubble,
                  isMe ? styles.myMessage : styles.theirMessage,
                  {
                    backgroundColor: isMe ? colors.accent.primary : colors.surface,
                  },
                ]}
              >
                <Body style={{ color: isMe ? '#FFFFFF' : colors.text.primary }}>
                  {item.content}
                </Body>
              </View>
            );
          }}
          contentContainerStyle={styles.messagesList}
        />

        {/* Input */}
        <View style={[styles.inputContainer, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.text.primary }]}
            placeholder={t('chats.typeMessage')}
            placeholderTextColor={colors.text.tertiary}
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: messageText.trim() ? colors.accent.primary : colors.surface },
            ]}
            onPress={handleSend}
            disabled={!messageText.trim()}
          >
            <Body style={{ color: messageText.trim() ? '#FFFFFF' : colors.text.tertiary }}>
              ↑
            </Body>
          </TouchableOpacity>
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
    borderBottomWidth: 1,
  },
  messagesList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
  },
  myMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    fontSize: 16,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
});
