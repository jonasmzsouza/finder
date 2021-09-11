import React from 'react'
import {
  Text,
  TouchableOpacity
} from 'react-native';

import { Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import styles, {
  themaColors
} from '../../assets/styles/styles'
import Dispositivo from './cadastro/Dispositivo'
import Ambiente from './cadastro/Ambiente'


const CadastroTab = createBottomTabNavigator()

const Cadastro = (props) => {

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
              style={styles.btnVoltar}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Text style={[styles.btnVoltarTxt]}>Voltar</Text>
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
          if (route.name === 'Dispositivo') {
            iconName = focused ? 'ios-watch' : 'ios-watch';
          } else if (route.name === 'Ambiente') {
            iconName = focused ? 'ios-home' : 'ios-home';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themaColors[0],
        tabBarInactiveTintColor: themaColors[6],
      })}
    >

      {renderScreen(Dispositivo, "Dispositivo")}

      {renderScreen(Ambiente, "Ambiente")}

    </CadastroTab.Navigator >

  );
}

export default Cadastro