import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CalcButtonProps {
  label: string;
  onPress: () => void;
  isDark: boolean;
  textColor?: string;
}

export default function CalcButton({ label, onPress, isDark, textColor }: CalcButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isDark && styles.darkButton]}
      onPress={onPress}
    >
      <Text style={{ color: textColor ?? (isDark ? '#fff' : '#000'), fontSize: 24 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  darkButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 24,
  },
  darkText: {
    color: '#fff',
  },
});
