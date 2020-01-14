import React, { Component }  from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Connect from './assets/createConnectionScreen/createConnection';

const StackNavigator = createStackNavigator({
  CreateConnectionScreen: {screen: Connect},
});

const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer></AppContainer>
    );
  }
}