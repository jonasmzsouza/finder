import React, {
  useState
} from 'react'

import {
  SafeAreaView,
  Image,
  View
} from 'react-native'

import {
  Button,
  Input
} from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient';

import styles, {
  linearGradienteColor,
  themaColors
} from '../../styles/Styles'

import finder from '../../assets/img/finder.png'

const LoginScreen = (props) => {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const limparCampos = () => {
    setUsuario('');
    setSenha('');
  }

  const validar = () => {
    if (usuario.trim().length === 0) {
      alert('Informe corretamente o usuário')
      return false
    }

    if (senha.trim().length === 0) {
      alert('Informe corretamente a senha')
      return false
    }

    if (usuario != 'finder' && senha != 'finder') {
      alert('Usuário/senha inválidos')
      return false
    }

    return true
  }

  const acessar = () => {
    if (validar()) {
      limparCampos()
      props.navigation.reset({
        index: 0,
        routes: [{
          name: 'HomeScreen',
          params: { usuario }
        }]
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>

        <View style={[styles.loginBox]}>
          <View style={[styles.center]}>
            <Image source={finder} />
          </View>

          <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
            <Input
              style={[styles.input]}
              leftIcon={{
                color: themaColors[0],
                name: 'user',
                type: 'font-awesome-5',
                solid: true,
              }}
              onChangeText={(txt) => setUsuario(txt)}
              placeholder="Digite seu usuário"
              value={usuario}
            />

            <Input
              style={[styles.input]}
              leftIcon={{
                color: themaColors[0],
                name: 'lock',
                type: 'font-awesome-5',
                solid: true
              }}
              onChangeText={(txt) => setSenha(txt)}
              placeholder="Digite sua senha"
              secureTextEntry
              value={senha}
            />
          </View>
        </View>

        <View>
          <Button
            buttonStyle={[styles.btn, styles.btnAcessar]}
            onPress={() => acessar()}
            title="Acessar"
          />
        </View>

      </LinearGradient>
    </SafeAreaView>
  )
}

export default LoginScreen