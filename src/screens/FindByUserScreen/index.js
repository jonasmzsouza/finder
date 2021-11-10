import React, {
  useState
} from 'react'

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button } from 'react-native-elements'

import { Picker } from '@react-native-picker/picker';

import LinearGradient from 'react-native-linear-gradient';

import { useFocusEffect } from '@react-navigation/core';

import RadioGroup from 'react-native-radio-buttons-group';

import styles, { linearGradienteColor, themaColors } from '../../styles/Styles'

import { getUser, getUsers } from '../../stores/services/UserService';
import { getItems, getHeaderAuthJwt, radioButtonsData } from '../../stores/actions/Actions';

import { getFindByUser } from '../../stores/services/FindByUserService';

import { readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const FindByUserScreen = (props) => {

  const [userData, setUserData] = useState('');
  const [selecterUser, setSelectedUser] = useState(0);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)
  const [selectedRadio, setSelectedRadio] = useState([]);
  const [searchResponse, setSearchResponse] = useState({})
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [selectedRadioValue, setSelectedRadioValue] = useState('');
  const [tokens, setTokens] = useState({})
  const [jwt, setJwt] = useState({})
  const [loading, setLoading] = useState(false)   

  const clearFields = () => {
    setSelectedUser(0);
    setSelectedRadio([])
  }

  const closeResponseBox = () => {
    setSearchPerformed(false)
    setSearchResponse({})
    setSelectedRadioValue('')
  }

  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
    radioButtons.forEach(choice => {
      if(choice.selected == true) {
        setSelectedRadio(choice)
        setSearchPerformed(false)
      }
    });
  }

  const validateFieldData = () => {
    let errors = [];

    if (selecterUser === 0 || selecterUser === undefined)
      errors.push('o usuário');

    if (selectedRadio.length === 0)
    errors.push('o grau de urgência');

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

  const getUserName = () => {
    for (let i=0; i<userData.length; i++) {
      if(userData[i].id == searchResponse.idUsuario) {
        return userData[i].nome
      }
    }
  }

  const locate = () => {
    if (validateFieldData()) {
      setLoading(true)
      clearFields()
      closeResponseBox()
      getFindByUser(selecterUser)
        .then((response) => {
          setSearchResponse(response.data)
          setSearchPerformed(true)
          setSelectedRadioValue(selectedRadio.value)
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API de localização'))
        .finally(() => setLoading(false)) 
    }
  }

  const getUserData = (jwt) => {
    setUserData('')
    getUsers(jwt)
      .then((response) => setUserData(response.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  useFocusEffect(
    React.useCallback(() => {
      readAuthenticationTokens((error, success) => {
        if ( !error && success && success.length > 0 ) {
          const payload = jwtDecode(success)
          setTokens(success)
          setJwt(getHeaderAuthJwt(success))
          setSearchPerformed(false)       
          setSearchResponse({})
          setSelectedRadioValue({}) 
          getUserData(getHeaderAuthJwt(success))
        }
      })
      return () => {
      };
    }, [])
  ); 

  return (
    <ScrollView contentContainerStyle={{flex: 1}} style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>

        <View style={[styles.content]}>

          <View style={[styles.contentItem]}>
            <Text style={[styles.fieldLabel]}>
              Nome do Usuário:
            </Text>

            <View style={[styles.registrationSelectionView]}>
              <Picker
                style={[styles.registrationSelectionPicker]}
                selectedValue={selecterUser}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedUser(itemValue)
                }
              >
                { getItems(userData) }  
              </Picker>
            </View>
          </View>

          <View style={[styles.contentItem]}>
            <Text style={[styles.fieldLabel]}>
              Grau de urgência:
            </Text>

            <RadioGroup
              containerStyle={styles.containerRadioGroup}
              radioButtons={radioButtons} 
              onPress={onPressRadioButton} 
            />            
          </View>

          <View style={[styles.contentItem]}>
            <Button
              buttonStyle={styles.btn}
              onPress={() => locate()}
              title="Localizar"
            />
          </View>
          <ActivityIndicator animating={ loading } /> 

          { searchPerformed && searchResponse == null && (
            <View 
              style={[styles.findBox, {backgroundColor: themaColors[1]}]}>
              <View style={[styles.searchBoxHeader]}>
                <Text style={[styles.searchBoxHeaderTxt]}>OPS!</Text>
                
                <View style={[styles.btnCloseBoxContanier]}>
                  <TouchableOpacity
                  style={{height: 30}}
                    onPress={() => {
                      closeResponseBox()
                    }}
                  >
                    <Text style={[styles.btnCloseBoxTxt]}>&times;</Text>
                  </TouchableOpacity>
                </View>

              </View>             

              <View style={[styles.center, {flex: 1}]}>
                <Text style={[styles.searchResponseTxt]}>Usuário não localizado!</Text>
              </View>

            </View>            
          ) || searchPerformed && (
            <View 
              style={
                selectedRadioValue == 0 ? 
                [styles.findBox, {backgroundColor: themaColors[11]}] : 
                selectedRadioValue == 1 ? 
                [styles.findBox, {backgroundColor: themaColors[12]}] : 
                [styles.findBox, {backgroundColor: themaColors[13]}]
                
              }>
              <View style={[styles.searchBoxHeader]}>
                <Text style={[styles.searchBoxHeaderTxt]}>ENCONTRAMOS!</Text>
                
                <View style={[styles.btnCloseBoxContanier]}>
                  <TouchableOpacity
                  style={{height: 30, }}
                    onPress={() => {
                      closeResponseBox()
                    }}
                  >
                    <Text style={[styles.btnCloseBoxTxt]}>&times;</Text>
                  </TouchableOpacity>
                </View>

              </View>             

              <View style={[styles.searchBox, styles.center]}>
                <Text style={[styles.searchResponseTxt]}>{getUserName()}</Text>
              </View>

              <Text style={[styles.searchResponseTxt, {marginTop: 10}]}>Chamado aberto!</Text>
              <Text style={[styles.searchResponseTxt]}>Aguardando resposta</Text>
            </View>         
          )}

        </View>
             
      </LinearGradient>
    </ScrollView>
  )
}

export default FindByUserScreen