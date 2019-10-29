import React, { FC } from 'react';
import Authentication from './screens/authentication/AuthenticationContainer';
import { ApolloProvider } from 'react-apollo';
import client from './client'

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <Authentication />
    </ApolloProvider>
  );
}

export default App;


