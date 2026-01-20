import { Moment, Pulse, Conversation, Interest, User, Message } from './schemas';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'priya_bangalore',
    name: 'Priya Sharma',
    bio: 'Coffee enthusiast ☕ | Tech explorer | Weekend trekker',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2025-01-01').toISOString(),
  },
  {
    id: 'user-2',
    username: 'arjun_mumbai',
    name: 'Arjun Patel',
    bio: 'Cricket fanatic 🏏 | Food blogger | Bollywood buff',
    avatar: 'https://i.pravatar.cc/150?img=12',
    createdAt: new Date('2025-01-05').toISOString(),
  },
  {
    id: 'user-3',
    username: 'sneha_delhi',
    name: 'Sneha Reddy',
    bio: 'Artist 🎨 | Plant parent 🌱 | Chai lover',
    avatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: new Date('2025-01-10').toISOString(),
  },
  {
    id: 'user-4',
    username: 'vikram_chennai',
    name: 'Vikram Kumar',
    bio: 'Fitness enthusiast 💪 | Early riser | Tech geek',
    avatar: 'https://i.pravatar.cc/150?img=13',
    createdAt: new Date('2025-01-12').toISOString(),
  },
  {
    id: 'user-5',
    username: 'maya_kolkata',
    name: 'Maya Sen',
    bio: 'Book lover 📚 | Travel addict ✈️ | Sunset chaser',
    avatar: 'https://i.pravatar.cc/150?img=9',
    createdAt: new Date('2025-01-15').toISOString(),
  },
];

// Current user
export const mockCurrentUser: User = {
  id: 'current-user',
  username: 'rajan_aura',
  name: 'Rajan',
  bio: 'Building amazing experiences ✨',
  avatar: 'https://i.pravatar.cc/150?img=33',
  createdAt: new Date('2024-12-01').toISOString(),
};

// Mock Interests
export const mockInterests: Interest[] = [
  { id: 'int-1', name: 'Technology', icon: '💻' },
  { id: 'int-2', name: 'Cricket', icon: '🏏' },
  { id: 'int-3', name: 'Movies', icon: '🎬' },
  { id: 'int-4', name: 'Music', icon: '🎵' },
  { id: 'int-5', name: 'Food', icon: '🍜' },
  { id: 'int-6', name: 'Travel', icon: '✈️' },
  { id: 'int-7', name: 'Fitness', icon: '💪' },
  { id: 'int-8', name: 'Art', icon: '🎨' },
  { id: 'int-9', name: 'Books', icon: '📚' },
  { id: 'int-10', name: 'Photography', icon: '📸' },
  { id: 'int-11', name: 'Gaming', icon: '🎮' },
  { id: 'int-12', name: 'Fashion', icon: '👗' },
];

export const mockUserInterests = mockInterests.slice(0, 5);

// Mock following users (for connections feed)
export const mockFollowingUsers = [mockUsers[0], mockUsers[1], mockUsers[3]];

