import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useThemeColors } from '@/theme/useTheme';
import { spacing } from '@/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screen imports (will create these)
import { HomeScreen } from '@/screens/Home/HomeScreen';
import { DiscoverScreen } from '@/screens/Discover/DiscoverScreen';
import { ChatsScreen } from '@/screens/Chats/ChatsScreen';
import { ProfileScreen } from '@/screens/Profile/ProfileScreen';
import { CreateMomentModal } from '@/screens/CreateMoment/CreateMomentModal';
import { OnboardingNavigator } from './OnboardingNavigator';
import { PulseRoomScreen } from '@/screens/PulseRoom/PulseRoomScreen';
import { ChatThreadScreen } from '@/screens/Chats/ChatThreadScreen';
import { SettingsScreen } from '@/screens/Settings/SettingsScreen';

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  CreateMoment: undefined;
  PulseRoom: { pulseId: string };
  ChatThread: { chatId: string; userName: string };
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  CreatePlaceholder: undefined;
  Chats: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Empty component for create tab (it opens modal)
function CreatePlaceholder() {
  return null;
}

function MainTabs() {
  const { t } = useTranslation();
  const colors = useThemeColors();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: spacing.sm,
          paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
          height: Platform.OS === 'ios' ? 88 : 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: t('tabs.discover'),
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="discover" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePlaceholder"
        component={CreatePlaceholder}
        options={{
          tabBarLabel: t('tabs.create'),
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="create" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('CreateMoment');
          },
        })}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarLabel: t('tabs.chats'),
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="chats" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="profile" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Simple icon component (in production, use react-native-vector-icons or similar)
function TabIcon({ name, color, size }: { name: string; color: string; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color + '20',
      }}
    />
  );
}

export function AppNavigator() {
  const colors = useThemeColors();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  useEffect(() => {
    // Check if onboarding is complete
    AsyncStorage.getItem('onboardingCompleted').then((value) => {
      setHasCompletedOnboarding(value === 'true');
    });
  }, []);

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: colors.accent.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text.primary,
          border: colors.border,
          notification: colors.accent.primary,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
        }}
        initialRouteName={hasCompletedOnboarding ? 'Main' : 'Onboarding'}
      >
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="CreateMoment"
          component={CreateMomentModal}
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PulseRoom"
          component={PulseRoomScreen}
          options={{
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="ChatThread"
          component={ChatThreadScreen}
          options={{
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Add View import
import { View } from 'react-native';
