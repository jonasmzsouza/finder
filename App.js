import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/screens/Login'
import Home from './components/screens/Home'
import Cadastro from './components/screens/Cadastro'
import Gerenciar from './components/screens/Gerenciar'
import Listar from './components/screens/Listar'
import { themaColors } from './assets/styles/styles';

const Stack = createNativeStackNavigator()

const App = (props) => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={themaColors[4]} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: themaColors[0]
          },
          headerTintColor: themaColors[2]
        }}
      >

        <Stack.Screen
          component={Login}
          name="Login"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Cadastro}
          name="Cadastro"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Gerenciar}
          name="Gerenciar"
          options={({ route }) => ({ title: "Gerenciar " + route.params.screen })}
        />

        <Stack.Screen
          component={Listar}
          name="Listar"
          options={({ route }) => ({ title: route.params.screen + "s Cadastrados" })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App