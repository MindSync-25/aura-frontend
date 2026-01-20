# Aura Frontend - Mock Data Guide

## Overview

The Aura frontend is currently configured to use **mock data** instead of connecting to a real backend. This allows you to develop and test the UI without needing a running backend server.

## How It Works

### Mock Data Configuration

The mock data system is controlled in `src/api/client.ts`:

```typescript
// Set to true to use mock data instead of real API
const USE_MOCK_DATA = true;
```

When `USE_MOCK_DATA = true`, all API calls are intercepted and return mock responses.

### Mock Data Files

- **`src/api/mockData.ts`** - Contains all mock data including:
  - Users (5 mock users + current user)
  - Moments (8 sample posts with various content types)
  - Live Pulses (3 active pulse rooms)
  - Conversations (3 chat threads)
  - Messages (chat history for each conversation)
  - Interests (12 different interest categories)

### Available Mock Data

#### Users
- Priya (Bangalore) - Coffee & tech enthusiast
- Arjun (Mumbai) - Cricket fanatic & food blogger
- Sneha (Delhi) - Artist & chai lover  
- Vikram (Chennai) - Fitness & tech geek
- Maya (Kolkata) - Book lover & traveler

#### Moments
- Various posts with images, locations, and interests
- Different echo types (like, love, fire, wow)
- Comments and engagement metrics

#### Live Pulses
- Cricket match discussion (2847 participants)
- Movie review pulse (1523 participants)
- Tech news rapid fire (892 participants)

#### Chats
- 3 active conversations with message history
- Unread message indicators
- Realistic timestamps

## Screens Implemented

### ✅ Fully Functional
- **Home Screen** - Feed with moments and live pulses
- **Discover Screen** - Search, interests, live pulses
- **Create Moment** - Post new content (mock creates)
- **Chats Screen** - Conversation list
- **Chat Thread** - Message view (mock send)
- **Profile Screen** - User profile with stats
- **Pulse Room** - Live pulse participation
- **Settings** - Language, preferences
- **Onboarding** - Language, interests, location selection

### Features Working with Mock Data

1. **Feed Scrolling** - Infinite scroll with pagination
2. **Echo Reactions** - Like, love, fire, wow (optimistic updates)
3. **Pulse Joining** - Join/leave pulse rooms
4. **Messaging** - Send messages (appears instantly)
5. **Creating Moments** - Post new content
6. **Interest Selection** - Tag moments with interests
7. **Multi-language** - EN, HI, KN, ML, TA, TE support

## Switching to Real Backend

When ready to connect to a real backend:

1. **Set `USE_MOCK_DATA = false`** in `src/api/client.ts`

2. **Update the API base URL**:
   ```typescript
   const API_BASE_URL = __DEV__ 
     ? 'http://localhost:3000/api'  // Your backend URL
     : 'https://api.aura.app/api';
   ```

3. **Implement authentication** - Uncomment and complete the auth interceptor:
   ```typescript
   // Request interceptor for adding auth token
   apiClient.interceptors.request.use(
     (config) => {
       const token = storage.getString('authToken');
       if (token) {
         config.headers.Authorization = `Bearer ${token}`;
       }
       return config;
     }
   );
   ```

## Testing Mock Data

### Run the App

```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# iOS
npm run ios

# Android
npm run android
```

### What You Can Test

✅ Navigation between all screens  
✅ Feed infinite scrolling  
✅ Reacting to moments (echoes)  
✅ Joining/leaving pulse rooms  
✅ Viewing pulse questions  
✅ Sending chat messages  
✅ Creating new moments  
✅ Changing language  
✅ Onboarding flow  
✅ Searching interests  

### Mock API Endpoints

All endpoints defined in `src/api/hooks.ts` are mocked:

- `GET /moments/feed` - Returns paginated moments
- `GET /pulses/live` - Returns active pulses
- `GET /pulses/:id` - Returns pulse details
- `POST /pulses/:id/join` - Join pulse (mock success)
- `POST /pulses/:id/leave` - Leave pulse (mock success)
- `GET /chats` - Returns conversations
- `GET /chats/:id/messages` - Returns messages
- `POST /chats/:id/messages` - Send message (mock create)
- `GET /interests` - Returns all interests
- `GET /user/interests` - Returns user's interests
- `GET /user/profile` - Returns current user profile
- `POST /moments` - Create moment (mock create)
- `POST /moments/:id/echo` - Add echo reaction
- `DELETE /moments/:id/echo` - Remove echo reaction

## Data Structure

### Moment
```typescript
{
  id: string
  author: User
  content: string
  images?: string[]
  interest?: { id, name, icon }
  location?: string
  echoCount: number
  commentCount: number
  userEcho?: 'like' | 'love' | 'fire' | 'wow'
  privacy: 'public' | 'followers'
  createdAt: string (ISO)
}
```

### Pulse
```typescript
{
  id: string
  title: string
  description?: string
  interest: { id, name, icon }
  hostId: string
  participantCount: number
  status: 'live' | 'upcoming' | 'ended'
  startTime: string (ISO)
  currentPrompt?: {
    id: string
    type: 'poll' | 'swipe' | 'question'
    question: string
    options?: string[]
  }
}
```

### User
```typescript
{
  id: string
  name: string
  username: string
  avatar?: string
  bio?: string
  createdAt: string (ISO)
}
```

## Next Steps

1. ✅ **UI Development Complete** - All screens implemented with mock data
2. ⏭️ **Backend Development** - Build API matching these schemas
3. ⏭️ **Integration** - Switch `USE_MOCK_DATA = false` and test with real API
4. ⏭️ **Authentication** - Implement login/signup flow
5. ⏭️ **Real-time Features** - WebSocket for live pulses and chat
6. ⏭️ **Push Notifications** - Message and pulse alerts
7. ⏭️ **Media Upload** - Image upload for moments

## Troubleshooting

**Issue**: App shows "Mock not implemented" error  
**Solution**: Check that the endpoint is defined in the mock interceptor in `client.ts`

**Issue**: No data showing  
**Solution**: Verify `USE_MOCK_DATA = true` in `src/api/client.ts`

**Issue**: TypeScript errors  
**Solution**: Schemas in `src/api/schemas.ts` must match mock data structure

---

## Ready for Backend?

When you're ready to build the backend, you have:
- ✅ Complete UI implementation
- ✅ Defined data schemas (TypeScript types)
- ✅ API endpoint structure (from hooks)
- ✅ Expected response formats (from mock data)

You can use the schemas in `src/api/schemas.ts` as your API contract!
