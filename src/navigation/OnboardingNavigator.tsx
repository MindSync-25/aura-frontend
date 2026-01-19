import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LanguageSelectionScreen } from '@/screens/Onboarding/LanguageSelectionScreen';
import { InterestsSelectionScreen } from '@/screens/Onboarding/InterestsSelectionScreen';
import { LocationSelectionScreen } from '@/screens/Onboarding/LocationSelectionScreen';

export type OnboardingStackParamList = {
  LanguageSelection: undefined;
  InterestsSelection: undefined;
  LocationSelection: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      <Stack.Screen name="InterestsSelection" component={InterestsSelectionScreen} />
      <Stack.Screen name="LocationSelection" component={LocationSelectionScreen} />
    </Stack.Navigator>
  );
}
