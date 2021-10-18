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

import SolicitacoesRealizadasScreen from '../../screens/SolicitacoesRealizadasScreen';
import SolicitacoesRecebidasScreen from '../../screens/SolicitacoesRecebidasScreen';

const SolicitacoesTab = createBottomTabNavigator()

const SolicitacoesTabNavigation = (props) => {

  function renderScreen(screen, name) {
    return (
      <SolicitacoesTab.Screen
        component={screen}
        name={name}
        options={{
          title: name,
          headerTitle: 'Solicitações ' + name,
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
    <SolicitacoesTab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: themaColors[0]
        },
        headerTintColor: themaColors[2],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Recebidas') {
            iconName = focused ? 'ios-arrow-undo' : 'ios-arrow-undo';
          } else if (route.name === 'Realizadas') {
            iconName = focused ? 'ios-arrow-redo' : 'ios-arrow-redo';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themaColors[0],
        tabBarInactiveTintColor: themaColors[6],
      })}
    >

      {renderScreen(SolicitacoesRecebidasScreen, "Recebidas")}

      {renderScreen(SolicitacoesRealizadasScreen, "Realizadas")}

    </SolicitacoesTab.Navigator >

  );
}

export default SolicitacoesTabNavigation