import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

interface Props {
  history: string[];
  isDark: boolean;
}

const HistoryTab: React.FC<Props> = ({ history, isDark }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {history.map((item, index) => (
        <Text key={index} style={[styles.historyText, isDark && styles.darkText]}>
          {item}
        </Text>
      ))}
    </ScrollView>
  );
};

export default HistoryTab;

const styles = StyleSheet.create({
  historyText: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkText: {
    color: '#fff'
  }
});
