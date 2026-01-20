import { z } from 'zod';

// User schemas
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  createdAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// Moment schemas
export const MomentImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const EchoCountsSchema = z.object({
  like: z.number(),
  insightful: z.number(),
  lol: z.number(),
  wow: z.number(),
});

export const MomentSchema = z.object({
  id: z.string(),
  author: UserSchema,
  content: z.string(),
  images: z.array(z.string()).optional(),
  interest: z.object({ id: z.string(), name: z.string(), icon: z.string().optional() }).optional(),
  location: z.string().optional(),
  echoCount: z.number(),
  commentCount: z.number(),
  userEcho: z.enum(['like', 'love', 'fire', 'wow']).optional(),
  privacy: z.enum(['public', 'followers']),
  createdAt: z.string(),
});

export type Moment = z.infer<typeof MomentSchema>;
export type EchoType = 'like' | 'love' | 'fire' | 'wow';

// Feed schemas
export const FeedResponseSchema = z.object({
  moments: z.array(MomentSchema),
  nextCursor: z.string().optional(),
  hasMore: z.boolean(),
});

export type FeedResponse = z.infer<typeof FeedResponseSchema>;

// Pulse schemas
export const PulsePromptSchema = z.object({
  id: z.string(),
  type: z.enum(['poll', 'swipe', 'question']),
  question: z.string(),
  options: z.array(z.string()).optional(), // For polls
});

export const PulseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  interest: z.object({ id: z.string(), name: z.string(), icon: z.string().optional() }),
  hostId: z.string(),
  participantCount: z.number(),
  status: z.enum(['live', 'upcoming', 'ended']),
  startTime: z.string(),
  endTime: z.string().optional(),
  currentPrompt: PulsePromptSchema.optional(),
});

export type Pulse = z.infer<typeof PulseSchema>;
export type PulsePrompt = z.infer<typeof PulsePromptSchema>;

// Chat schemas
export const MessageSchema = z.object({
  id: z.string(),
  chatId: z.string(),
  senderId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  isRead: z.boolean().optional(),
});

export const ConversationSchema = z.object({
  id: z.string(),
  otherUser: UserSchema,
  lastMessage: MessageSchema.optional(),
  unreadCount: z.number(),
  updatedAt: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;

// Interest schema
export const InterestSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export type Interest = z.infer<typeof InterestSchema>;

// API response wrapper
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: z.string().optional(),
  });
