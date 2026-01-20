import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Caption1 } from './Text';
import { spacing } from '@/theme';
import { useThemeColors } from '@/theme/useTheme';

interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export function SegmentedControl({ segments, selectedIndex, onChange }: SegmentedControlProps) {
  const colors = useThemeColors();
  const animatedIndex = useSharedValue(selectedIndex);
  const segmentWidths = useSharedValue<number[]>([]);
  const segmentPositions = useSharedValue<number[]>([]);

  useEffect(() => {
    animatedIndex.value = withSpring(selectedIndex, {
      damping: 20,
      stiffness: 180,
      mass: 0.5,
    });
  }, [selectedIndex]);

  const handleLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { width, x } = event.nativeEvent.layout;
    segmentWidths.value = [...segmentWidths.value];
    segmentWidths.value[index] = width;
    segmentPositions.value = [...segmentPositions.value];
    segmentPositions.value[index] = x;
  };

  const underlineStyle = useAnimatedStyle(() => {
    if (segmentWidths.value.length === 0) {
      return { width: 0, transform: [{ translateX: 0 }] };
    }

    const currentWidth = interpolate(
      animatedIndex.value,
      segments.map((_, i) => i),
      segmentWidths.value,
      Extrapolate.CLAMP
    );

    const currentPosition = interpolate(
      animatedIndex.value,
      segments.map((_, i) => i),
      segmentPositions.value,
      Extrapolate.CLAMP
    );

    return {
      width: currentWidth,
      transform: [{ translateX: currentPosition }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.segmentsRow}>
        {segments.map((segment, index) => {
          const isSelected = selectedIndex === index;
          return (
            <Pressable
              key={segment}
              onPress={() => onChange(index)}
              onLayout={handleLayout(index)}
              style={styles.segment}
              hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
            >
              <Caption1
                style={{
                  fontSize: 15,
                  fontWeight: isSelected ? '600' : '400',
                  color: isSelected ? colors.text.primary : colors.text.secondary,
                }}
              >
                {segment}
              </Caption1>
            </Pressable>
          );
        })}
      </View>
      <View style={[styles.underlineContainer, { backgroundColor: colors.border }]}>
        <Animated.View
          style={[
            styles.underline,
            { backgroundColor: colors.text.primary },
            underlineStyle,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  segmentsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    paddingVertical: spacing.sm,
  },
  segment: {
    paddingVertical: spacing.xs,
  },
  underlineContainer: {
    height: 1,
    position: 'relative',
  },
  underline: {
    position: 'absolute',
    height: 3,
    bottom: 0,
    borderRadius: 1.5,
  },
});
