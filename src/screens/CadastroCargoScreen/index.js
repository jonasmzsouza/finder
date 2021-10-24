import React, {
  useState
} from 'react'

import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native'

import {
  Button,
} from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient';

import styles, { linearGradienteColor } from '../../styles/Styles'

import { useFocusEffect } from '@react-navigation/core';

import { postCargo, putCargo } from '../../stores/services/CargoService';

import { getHeaderAuthJwt } from '../../stores/actions/Actions';

import { readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const CadastroCargoScreen = (props) => {

  const [nome, setNome] = useState('');
  const { item, modoEditar } = props.route.params || '';
  const [tokens, setTokens] = useState({})
  const [jwt, setJwt] = useState({}) 

  const limparCampos = () => {
    setNome('');
  }

  const loadInputModoEditar = () => {
    if(modoEditar) {
      setNome(item.nome)
    }
  }

  const validarDados = () => {

    let erros = [];
    
    if (nome.trim().length == 0)
      erros.push('o nome do cargo');

    if (erros.length > 0) {
      let mensagemErro = '';
      erros.forEach(element => {
        mensagemErro += '\n - ' + element
      });

      Alert.alert("Erro", "Informe corretamente:" + mensagemErro);
      return false;
    }

    return true
  }

  const cadastrar = () => {
    if (validarDados()) {
      postCargo(jwt, nome)
        .then(() => {
          Alert.alert('Sucesso', 'Cargo cadastrado com sucesso!')
          limparCampos()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o cargo!'))
    }
  }

  const atualizar = () => {
    if(validarDados()) {
      putCargo(jwt, item.id, nome)
        .then(() => {
          Alert.alert('Sucesso', 'Cargo atualizado com sucesso!')
          limparCampos()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o cargo!'))
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      readAuthenticationTokens((error, success) => {
        if ( !error && success && success.length > 0 ) {
          const payload = jwtDecode(success)
          setTokens(success)
          setJwt(getHeaderAuthJwt(success))
          loadInputModoEditar()
        }
      })
      return () => {
      };
    }, [])
  );   

  return (
    <ScrollView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>

        <View style={{ width: '90%' }}>

          <View>
            <Text style={[styles.labelCadastro]}>
              Nome do Cargo:
            </Text>

            <TextInput
              onChangeText={(txt) => setNome(modoEditar ? item.nome : txt)}
              style={[styles.input, styles.inputCadastro]}
              underlineColorAndroid='transparent'
              value={modoEditar ? item.nome : nome}
            />
          </View>

          { modoEditar && (
            <>
              <View>
                <Button
                  buttonStyle={styles.btn}
                  onPress={() => atualizar()}
                  title="Atualizar"
                />
              </View>
              
              <View>
                <Button
                  buttonStyle={styles.btnCancelar}
                  onPress={() => {
                    props.navigation.goBack()
                  }}
                  title="Cancelar"
                />
              </View>
            </>
          ) || (
            <>
              <View>
                <Button
                  buttonStyle={styles.btn}
                  onPress={() => cadastrar()}
                  title="Cadastrar"
                />
              </View>

              <View>
                <Button
                  buttonStyle={styles.btn}
                  onPress={() => {
                    props.navigation.navigate('ListarItemCadastro', {
                      screen: 'Cargo',
                      title: 'Cargos',
                    })
                  }}
                  title="Listar Cargos"
                />
              </View>
            </>
          )}

        </View>
      </LinearGradient>
    </ScrollView>

  )
}

export default CadastroCargoScreen