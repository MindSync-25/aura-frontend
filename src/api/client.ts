import axios from 'axios';
import {
  mockCurrentUser,
  mockMoments,
  mockLivePulses,
  mockConversations,
  mockMessages,
  mockInterests,
  mockUserInterests,
  generateMockFeedPage,
  generateMockMessagesPage,
} from './mockData';

// Set to true to use mock data instead of real API
const USE_MOCK_DATA = true;

// TODO: Replace with your actual backend URL
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'
  : 'https://api.aura.app/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Add auth token from storage
    // const token = storage.getString('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock API interceptor
if (USE_MOCK_DATA) {
  apiClient.interceptors.request.use(
    async (config) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 400));

      const url = config.url || '';
      const method = config.method?.toLowerCase();

      // Mock feed endpoint
      if (url === '/moments/feed' && method === 'get') {
        const cursor = config.params?.cursor;
        const type = config.params?.type || 'forYou';
        return Promise.reject({
          response: { data: generateMockFeedPage(cursor, type), status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // Mock live pulses
      if (url === '/pulses/live' && method === 'get') {
        return Promise.reject({
          response: { data: mockLivePulses, status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // Mock specific pulse
      if (url.startsWith('/pulses/') && !url.includes('/join') && !url.includes('/leave') && method === 'get') {
        const pulseId = url.split('/')[2];
        const pulse = mockLivePulses.find((p) => p.id === pulseId);
        return Promise.reject({
          response: { data: pulse, status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // Mock conversations
      if (url === '/chats' && method === 'get') {
        return Promise.reject({
          response: { data: mockConversations, status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // Mock messages
      if (url.includes('/chats/') && url.includes('/messages') && method === 'get') {
        const chatId = url.split('/')[2];
        const cursor = config.params?.cursor;
        return Promise.reject({
          response: { data: generateMockMessagesPage(chatId, cursor), status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // Mock send message
      if (url.includes('/chats/') && url.includes('/messages') && method === 'post') {
        const chatId = url.split('/')[2];
        const newMessage = {
          id: `msg-${Date.now()}`,
          chatId,
          content: config.data?.content || '',
          senderId: 'current-user',
          createdAt: new Date().toISOString(),
        };
        return Promise.reject({
          response: { data: newMessage, status: 201 },
          config,
          isAxiosError: true,
        });
      }

      // Mock interests
      if (url === '/interests' && method === 'get') {
        return Promise.reject({
          response: { data: mockInterests, status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // Mock user interests
      if (url === '/user/interests' && method === 'get') {
        return Promise.reject({
          response: { data: mockUserInterests, status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // Mock profile
      if (url === '/user/profile' && method === 'get') {
        return Promise.reject({
          response: { data: mockCurrentUser, status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // Mock create moment
      if (url === '/moments' && method === 'post') {
        const newMoment = {
          id: `moment-${Date.now()}`,
          content: config.data?.content || '',
          author: mockCurrentUser,
          createdAt: new Date().toISOString(),
          privacy: config.data?.privacy || 'public',
          echoCount: 0,
          commentCount: 0,
          images: config.data?.images,
          location: config.data?.location,
          interest: config.data?.interest,
        };
        return Promise.reject({
          response: { data: newMoment, status: 201 },
          config,
          isAxiosError: true,
        });
      }

      // Mock echo/reactions
      if (url.includes('/echo') && (method === 'post' || method === 'delete')) {
        return Promise.reject({
          response: { data: { success: true }, status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // Mock join/leave pulse
      if ((url.includes('/join') || url.includes('/leave')) && method === 'post') {
        return Promise.reject({
          response: { data: { success: true }, status: 200 },
          config,
          isAxiosError: true,
        });
      }

      // If no mock found, let it fail with a clear error
      return Promise.reject({
        response: { 
          data: { error: `Mock not implemented for ${method?.toUpperCase()} ${url}` }, 
          status: 501 
        },
        config,
        isAxiosError: true,
      });
    },
    (error) => Promise.reject(error)
  );
}

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle mock responses
    if (USE_MOCK_DATA && error.response && error.response.status < 400) {
      return Promise.resolve(error.response);
    }
    
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token and redirect to login
    }
    return Promise.reject(error);
  }
);
