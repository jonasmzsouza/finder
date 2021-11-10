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

import { useFocusEffect } from '@react-navigation/core';

import styles, { linearGradienteColor } from '../../styles/Styles'

import { postDepartment, putDepartment } from '../../stores/services/DepartmentService';

import { getHeaderAuthJwt } from '../../stores/actions/Actions';

import { readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const RegisterDepartmentScreen = (props) => {

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

    let errors = [];
    
    if (name.trim().length == 0)
      errors.push('o nome do setor');

    if (errors.length > 0) {
      let mensagemErro = '';
      errors.forEach(element => {
        mensagemErro += '\n - ' + element
      });

      Alert.alert("Erro", "Informe corretamente:" + mensagemErro);
      return false;
    }

    return true
  }

  const registerData = () => {
    if (validateFieldData()) {
      postDepartment(jwt, name)
        .then(() => {
          Alert.alert('Sucesso', 'Setor cadastrado com sucesso!')
          clearFields()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o setor!'))
    }
  }

  const updateData = () => {
    if(validateFieldData()) {
      putDepartment(jwt, item.id, name)
        .then(() => {
          Alert.alert('Sucesso', 'Setor atualizado com sucesso!')
          clearFields()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o setor!'))
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
              Nome do Setor:
            </Text>

            <TextInput
              onChangeText={(txt) => setName(txt)}
              style={[styles.field, styles.registrationField]}
              underlineColorAndroid='transparent'
              value={name}
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
                      screen: 'Setor',
                      title: 'Setores',
                    })
                  }}
                  title="Listar Setores"
                />
              </View>
            </>
          )}

        </View>
      </LinearGradient>
    </ScrollView>

  )
}

export default RegisterDepartmentScreen