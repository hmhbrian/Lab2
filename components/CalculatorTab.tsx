import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CalcButton from './CalcButton';

type Props = {
  onPress: (value: string) => void;
  isDark: boolean;
};

const buttons = [
  ['sin(', 'cos(', 'tan(', 'log('],
  ['x²', '^', '√', '|x|'],
  ['C', '()', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=',],
];

export default function CalculatorTab({ onPress, isDark }: Props) {
  const getTextColor = (label: string) => {
    if (label === 'C') return 'red';
    if (['+', '-', '*', '/'].includes(label)) return 'orange';
    if (label === '=') return 'blue';
    return isDark ? '#fff' : '#000';
  };
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((btn, colIndex) => (
            <CalcButton
              key={`${rowIndex}-${colIndex}`}
              label={btn}
              onPress={() => onPress(btn)}
              isDark= {isDark}
              textColor={getTextColor(btn)}
            />
          ) )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 1,
  },
  button: {
    flex: 1,
    margin: 5,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
