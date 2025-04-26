import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import CalculatorTab from './components/CalculatorTab';
import HistoryTab from './components/HistoryTab';
import SettingsTab from './components/SettingTab';
import { evaluate } from 'mathjs';
import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [activeTab, setActiveTab] = useState<'calculator' | 'history' | 'settings'>('calculator');
  const [isDark, setIsDark] = useState(false);

  const del = () => {
    if (cursorPosition > 0) {
      const newText =
        expression.slice(0, cursorPosition - 1) + expression.slice(cursorPosition);
      setExpression(newText);
      setCursorPosition(cursorPosition - 1);
    }
  }

  const handlePress = (value: string) => {
    switch (value) {
      case 'C':
        setExpression('');
        setResult('');
        setCursorPosition(0);
        break;
      case '=':
        try {
          const processedExpr = preprocessExpression(expression);
          const evalResult = evaluate(processedExpr).toString();
          setResult(evalResult);
          setHistory([`${expression} = ${evalResult}`, ...history]);
        } catch (e) {
          setResult('Lỗi');
        }
        break;
      case '()':
        const openParens = (expression.slice(0, cursorPosition).match(/\(/g) || []).length;
        const closeParens = (expression.slice(0, cursorPosition).match(/\)/g) || []).length;
        const parenToAdd = openParens > closeParens ? ')' : '(';
        const newExpr = expression.slice(0, cursorPosition) + parenToAdd + expression.slice(cursorPosition);
        setExpression(newExpr);
        setCursorPosition(cursorPosition + 1);
        break;
      case 'x²':
        insertAtCursor('^2');
        break;
      case '^':
        insertAtCursor('^');
        break;
      case '√':
        insertAtCursor('√(');
        break;
      default:
        const updatedExpr = expression.slice(0, cursorPosition) + value + expression.slice(cursorPosition);
        setExpression(updatedExpr);
        setCursorPosition(cursorPosition + value.length);
        break;
    }
  };

  function preprocessExpression(expr: string): string {
    expr = expr.replace(/√(\d+(\.\d+)?)/g, 'sqrt($1)');
    expr = expr.replace(/(sin|cos|tan)\(([^)]+)\)/g, (_, fn, val) => `${fn}(${val} deg)`);
    return expr;
  }

  const insertAtCursor = (text: string) => {
    const updatedExpr = expression.slice(0, cursorPosition) + text + expression.slice(cursorPosition);
    setExpression(updatedExpr);
    setCursorPosition(cursorPosition + text.length);
  }

  return (
    <SafeAreaView style={[styles.container,  isDark && styles.darkContainer]}>
      <View style={styles.expressionContainer}>
        <TextInput
          style={[styles.expressionInput,  isDark && styles.darkText]}
          value={expression}
          onChangeText={setExpression}
          showSoftInputOnFocus={false}
          placeholderTextColor={isDark ? '#aaa' : '#888'}
        />
        <Text style={[styles.resultText,  isDark && styles.darkText]}>= {result}</Text>
      </View>

      {/* Tabs với icon */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('calculator')}
          style={[styles.tab, activeTab === 'calculator' && styles.activeTab]}>
          <Entypo name="calculator" size={24} color={activeTab === 'calculator' ? '#2196F3' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('history')}
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}>
          <MaterialIcons name="history" size={24} color={activeTab === 'history' ? '#2196F3' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('settings')}
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}>
          <Feather name="settings" size={24} color={activeTab === 'settings' ? '#2196F3' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => del()}>
          <MaterialIcons name="backspace" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'calculator' && (
          <CalculatorTab
            isDark={isDark}
            onPress={handlePress}
          />
        )}
        {activeTab === 'history' && <HistoryTab history={history} isDark={isDark} />}
        {activeTab === 'settings' && <SettingsTab isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 23,
    padding: 20,
    justifyContent: 'flex-end',
  },
  expressionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  expressionInput: {
    fontSize: 24,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: 'blue',
  },
  contentContainer: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#fff'
  }
});
