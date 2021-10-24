import React, {
  useState
} from 'react'

import {
  ActivityIndicator,
  Alert,
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
import { login } from '../../stores/services/LoginService';

import { insertAuthenticationTokens } from '../../database/Db';

const LoginScreen = (props) => {

  const [verificandoToken, setVerificandoToken] = useState(true)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [idUsuario, setIdUsuario] = useState(2)

  const redirectHome = () => {
    props.navigation.reset({
      index : 0,
      routes : [
        {
          name : 'HomeScreen'
        }
      ]
    })
  }

  const limparCampos = () => {
    setEmail('');
    setSenha('');
  }

  const validar = () => {

    const emailReg = /^([\w]\.?)+@([\w]+\.)+([a-zA-Z]{2,4})+$/;

    if (!emailReg.test(email)) {
      Alert.alert('Erro', 'Informe um email válido')
      return false
    }

    if (senha.trim().length === 0) {
      Alert.alert('Erro', 'Informe corretamente a senha')
      return false
    }

    return true
  }

  const acessar = () => {  
    if (validar()) {
      limparCampos()
      setLoading(true)
      login(email, senha)
        .then((response) => {

          console.log(response.data)

          insertAuthenticationTokens(response.data,  (error) => {
           if(error) {
             return Alert.alert('Erro', 'Erro ao guardar o token')
           }
            redirectHome() 
          })
        })
        .catch(() => {
          Alert.alert('Erro', ' E-mail ou senha incorretos!')
        })
        .finally(() => setLoading(false))
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
                name: 'email',
                type: 'entypo',
                solid: true,
              }}
              onChangeText={(txt) => setEmail(txt)}
              placeholder="Digite seu email"
              value={email}
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
      
        <ActivityIndicator animating={ loading } />
      </LinearGradient>
    </SafeAreaView>
  )
}

export default LoginScreen