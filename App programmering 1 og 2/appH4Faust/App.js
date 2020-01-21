import React, { Component }  from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Connect from './assets/createConnectionScreen/createConnection';
import OverView from './assets/overViewScreen/overView';
import NewContent from './assets/createNewContentScreen/createNewContent';

const StackNavigator = createStackNavigator({
  CreateConnectionScreen: {screen: Connect},
  OverViewScreen: {screen: OverView},
  CreateNewContentScreen: {screen: NewContent}
});

const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer></AppContainer>
    );
  }
}