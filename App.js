import React from 'react'
import { 
  StatusBar
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FindTabNavigation from './src/navigation/FindTabNavigation';
import RequestsTabNavigation from './src/navigation/RequestsTabNavigation';
import RegisterTabNavigation from './src/navigation/RegisterTabNavigation';
import ListRegistrationItem from './src/components/ListRegistrationItem';
import RegisterUserScreen from './src/screens/RegisterUserScreen';
import RegisterEnvironmentScreen from './src/screens/RegisterEnvironmentScreen';
import RegisterJobTitleScreen from './src/screens/RegisterJobTitleScreen';
import RegisterDepartmentScreen from './src/screens/RegisterDepartmentScreen';

import { themaColors } from './src/styles/Styles';

const Stack = createNativeStackNavigator()

const App = () => {

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
          component={FindTabNavigation}
          name="FindTabNavigation"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={RequestsTabNavigation}
          name="RequestsTabNavigation"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={RegisterTabNavigation}
          name="RegisterTabNavigation"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={ListRegistrationItem}
          name="ListRegistrationItem"
          options={({ route }) => ({ title: route.params.title + " Cadastrados" })}
        />

        <Stack.Screen
          component={RegisterUserScreen}
          name="Usuario"
          options={{
            title : 'Atualização de Usuário'
          }}
        />

        <Stack.Screen
          component={RegisterEnvironmentScreen}
          name="Ambiente"
          options={{
            title : 'Atualização de Ambiente'
          }}
        />

        <Stack.Screen
          component={RegisterJobTitleScreen}
          name="Cargo"
          options={{
            title : 'Atualização de Cargo'
          }}
        />

        <Stack.Screen
          component={RegisterDepartmentScreen}
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