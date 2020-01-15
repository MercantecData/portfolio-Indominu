import React, { Component }  from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Connect from './assets/createConnectionScreen/createConnection';
import OverView from './assets/overViewScreen/overView';

const StackNavigator = createStackNavigator({
  CreateConnectionScreen: {screen: Connect},
  OverViewScreen: {screen: OverView},
});

const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer></AppContainer>
    );
  }
}