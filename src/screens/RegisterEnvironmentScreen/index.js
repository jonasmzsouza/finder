import React, {
  useState
} from 'react'

import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'

import { Button } from 'react-native-elements'

import { Picker } from '@react-native-picker/picker';

import LinearGradient from 'react-native-linear-gradient';

import { useFocusEffect } from '@react-navigation/core';

import styles, { linearGradienteColor } from '../../styles/Styles'

import { getDepartments } from '../../stores/services/DepartmentService';
import { postEnvironment, putEnvironment } from '../../stores/services/EnvironmentService';
import { getItems, getHeaderAuthJwt } from '../../stores/actions/Actions';

import { readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const RegisterEnvironmentScreen = (props) => {

  const [deviceCode, setDeviceCode] = useState('');
  const [name, setName] = useState('');
  const [departmentData, setDepartmentData] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(0);  
  const [locationName, setLocationName] = useState('');
  const [floor, setFloor] = useState('');
  const [size, setSize] = useState('');
  const [proximityNumber, setProximityNumber] = useState('');
  const { item, editMode } = props.route.params || '';
  const [tokens, setTokens] = useState({})
  const [jwt, setJwt] = useState({})

  const clearFields = () => {
    setDeviceCode('');
    setName('');
    setSelectedDepartment(0);
    setLocationName('');
    setFloor('');
    setSize('');
    setProximityNumber('');
  }

  const loadInputModoEditar = () => {
    if(editMode) {
      setName(item.nome)
      setSelectedDepartment(item.setor.id)
    }
  }

  const validateFieldData = () => {
    const numReg = /[^0-9]/g;

    let erros = [];

    if (deviceCode.trim().length == 0 || numReg.test(deviceCode))
      erros.push('o código do dispositivo');

    if (name.trim().length == 0)
      erros.push('o nome do ambiente');

    if (selectedDepartment === 0 || selectedDepartment === undefined)
      erros.push('o setor');

    if (locationName.trim().length == 0)
      erros.push('o nome da localização');

    if (floor.trim().length == 0 || numReg.test(floor))
      erros.push('o número do andar');

    if (size.trim().length == 0 || numReg.test(size))
      erros.push('o número do tamanho');

    if (proximityNumber.trim().length == 0 || numReg.test(proximityNumber))
      erros.push('o número da proximidade');

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
      postEnvironment(jwt, deviceCode, name, selectedDepartment, locationName, floor, size, proximityNumber)
        .then(() => {
          Alert.alert('Sucesso', 'Ambiente cadastrado com sucesso!')
          clearFields()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o ambiente!'))
    }
  }

  const updateData = () => {
    if(validateFieldData()) {
      putEnvironment(jwt, item.id, deviceCode, name, selectedDepartment, locationName, floor, size, proximityNumber)
        .then(() => {
          Alert.alert('Sucesso', 'Ambiente atualizado com sucesso!')
          clearFields()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o ambiente!'))
    }
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

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{ width: '45%' }}>
              <Text style={[styles.fieldLabel]}>
                Código do Dispositivo:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setDeviceCode(txt)}
                style={[styles.field, styles.registrationField]}
                underlineColorAndroid='transparent'
                value={deviceCode}
              />
            </View>

          </View>

          <Text style={[styles.fieldLabel]}>
            Nome do Ambiente:
          </Text>

          <TextInput
            onChangeText={(txt) => setName(txt)}
            style={[styles.field, styles.registrationField]}
            underlineColorAndroid='transparent'
            value={name}
          />

          <Text style={[styles.fieldLabel]}>
            Setor:
          </Text>

          <View style={[styles.registrationSelectionView]}>
            <Picker
              style={[styles.registrationSelectionPicker]}
              selectedValue={selectedDepartment}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDepartment(itemValue)
              }>
              
              { getItems(departmentData) }
                
            </Picker>
          </View>

          <Text style={[styles.fieldLabel]}>
            Nome da Localização:
          </Text>

          <TextInput
            onChangeText={(txt) => setLocationName(txt)}
            style={[styles.field, styles.registrationField]}
            underlineColorAndroid='transparent'
            value={locationName}
          />


          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '30%' }}>
              <Text style={[styles.fieldLabel]}>
                Andar:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setFloor(txt)}
                style={[styles.field, styles.registrationField]}
                underlineColorAndroid='transparent'
                value={floor}
              />
            </View>

            <View style={{ width: '30%' }}>
              <Text style={[styles.fieldLabel]}>
                Tamanho:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setSize(txt)}
                style={[styles.field, styles.registrationField]}
                underlineColorAndroid='transparent'
                value={size}
              />
            </View>

            <View style={{ width: '30%' }}>
              <Text style={[styles.fieldLabel]}>
                Proximidade:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setProximityNumber(txt)}
                style={[styles.field, styles.registrationField]}
                underlineColorAndroid='transparent'
                value={proximityNumber}
              />
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
                      screen: 'Ambiente',
                      title: 'Ambientes',
                    })
                  }}
                  title="Listar Ambientes"
                />
              </View>
            </>
          )}

        </View>
      </LinearGradient>
    </ScrollView>
  )
}

export default RegisterEnvironmentScreen