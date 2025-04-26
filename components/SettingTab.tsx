import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

type Props = {
  isDark: boolean;
  onToggleDark: () => void;
};

export default function SettingsTab({ isDark, onToggleDark }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Cài đặt</Text>
      <View style={styles.row}>
        <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 16 }}>Chế độ tối</Text>
        <Switch
          value={isDark}
          onValueChange={onToggleDark}
          thumbColor={isDark ? '#fff' : '#000'}
          trackColor={{ false: '#aaa', true: '#2196F3' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
