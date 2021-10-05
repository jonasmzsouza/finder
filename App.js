import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Cadastro from './src/screens/Cadastro';
import GerenciarCadastro from './src/components/GerenciarCadastro';
import ListarItemCadastro from './src/components/ListarItemCadastro';
import { themaColors } from './src/styles/Styles';

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
          component={GerenciarCadastro}
          name="GerenciarCadastro"
          options={({ route }) => ({ title: "Gerenciar " + route.params.screen })}
        />

        <Stack.Screen
          component={ListarItemCadastro}
          name="ListarItemCadastro"
          options={({ route }) => ({ title: route.params.screen + "s Cadastrados" })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App