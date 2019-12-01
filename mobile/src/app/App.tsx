import React, { FC } from 'react';
import Authentication from './screens/authentication/AuthenticationContainer';
import { ApolloProvider } from 'react-apollo';
import client from '../client';
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
import { NativeRouter, Route, Switch } from "react-router-native";
import PrivateRoute from './wrapers/PrivateRoute'
import "../remoteDebugFix";
import Main from './screens/main/Main'
import { retrieveData, storeData } from './helpers/asyncStorage'
import { AsyncStorage } from 'react-native';


const App: FC = () => {
  // storeData("jwtToken", null)
  // AsyncStorage.clear();
  retrieveData('jwtToken').then(res => console.log("token", res))

  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        <Switch>
          <Route path="/auth" component={Authentication} />
          <PrivateRoute path="/" component={Main} />
        </Switch>
      </NativeRouter>
    </ApolloProvider>
  );
}

if (__DEV__) {
  activateKeepAwake();
}

export default registerRootComponent(App);







