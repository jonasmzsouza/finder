import React from 'react'

import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import styles, { linearGradienteColor } from '../../styles/Styles'
import localizar from '../../assets/img/localizar.png'
import solicitacoes from '../../assets/img/solicitacoes.png'
import cadastros from '../../assets/img/cadastros.png'
import finderLetras from '../../assets/img/finderLetras.png'

const Home = (props) => {

  const { usuario } = props.route.params || '';

  function renderMediumBtn(name, imageName, screen) {
    return (
      <TouchableOpacity
        style={[styles.center, styles.btnHome, styles.btnHomeM]}
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
        <Text style={[styles.btnHomeTxt, styles.btnHomeTxtM]}>{name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>
        <View style={{ width: '100%', height: '8%', bottom: '15%' }}>
          <TouchableOpacity

            onPress={() => {
              props.navigation.reset({
                index: 0,
                routes: [{
                  name: 'Login'
                }]
              });
            }}
          >
            <Text style={[styles.btnSair]}>&times;</Text>
          </TouchableOpacity>
        </View>

        <View>

          <View style={[styles.center]}>
            <Image source={finderLetras} />
          </View>

          <Text style={[styles.label]}>
            O que você quer fazer?
          </Text>

          <TouchableOpacity
            style={[styles.center, styles.btnHome, styles.btnHomeL]}
            onPress={() => { alert('Em desenvolvimento') }}>
            <Image
              source={localizar}
              style={{}} />
            <Text style={[styles.btnHomeTxt, styles.btnHomeTxtL]}>Localizar</Text>
          </TouchableOpacity>

          <View style={[styles.btnHomeGroup]}>

            {renderMediumBtn('Solicitações', solicitacoes)}

            {usuario === 'finder' && (
              renderMediumBtn('Cadastro', cadastros, 'Cadastro')
            )}

          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Home