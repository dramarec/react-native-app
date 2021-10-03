import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

import { client } from './Apollo';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
