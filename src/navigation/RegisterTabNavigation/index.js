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

import RegisterEnvironmentScreen from '../../screens/RegisterEnvironmentScreen';
import RegisterJobTitleScreen from '../../screens/RegisterJobTitleScreen';
import RegisterDepartmentScreen from '../../screens/RegisterDepartmentScreen';
import RegisterUserScreen from '../../screens/RegisterUserScreen';

const CadastroTab = createBottomTabNavigator()

const CadastroTabNavigation = (props) => {

  function renderScreen(screen, name) {
    return (
      <CadastroTab.Screen
        component={screen}
        name={name}
        options={{
          title: name,
          headerTitle: 'Cadastro de ' + name,
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
    <CadastroTab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: themaColors[0]
        },
        headerTintColor: themaColors[2],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Usuário') {
            iconName = focused ? 'ios-person' : 'ios-person';
          } else if (route.name === 'Ambiente') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Cargo') {
            iconName = focused ? 'ios-briefcase' : 'ios-briefcase';
          } else if (route.name === 'Setor') {
            iconName = focused ? 'ios-business' : 'ios-business';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themaColors[0],
        tabBarInactiveTintColor: themaColors[6],
      })}
    >

      {renderScreen(RegisterUserScreen, "Usuário")}

      {renderScreen(RegisterEnvironmentScreen, "Ambiente")}

      {renderScreen(RegisterJobTitleScreen, "Cargo")}

      {renderScreen(RegisterDepartmentScreen, "Setor")}

    </CadastroTab.Navigator >

  );
}

export default CadastroTabNavigation