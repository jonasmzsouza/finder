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

import FindByUserScreen from '../../screens/FindByUserScreen';
import FindByJobTitleScreen from '../../screens/FindByJobTitleScreen';

const FindTab = createBottomTabNavigator()

const FindTabNavigation = (props) => {

  function renderScreen(screen, name) {
    return (
      <FindTab.Screen
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
    <FindTab.Navigator
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

      {renderScreen(FindByJobTitleScreen, "Cargo")}

      {renderScreen(FindByUserScreen, "Usuário")}

    </FindTab.Navigator >

  );
}

export default FindTabNavigation