import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';
import { z } from 'zod';
import {
  FeedResponse,
  FeedResponseSchema,
  Moment,
  MomentSchema,
  EchoType,
  Pulse,
  PulseSchema,
  Conversation,
  ConversationSchema,
  Message,
  MessageSchema,
  Interest,
  InterestSchema,
  User,
  UserSchema,
} from './schemas';

// Feed hooks
export function useFeed() {
  return useInfiniteQuery({
    queryKey: ['feed', 'forYou'],
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get('/moments/feed', {
        params: { cursor: pageParam, type: 'forYou' },
      });
      return FeedResponseSchema.parse(response.data);
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}

export function useConnectionsFeed() {
  return useInfiniteQuery({
    queryKey: ['feed', 'connections'],
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get('/moments/feed', {
        params: { cursor: pageParam, type: 'connections' },
      });
      return FeedResponseSchema.parse(response.data);
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}

export function useMoment(momentId: string) {
  return useQuery({
    queryKey: ['moment', momentId],
    queryFn: async () => {
      const response = await apiClient.get(`/moments/${momentId}`);
      return MomentSchema.parse(response.data);
    },
  });
}

// Echo (reaction) mutations
export function useEchoMoment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ momentId, echo }: { momentId: string; echo: EchoType }) => {
      const response = await apiClient.post(`/moments/${momentId}/echo`, { echo });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

export function useRemoveEcho() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (momentId: string) => {
      const response = await apiClient.delete(`/moments/${momentId}/echo`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

// Create moment
export function useCreateMoment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      content: string;
      images?: string[];
      interest?: string;
      location?: string;
      privacy: 'public' | 'followers';
    }) => {
      const response = await apiClient.post('/moments', data);
      return MomentSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

// Pulse hooks
export function useLivePulses() {
  return useQuery({
    queryKey: ['pulses', 'live'],
    queryFn: async () => {
      const response = await apiClient.get('/pulses/live');
      return z.array(PulseSchema).parse(response.data);
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });
}

export function usePulse(pulseId: string) {
  return useQuery({
    queryKey: ['pulse', pulseId],
    queryFn: async () => {
      const response = await apiClient.get(`/pulses/${pulseId}`);
      return PulseSchema.parse(response.data);
    },
    refetchInterval: 5000, // Refresh every 5 seconds when in a pulse
  });
}

export function useJoinPulse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (pulseId: string) => {
      const response = await apiClient.post(`/pulses/${pulseId}/join`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pulses'] });
    },
  });
}

export function useLeavePulse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (pulseId: string) => {
      const response = await apiClient.post(`/pulses/${pulseId}/leave`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pulses'] });
    },
  });
}

// Chat hooks
export function useConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await apiClient.get('/chats');
      return z.array(ConversationSchema).parse(response.data);
    },
  });
}

export function useMessages(chatId: string) {
  return useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get(`/chats/${chatId}/messages`, {
        params: { cursor: pageParam },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ chatId, content }: { chatId: string; content: string }) => {
      const response = await apiClient.post(`/chats/${chatId}/messages`, { content });
      return MessageSchema.parse(response.data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.chatId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

// Interests hooks
export function useInterests() {
  return useQuery({
    queryKey: ['interests'],
    queryFn: async () => {
      const response = await apiClient.get('/interests');
      return z.array(InterestSchema).parse(response.data);
    },
  });
}

export function useUserInterests() {
  return useQuery({
    queryKey: ['user', 'interests'],
    queryFn: async () => {
      const response = await apiClient.get('/user/interests');
      return z.array(InterestSchema).parse(response.data);
    },
  });
}

export function useUpdateUserInterests() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (interestIds: string[]) => {
      const response = await apiClient.put('/user/interests', { interestIds });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'interests'] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

// Profile hooks
export function useProfile(userId?: string) {
  return useQuery({
    queryKey: ['profile', userId || 'me'],
    queryFn: async () => {
      const url = userId ? `/users/${userId}` : '/user/profile';
      const response = await apiClient.get(url);
      return UserSchema.parse(response.data);
    },
  });
}
