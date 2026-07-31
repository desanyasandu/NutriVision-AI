import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../theme/colors';

export interface SpinningCounterProps {
  value: number;
  duration?: number;
  stagger?: number;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  color?: string;
  prefix?: string;
  suffix?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface SingleDigitReelProps {
  targetDigit: number;
  index: number;
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  color: string;
  duration: number;
  stagger: number;
  textStyle?: TextStyle;
}

const SingleDigitReel: React.FC<SingleDigitReelProps> = ({
  targetDigit,
  index,
  fontSize,
  fontWeight,
  color,
  duration,
  stagger,
  textStyle,
}) => {
  const cellHeight = Math.round(fontSize * 1.22);
  const animValue = useRef(new Animated.Value(0)).current;

  // Additional 1 full spin (10 digits) before settling on target
  const spinRounds = 1;
  const targetIndex = spinRounds * 10 + targetDigit;

  useEffect(() => {
    animValue.setValue(0);
    const delay = index * stagger;

    Animated.timing(animValue, {
      toValue: targetIndex * cellHeight,
      duration: duration,
      delay: delay,
      easing: Easing.bezier(0.16, 1, 0.3, 1), // Transitions.dev cubic-bezier(0.16, 1, 0.3, 1)
      useNativeDriver: true,
    }).start();
  }, [targetDigit, targetIndex, cellHeight, duration, stagger, index, animValue]);

  // Strip digits array: [0..9, 0..9, 0..targetDigit]
  const stripDigits = [...DIGITS, ...DIGITS, targetDigit];

  return (
    <View style={{ height: cellHeight, overflow: 'hidden', width: fontSize * 0.62, alignItems: 'center' }}>
      <Animated.View
        style={{
          transform: [{ translateY: animValue.interpolate({ inputRange: [0, 10000], outputRange: [0, -10000] }) }],
        }}
      >
        {stripDigits.map((d, i) => (
          <View key={i} style={{ height: cellHeight, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={[
                {
                  fontSize,
                  fontWeight,
                  color,
                  lineHeight: cellHeight,
                  fontVariant: ['tabular-nums'],
                },
                textStyle,
              ]}
            >
              {d}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export const SpinningCounter: React.FC<SpinningCounterProps> = ({
  value,
  duration = 1400,
  stagger = 90,
  fontSize = 32,
  fontWeight = '900',
  color = COLORS.textPrimary,
  prefix,
  suffix,
  style,
  textStyle,
}) => {
  const digits = Math.max(0, Math.round(value)).toString().split('');
  const cellHeight = Math.round(fontSize * 1.22);

  return (
    <View style={[styles.container, { height: cellHeight }, style]}>
      {prefix && (
        <Text style={[{ fontSize, fontWeight, color, lineHeight: cellHeight }, textStyle]}>
          {prefix}
        </Text>
      )}

      <View style={styles.reelsRow}>
        {digits.map((d, idx) => {
          const num = parseInt(d, 10);
          if (isNaN(num)) {
            return (
              <Text key={idx} style={[{ fontSize, fontWeight, color, lineHeight: cellHeight }, textStyle]}>
                {d}
              </Text>
            );
          }
          return (
            <SingleDigitReel
              key={idx}
              targetDigit={num}
              index={idx}
              fontSize={fontSize}
              fontWeight={fontWeight}
              color={color}
              duration={duration}
              stagger={stagger}
              textStyle={textStyle}
            />
          );
        })}
      </View>

      {suffix && (
        <Text style={[{ fontSize: Math.round(fontSize * 0.65), fontWeight, color, lineHeight: cellHeight, marginLeft: 2 }, textStyle]}>
          {suffix}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