// Mock Moments
export const mockMoments: Moment[] = [
  {
    id: 'moment-1',
    content: 'Just discovered this amazing chai stall near MG Road! The perfect blend of spices and sweetness ☕✨',
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    privacy: 'public',
    echoCount: 24,
    commentCount: 5,
    userEcho: 'love',
    location: 'MG Road, Bangalore',
    interest: mockInterests[4], // Food
  },
  {
    id: 'moment-2',
    content: 'That last over! What a match! Absolutely thrilling finish. Cricket at its finest 🏏🔥',
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    privacy: 'public',
    echoCount: 156,
    commentCount: 43,
    userEcho: 'fire',
    interest: mockInterests[1], // Cricket
  },
  {
    id: 'moment-3',
    content: 'Finished this beautiful mandala today. Art therapy is real 🎨💫',
    author: mockUsers[2],
    images: ['https://picsum.photos/600/400?random=1'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    privacy: 'public',
    echoCount: 89,
    commentCount: 12,
    interest: mockInterests[7], // Art
  },
  {
    id: 'moment-4',
    content: 'Early morning run completed! 10K in 52 minutes. New personal best 💪⚡',
    author: mockUsers[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    privacy: 'public',
    echoCount: 45,
    commentCount: 8,
    userEcho: 'fire',
    interest: mockInterests[6], // Fitness
  },
  {
    id: 'moment-5',
    content: 'Currently reading "The God of Small Things" for the third time. Some books just hit different 📚❤️',
    author: mockUsers[4],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    privacy: 'public',
    echoCount: 67,
    commentCount: 15,
    userEcho: 'love',
    interest: mockInterests[8], // Books
  },
  {
    id: 'moment-6',
    content: 'The new iPhone camera is insane! These low-light shots are incredible 📸',
    author: mockUsers[0],
    images: ['https://picsum.photos/600/800?random=2'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    privacy: 'public',
    echoCount: 112,
    commentCount: 28,
    interest: mockInterests[9], // Photography
  },
  {
    id: 'moment-7',
    content: 'Street food adventures in Old Delhi. Every bite tells a story 🍛✨',
    author: mockUsers[1],
    images: ['https://picsum.photos/600/400?random=3'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 26 hours ago
    privacy: 'public',
    echoCount: 203,
    commentCount: 52,
    interest: mockInterests[4], // Food
  },
  {
    id: 'moment-8',
    content: 'Watching "12th Fail" again. What a masterpiece of cinema! 🎬',
    author: mockUsers[2],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), // 30 hours ago
    privacy: 'public',
    echoCount: 178,
    commentCount: 34,
    interest: mockInterests[2], // Movies
  },
  {
    id: 'moment-9',
    content: 'Finally hit that coding milestone! Built my first full-stack app from scratch. The debugging journey was wild but so worth it 💻🚀',
    author: mockUsers[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    privacy: 'public',
    echoCount: 234,
    commentCount: 67,
    userEcho: 'like',
    interest: mockInterests[0], // Technology
  },
  {
    id: 'moment-10',
    content: 'Morning yoga by the beach 🧘‍♀️ There\'s something magical about sunrise sessions. Started the day with peace and gratitude ✨',
    author: mockUsers[4],
    images: ['https://picsum.photos/600/400?random=4'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    privacy: 'public',
    echoCount: 189,
    commentCount: 41,
    location: 'Marina Beach, Chennai',
    interest: mockInterests[6], // Fitness
  },
  {
    id: 'moment-11',
    content: 'This monsoon weather + hot pakoras + masala chai = Perfect evening! Sometimes simple pleasures are the best ☔🫖',
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    privacy: 'public',
    echoCount: 312,
    commentCount: 89,
    location: 'Pune',
    interest: mockInterests[4], // Food
  },
  {
    id: 'moment-12',
    content: 'Just finished a 12-hour gaming session. Completed the entire campaign in one go! My eyes hurt but my soul is satisfied 🎮😅',
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
    privacy: 'public',
    echoCount: 156,
    commentCount: 78,
    userEcho: 'wow',
    interest: mockInterests[10], // Gaming
  },
  {
    id: 'moment-13',
    content: 'Captured this stunning sunset from my rooftop. Golden hour never disappoints! 📷🌅',
    author: mockUsers[2],
    images: ['https://picsum.photos/800/600?random=5', 'https://picsum.photos/600/800?random=6'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    privacy: 'public',
    echoCount: 445,
    commentCount: 92,
    location: 'Jaipur',
    interest: mockInterests[9], // Photography
  },
  {
    id: 'moment-14',
    content: 'Thrift shopping finds! Got this vintage denim jacket for just ₹800. Sustainable fashion FTW! 👗♻️',
    author: mockUsers[4],
    images: ['https://picsum.photos/600/600?random=7'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
    privacy: 'public',
    echoCount: 267,
    commentCount: 56,
    location: 'Hauz Khas, Delhi',
    interest: mockInterests[11], // Fashion
  },
  {
    id: 'moment-15',
    content: 'Breaking: New AI model just dropped and it\'s mind-blowing! The future is here folks. Time to update all my side projects 🤖',
    author: mockUsers[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    privacy: 'public',
    echoCount: 523,
    commentCount: 145,
    interest: mockInterests[0], // Technology
  },
  {
    id: 'moment-16',
    content: 'Tried making biryani for the first time. Mom said it\'s "almost perfect" which I\'m taking as a huge win! 🍛👨‍🍳',
    author: mockUsers[0],
    images: ['https://picsum.photos/600/400?random=8'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
    privacy: 'public',
    echoCount: 198,
    commentCount: 63,
    interest: mockInterests[4], // Food
  },
  {
    id: 'moment-17',
    content: 'Weekend trekking adventures! Made it to the summit after 6 hours. The view was absolutely worth every step 🏔️⛰️',
    author: mockUsers[1],
    images: ['https://picsum.photos/800/600?random=9'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 90).toISOString(),
    privacy: 'public',
    echoCount: 389,
    commentCount: 74,
    location: 'Western Ghats',
    interest: mockInterests[5], // Travel
  },
  {
    id: 'moment-18',
    content: 'Late night reading session with my cat. Currently on page 287 and can\'t put this book down! 📖🐱',
    author: mockUsers[4],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 95).toISOString(),
    privacy: 'public',
    echoCount: 156,
    commentCount: 34,
    interest: mockInterests[8], // Books
  },
  {
    id: 'moment-19',
    content: 'Just launched my art exhibition! So nervous but excited to share my work with the world. Come check it out if you\'re in Mumbai 🎨✨',
    author: mockUsers[2],
    images: ['https://picsum.photos/600/800?random=10'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
    privacy: 'public',
    echoCount: 567,
    commentCount: 123,
    location: 'Kala Ghoda, Mumbai',
    interest: mockInterests[7], // Art
  },
  {
    id: 'moment-20',
    content: 'That Kohli cover drive though! 😍 Pure class. This is why we love cricket! #INDvsAUS',
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 110).toISOString(),
    privacy: 'public',
    echoCount: 892,
    commentCount: 201,
    userEcho: 'fire',
    interest: mockInterests[1], // Cricket
  },
];

// Mock Live Pulses
export const mockLivePulses: Pulse[] = [
  {
    id: 'pulse-1',
    title: 'India vs Australia - Live Cricket Discussion',
    description: 'Join the live discussion for today\'s match!',
    interest: mockInterests[1], // Cricket
    hostId: mockUsers[1].id,
    status: 'live',
    participantCount: 2847,
    startTime: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // Started 45 mins ago
    currentPrompt: {
      id: 'prompt-1',
      question: 'Will India chase down the target?',
      type: 'poll',
      options: ['Yes, easily!', 'Close match', 'No chance'],
    },
  },
  {
    id: 'pulse-2',
    title: 'Latest Movie Releases - Quick Reviews',
    description: 'Rate and discuss this weekend\'s releases',
    interest: mockInterests[2], // Movies
    hostId: mockUsers[2].id,
    status: 'live',
    participantCount: 1523,
    startTime: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // Started 20 mins ago
    currentPrompt: {
      id: 'prompt-2',
      question: 'Have you watched "Fighter"?',
      type: 'swipe',
    },
  },
  {
    id: 'pulse-3',
    title: 'Tech News Rapid Fire',
    description: 'Quick takes on today\'s tech headlines',
    interest: mockInterests[0], // Technology
    hostId: mockUsers[0].id,
    status: 'live',
    participantCount: 892,
    startTime: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // Started 10 mins ago
    currentPrompt: {
      id: 'prompt-3',
      question: 'Is AI taking our jobs or creating new ones?',
      type: 'poll',
      options: ['Taking jobs', 'Creating jobs', 'Both!'],
    },
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    otherUser: mockUsers[0],
    lastMessage: {
      id: 'msg-1',
      chatId: 'conv-1',
      content: 'That place sounds amazing! We should go together sometime 😊',
      senderId: mockUsers[0].id,
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    },
    unreadCount: 2,
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'conv-2',
    otherUser: mockUsers[1],
    lastMessage: {
      id: 'msg-2',
      chatId: 'conv-2',
      content: 'Absolutely! What a finish! 🏏',
      senderId: 'current-user',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'conv-3',
    otherUser: mockUsers[3],
    lastMessage: {
      id: 'msg-3',
      chatId: 'conv-3',
      content: 'See you at 6 AM tomorrow! 💪',
      senderId: mockUsers[3].id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    },
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

// Mock Messages
export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1-5',
      chatId: 'conv-1',
      content: 'That place sounds amazing! We should go together sometime 😊',
      senderId: mockUsers[0].id,
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'msg-1-4',
      chatId: 'conv-1',
      content: 'Definitely! The vibe is perfect too',
      senderId: 'current-user',
      createdAt: new Date(Date.now() - 1000 * 60 * 16).toISOString(),
    },
    {
      id: 'msg-1-3',
      chatId: 'conv-1',
      content: 'Their filter coffee is really good?',
      senderId: mockUsers[0].id,
      createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    },
    {
      id: 'msg-1-2',
      chatId: 'conv-1',
      content: 'Just discovered this amazing chai stall! ☕',
      senderId: 'current-user',
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
    {
      id: 'msg-1-1',
      chatId: 'conv-1',
      content: 'Hey! How was your day?',
      senderId: mockUsers[0].id,
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
  ],
  'conv-2': [
    {
      id: 'msg-2-3',
      chatId: 'conv-2',
      content: 'Absolutely! What a finish! 🏏',
      senderId: 'current-user',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
      id: 'msg-2-2',
      chatId: 'conv-2',
      content: 'Are you watching the match?',
      senderId: mockUsers[1].id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3 - 1000 * 60 * 2).toISOString(),
    },
    {
      id: 'msg-2-1',
      chatId: 'conv-2',
      content: 'This is getting intense!',
      senderId: mockUsers[1].id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3 - 1000 * 60 * 5).toISOString(),
    },
  ],
  'conv-3': [
    {
      id: 'msg-3-2',
      chatId: 'conv-3',
      content: 'See you at 6 AM tomorrow! 💪',
      senderId: mockUsers[3].id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
    {
      id: 'msg-3-1',
      chatId: 'conv-3',
      content: 'Count me in! Need to get back on track',
      senderId: 'current-user',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12 - 1000 * 60 * 3).toISOString(),
    },
  ],
};

// Helper to generate mock feed response
export function generateMockFeedPage(cursor?: string, type: 'forYou' | 'connections' = 'forYou') {
  const pageSize = 5;
  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const endIndex = startIndex + pageSize;
  
  let feedMoments = mockMoments;
  
  // For connections feed, only show moments from followed users
  if (type === 'connections') {
    const followingIds = mockFollowingUsers.map(u => u.id);
    feedMoments = mockMoments.filter(m => followingIds.includes(m.author.id));
  }
  
  const moments = feedMoments.slice(startIndex, endIndex);
  const hasMore = endIndex < feedMoments.length;
  
  return {
    moments,
    nextCursor: hasMore ? endIndex.toString() : undefined,
    hasMore,
  };
}

// Helper to generate mock messages page
export function generateMockMessagesPage(chatId: string, cursor?: string) {
  const pageSize = 20;
  const messages = mockMessages[chatId] || [];
  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const endIndex = startIndex + pageSize;
  
  const pageMessages = messages.slice(startIndex, endIndex);
  const hasMore = endIndex < messages.length;
  
  return {
    messages: pageMessages,
    nextCursor: hasMore ? endIndex.toString() : undefined,
  };
}
