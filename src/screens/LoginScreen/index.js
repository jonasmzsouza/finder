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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

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

  const clearFields = () => {
    setEmail('');
    setPassword('');
  }

  const validateFieldData = () => {

    const emailReg = /^([\w]\.?)+@([\w]+\.)+([a-zA-Z]{2,4})+$/;

    if (!emailReg.test(email)) {
      Alert.alert('Erro', 'Informe um email válido')
      return false
    }

    if (password.trim().length === 0) {
      Alert.alert('Erro', 'Informe corretamente a senha')
      return false
    }

    return true
  }

  const signin = () => {  
    if (validateFieldData()) {
      clearFields()
      setLoading(true)
      login(email, password)
        .then((response) => {
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
              style={[styles.field]}
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
              style={[styles.field]}
              leftIcon={{
                color: themaColors[0],
                name: 'lock',
                type: 'font-awesome-5',
                solid: true
              }}
              onChangeText={(txt) => setPassword(txt)}
              placeholder="Digite sua senha"
              secureTextEntry
              value={password}
            />
          </View>
        </View>

        <View>
          <Button
            buttonStyle={[styles.btn, styles.btnLogin]}
            onPress={() => signin()}
            title="Acessar"
          />
        </View>
      
        <ActivityIndicator animating={ loading } />
      </LinearGradient>
    </SafeAreaView>
  )
}

export default LoginScreen