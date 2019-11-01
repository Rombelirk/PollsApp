import React, { FC } from 'react';
import Authentication from './screens/authentication/AuthenticationContainer';
import { ApolloProvider } from 'react-apollo';
import client from '../client';
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
import "./remoteDebugFix";


const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <Authentication />
    </ApolloProvider>
  );
}

if (__DEV__) {
  activateKeepAwake();
}

export default registerRootComponent(App);







