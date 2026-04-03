import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors, Typography } from '@/constants/theme';

type Variant = 'display' | 'heading' | 'body' | 'caption' | 'label';

interface ZineTextProps {
  variant?: Variant;
  color?: string;
  style?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
}

export function ZineText({
  variant = 'body',
  color,
  style,
  children,
  numberOfLines,
}: ZineTextProps) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles[variant], color ? { color } : {}, style]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  display: {
    fontFamily: Typography.display,
    fontSize: 32,
    lineHeight: 36,
    color: Colors.ink,
    letterSpacing: 0.5,
  },
  heading: {
    fontFamily: Typography.display,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.ink,
  },
  body: {
    fontFamily: Typography.body,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.inkFaded,
  },
  caption: {
    fontFamily: Typography.body,
    fontSize: 11,
    lineHeight: 16,
    color: Colors.inkFaded,
    letterSpacing: 0.3,
  },
  label: {
    fontFamily: Typography.bodyBold,
    fontSize: 10,
    lineHeight: 14,
    color: Colors.inkFaded,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
