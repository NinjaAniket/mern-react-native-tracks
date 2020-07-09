import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Signin from './screens/Signin';
import Signup from './screens/Signup';
import TrackCreate from './screens/TrackCreate';
import AccountScreen from './screens/AccountScreen';
import TrackList from './screens/TrackList';
import TrackDetail from './screens/TrackDetail';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigatorRef';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup,
    Signin,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackList,
      TrackDetail: TrackDetail,
    }),
    TrackCreate,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={navigator => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
