import React, { Component }  from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Connect from './assets/createConnectionScreen/createConnection';
import OverView from './assets/overViewScreen/overView';
import NewContent from './assets/createNewContentScreen/createNewContent';
import Users from './assets/usersScreen/users';

const StackNavigator = createStackNavigator({
  CreateConnectionScreen: {screen: Connect},
  OverViewScreen: {screen: OverView},
  CreateNewContentScreen: {screen: NewContent},
  UsersScreen: {screen: Users}
});

const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer></AppContainer>
    );
  }
}