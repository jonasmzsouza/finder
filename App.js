import React from 'react'
import { 
  StatusBar
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import LocalizarTabNavigation from './src/navigation/LocalizarTabNavigation';
import SolicitacoesTabNavigation from './src/navigation/SolicitacoesTabNavigation';
import CadastroTabNavigation from './src/navigation/CadastroTabNavigation';
import ListarItemCadastro from './src/components/ListarItemCadastro';
import CadastroUsuarioScreen from './src/screens/CadastroUsuarioScreen';
import CadastroAmbienteScreen from './src/screens/CadastroAmbienteScreen';
import CadastroCargoScreen from './src/screens/CadastroCargoScreen';
import CadastroSetorScreen from './src/screens/CadastroSetorScreen';

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
          headerTintColor: themaColors[2],
        }}
      >

        <Stack.Screen
          component={LoginScreen}
          name="LoginScreen"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={HomeScreen}
          name="HomeScreen"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={LocalizarTabNavigation}
          name="LocalizarTabNavigation"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={SolicitacoesTabNavigation}
          name="SolicitacoesTabNavigation"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={CadastroTabNavigation}
          name="CadastroTabNavigation"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={ListarItemCadastro}
          name="ListarItemCadastro"
          options={({ route }) => ({ title: route.params.title + " Cadastrados" })}
        />

        <Stack.Screen
          component={CadastroUsuarioScreen}
          name="Usuario"
          options={{
            title : 'Atualização de Usuário'
          }}
        />

        <Stack.Screen
          component={CadastroAmbienteScreen}
          name="Ambiente"
          options={{
            title : 'Atualização de Ambiente'
          }}
        />

        <Stack.Screen
          component={CadastroCargoScreen}
          name="Cargo"
          options={{
            title : 'Atualização de Cargo'
          }}
        />

        <Stack.Screen
          component={CadastroSetorScreen}
          name="Setor"
          options={{
            title : 'Atualização de Setor'
          }}
        />                        

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App