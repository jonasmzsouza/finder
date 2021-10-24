import React, {
  useEffect,
  useState
} from 'react'

import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import styles, { linearGradienteColor } from '../../styles/Styles'
import find from '../../assets/img/find.png'
import requests from '../../assets/img/requests.png'
import register from '../../assets/img/register.png'
import finderLetters from '../../assets/img/finderLetters.png'

import { removeAuthenticationTokens, readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const HomeScreen = (props) => {

  const [tokens, setTokens] = useState({})

  function renderMediumBtn(name, imageName, screen) {
    return (
      <TouchableOpacity
        style={[styles.center, styles.btnHomeScreen, styles.btnHomeScreenM]}
        onPress={() => {
          try {
            if (screen == null) {
              alert('Em desenvolvimento')
            } else {
              props.navigation.navigate(screen)
            }
          } catch (error) {
            throw new Error('Não foi possível navegar para a tela ' + screen)
          }
        }}>
        <Image
          source={imageName}
          style={{}} />
        <Text style={[styles.btnHomeScreenTxt, styles.btnHomeScreenTxtM]}>{name}</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    readAuthenticationTokens((error, success) => {
      if ( !error && success && success.length > 0 ) {
        const payload = jwtDecode(success)
        setTokens(success)
      }
    }) 
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>
        <View style={{ width: '100%', height: '8%', bottom: '15%' }}>
          <TouchableOpacity
            onPress={() => {
              removeAuthenticationTokens(() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{
                    name: 'LoginScreen'
                  }]
                });
              })
            }}
          >
            <Text style={[styles.btnLogout]}>&times;</Text>
          </TouchableOpacity>
        </View>

        <View>

          <View style={[styles.center]}>
            <Image source={finderLetters} />
          </View>

          <Text style={[styles.label]}>
            O que você quer fazer?
          </Text>

          <TouchableOpacity
            style={[styles.center, styles.btnHomeScreen, styles.btnHomeScreenL]}
            onPress={() => { 
              props.navigation.navigate('FindTabNavigation')
             }}>
            <Image
              source={find}
              style={{}} />
            <Text style={[styles.btnHomeScreenTxt, styles.btnHomeScreenTxtL]}>Localizar</Text>
          </TouchableOpacity>

          <View style={[styles.btnHomeScreenGroup]}>

            {renderMediumBtn('Solicitações', requests, 'RequestsTabNavigation')}

            {renderMediumBtn('Cadastro', register, 'RegisterTabNavigation')}

          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default HomeScreen