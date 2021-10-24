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

import { postJobTitle, putJobTitle } from '../../stores/services/JobTitleService';

import { getHeaderAuthJwt } from '../../stores/actions/Actions';

import { readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const RegisterJobTitleScreen = (props) => {

  const [name, setName] = useState('');
  const { item, editMode } = props.route.params || '';
  const [tokens, setTokens] = useState({})
  const [jwt, setJwt] = useState({}) 

  const clearFields = () => {
    setName('');
  }

  const loadInputModoEditar = () => {
    if(editMode) {
      setName(item.nome)
    }
  }

  const validateFieldData = () => {

    let erros = [];
    
    if (name.trim().length == 0)
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

  const registerData = () => {
    if (validateFieldData()) {
      postJobTitle(jwt, name)
        .then(() => {
          Alert.alert('Sucesso', 'Cargo cadastrado com sucesso!')
          clearFields()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o cargo!'))
    }
  }

  const updateData = () => {
    if(validateFieldData()) {
      putJobTitle(jwt, item.id, name)
        .then(() => {
          Alert.alert('Sucesso', 'Cargo atualizado com sucesso!')
          clearFields()
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
            <Text style={[styles.fieldLabel]}>
              Nome do Cargo:
            </Text>

            <TextInput
              onChangeText={(txt) => setName(editMode ? item.nome : txt)}
              style={[styles.field, styles.registrationField]}
              underlineColorAndroid='transparent'
              value={editMode ? item.nome : name}
            />
          </View>

          { editMode && (
            <>
              <View>
                <Button
                  buttonStyle={styles.btn}
                  onPress={() => updateData()}
                  title="Atualizar"
                />
              </View>
              
              <View>
                <Button
                  buttonStyle={styles.btnCancel}
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
                  onPress={() => registerData()}
                  title="Cadastrar"
                />
              </View>

              <View>
                <Button
                  buttonStyle={styles.btn}
                  onPress={() => {
                    props.navigation.navigate('ListRegistrationItem', {
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

export default RegisterJobTitleScreen