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

import { Button } from 'react-native-elements'

import { Picker } from '@react-native-picker/picker';

import LinearGradient from 'react-native-linear-gradient';

import { useFocusEffect } from '@react-navigation/core';

import styles, { linearGradienteColor } from '../../styles/Styles'

import { getJobTitles } from '../../stores/services/JobTitleService';
import { getDepartments } from '../../stores/services/DepartmentService';
import { postUser, putUser } from '../../stores/services/UserService';
import { getItems, getHeaderAuthJwt } from '../../stores/actions/Actions';

import { readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const RegisterJobTitleScreen = (props) => {

  const [name, setName] = useState('');
  const [jobTitleData, setJobTitleData] = useState('');
  const [departmentData, setDepartmentData] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const { item, editMode } = props.route.params || '';
  const [tokens, setTokens] = useState({})
  const [jwt, setJwt] = useState({})
  
  const clearFields = () => {
    setName('');
    setSelectedJobTitle(0);
    setSelectedDepartment(0);
  }

  const loadInputModoEditar = () => {
    if(editMode) {
      setName(item.nome)
      setSelectedJobTitle(item.cargo.id)
      setSelectedDepartment(item.setor.id)
    }
  } 

  const validateFieldData = () => {

    let erros = [];
    
    if (name.trim().length == 0)
      erros.push('o nome do usuário');

    if (selectedJobTitle === 0 || selectedJobTitle === undefined)
      erros.push('o cargo');

    if (selectedDepartment === 0 || selectedDepartment === undefined)
      erros.push('o setor');

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
      postUser(jwt, name, selectedJobTitle, selectedDepartment)
        .then(() => {
          Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!')
          clearFields()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o usuário!'))
    }
  }

  const updateData = () => {
    if(validateFieldData()) {
      putUser(jwt, item.id, name, selectedJobTitle, selectedDepartment)
        .then(() => {
          Alert.alert('Sucesso', 'Usuário atualizado com sucesso!')
          clearFields()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o usuário!'))
    }
  }

  const getJobTitleData = (jwt) => {
    setJobTitleData('')
    getJobTitles(jwt)
      .then((response) => setJobTitleData(response.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  const getDepartmentData = (jwt) => {
    setDepartmentData('')
    getDepartments(jwt)
      .then((response) => setDepartmentData(response.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  useFocusEffect(
    React.useCallback(() => {
      readAuthenticationTokens((error, success) => {
        if ( !error && success && success.length > 0 ) {
          const payload = jwtDecode(success)
          setTokens(success)
          setJwt(getHeaderAuthJwt(success))
          getJobTitleData(getHeaderAuthJwt(success))
          getDepartmentData(getHeaderAuthJwt(success))
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
              Nome do Usuário:
            </Text>

            <TextInput
              onChangeText={(txt) => setName(txt)}
              style={[styles.field, styles.registrationField]}
              underlineColorAndroid='transparent'
              value={name}
            />
          </View>

          <View>
            <Text style={[styles.fieldLabel]}>
              Cargo:
            </Text>

            <View style={[styles.registrationSelectionView]}>
              <Picker
                style={[styles.registrationSelectionPicker]}
                selectedValue={selectedJobTitle}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedJobTitle(itemValue)
                }
              >
                
                { getItems(jobTitleData) }
                  
              </Picker>
            </View>

          </View>

          <View>
            <Text style={[styles.fieldLabel]}>
              Setor:
            </Text>

            <View style={[styles.registrationSelectionView]}>
              <Picker
                style={[styles.registrationSelectionPicker]}
                selectedValue={selectedDepartment}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedDepartment(itemValue)
                }              
              >
                
                { getItems(departmentData) }
                  
              </Picker>
            </View>            
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
                      screen: 'Usuario',
                      title: 'Usuários',
                    })
                  }}
                  title="Listar Usuários"
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