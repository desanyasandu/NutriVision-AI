import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { COLORS } from './src/theme/colors';

import { PaywallModal } from './src/components/PaywallModal';
import { useApp } from './src/context/AppContext';

function MainContent() {
  const { showPaywall, closePaywall, paywallFeature } = useApp();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <AppNavigator />
        <PaywallModal
          visible={showPaywall}
          onClose={closePaywall}
          featureName={paywallFeature}
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    height: '100vh' as any,
    minHeight: '100vh' as any,
    width: '100%',
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    minHeight: '100vh' as any,
    width: '100%',
    maxWidth: 480,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
});

