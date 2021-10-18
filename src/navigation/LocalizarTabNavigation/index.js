import React from 'react'
import {
  Text,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import styles, {
  themaColors
} from '../../styles/Styles'

import LocalizarPorUsuarioScreen from '../../screens/LocalizarPorUsuarioScreen';
import LocalizarPorCargoScreen from '../../screens/LocalizarPorCargoScreen';

const LocalizarTab = createBottomTabNavigator()

const LocalizarTabNavigation = (props) => {

  function renderScreen(screen, name) {
    return (
      <LocalizarTab.Screen
        component={screen}
        name={name}
        options={{
          title: name,
          headerTitle: 'Localizar por ' + name,
          headerRight: () => (          
            <TouchableOpacity
              style={styles.btnHeader}
              onPress={() => { 
                props.navigation.goBack();
              }}
            >
              <Text style={[styles.btnHeaderTxt]}>Home</Text>
            </TouchableOpacity>
          ),
        }}
      />
    )
  }

  return (
    <LocalizarTab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: themaColors[0]
        },
        headerTintColor: themaColors[2],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Usuário') {
            iconName = focused ? 'ios-person' : 'ios-person';
          } else if (route.name === 'Cargo') {
            iconName = focused ? 'ios-briefcase' : 'ios-briefcase';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themaColors[0],
        tabBarInactiveTintColor: themaColors[6],
      })}
    >

      {renderScreen(LocalizarPorCargoScreen, "Cargo")}

      {renderScreen(LocalizarPorUsuarioScreen, "Usuário")}

    </LocalizarTab.Navigator >

  );
}

export default LocalizarTabNavigation