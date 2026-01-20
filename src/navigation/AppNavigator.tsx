import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Platform, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useThemeColors } from '@/theme/useTheme';
import { spacing } from '@/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screen imports (will create these)
import { HomeScreen } from '@/screens/Home/HomeScreen';
import { DiscoverScreen } from '@/screens/Discover/DiscoverScreen';
import { MomentsScreen } from '@/screens/Moments/MomentsScreen';
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
  Moments: undefined;
  Chats: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const { t } = useTranslation();
  const colors = useThemeColors();

  const iconSize = 23;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarBackground: () => (
          <BlurView intensity={35} tint="light" style={styles.tabBarBlur} />
        ),
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderTopColor: 'rgba(255,255,255,0.5)',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? spacing.md : 10,
          height: Platform.OS === 'ios' ? 72 + spacing.md : 72,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0,
          shadowRadius: 18,
          elevation: 18,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="home" color={color} size={iconSize} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: t('tabs.discover'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="discover" color={color} size={iconSize} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Moments"
        component={MomentsScreen}
        options={{
          tabBarLabel: t('tabs.moments'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="moments" color={color} size={iconSize} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarLabel: t('tabs.chats'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="chats" color={color} size={iconSize} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('tabs.profile'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="profile" color={color} size={iconSize} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({
  name,
  color,
  size,
  focused,
}: {
  name: string;
  color: string;
  size: number;
  focused: boolean;
}) {
  const iconName: Record<string, keyof typeof Ionicons.glyphMap> = {
    home: 'home-outline',
    discover: 'compass-outline',
    moments: 'albums-outline',
    chats: 'chatbubbles-outline',
    profile: 'person-outline',
  };

  return (
    <View style={styles.tabIconWrap}>
      <Ionicons name={iconName[name] ?? 'ellipse-outline'} size={size} color={color} />
      <View
        style={[
          styles.activeDot,
          { backgroundColor: focused ? color : 'transparent' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
  tabBarBlur: {
    flex: 1,
  },
});

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
