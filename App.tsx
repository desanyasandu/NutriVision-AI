import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { COLORS } from './src/theme/colors';

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <AppNavigator />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    minHeight: '100vh' as any,
  },
});
