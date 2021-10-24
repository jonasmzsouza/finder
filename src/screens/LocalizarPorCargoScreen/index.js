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

import { getCargos } from '../../stores/services/CargoService';
import { getSetores } from '../../stores/services/SetorService';
import { getItems, getHeaderAuthJwt, radioButtonsData } from '../../stores/actions/Actions';

import { getLocalizarPorCargo } from '../../stores/services/LocalizarPorCargoService';

import { readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const LocalizarPorUsuarioScreen = (props) => {

  const [cargoData, setCargoData] = useState('');
  const [setorData, setSetorData] = useState('');
  const [selectedCargo, setSelectedCargo] = useState(0);
  const [selectedSetor, setSelectedSetor] = useState(0);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)
  const [selectedRadio, setSelectedRadio] = useState([]);
  const [resposta, setResposta] = useState('')
  const [buscaRealizada, setBuscaRealizada] = useState(false)
  const [selectedRadioValue, setSelectedRadioValue] = useState('');
  const [tokens, setTokens] = useState({})
  const [jwt, setJwt] = useState({})
  const [loading, setLoading] = useState(false)       

  const limparCampos = () => {
    setSelectedCargo(0);
    setSelectedSetor(0);
    setSelectedRadio([])   
  }
  
  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
    radioButtons.forEach(choice => {
      if(choice.selected == true) {
        setSelectedRadio(choice)
        setBuscaRealizada(false)
      }
    });
  }
  
  const validarDados = () => {
    let erros = [];

    if (selectedCargo === 0 || selectedCargo === undefined)
      erros.push('o cargo');

    if (selectedSetor === 0 || selectedSetor === undefined)
      erros.push('o setor');      

    if (selectedRadio.length === 0)
    erros.push('o grau de urgência');

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

  const getNomeCargo = () => {
    for (let i=0; i<cargoData.length; i++) {
      if(cargoData[i].id == resposta.idCargo) {
        return cargoData[i].nome
      }
    }
  }
  
  const localizar = () => {
    if (validarDados()) {
      limparCampos()
      setLoading(true)      
      getLocalizarPorCargo(selectedCargo)
        .then((response) => {
          setResposta(response.data)
          setBuscaRealizada(true)
          setSelectedRadioValue(selectedRadio.value)
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API de localização'))
        .finally(() => setLoading(false)) 

        
    }
  }

  const getCargoData = (jwt) => {
    setCargoData('')
    getCargos(jwt)
      .then((response) => setCargoData(response.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  const getSetorData = (jwt) => {
    setSetorData('')
    getSetores(jwt)
      .then((response) => setSetorData(response.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  useFocusEffect(
    React.useCallback(() => {
      readAuthenticationTokens((error, success) => {
        if ( !error && success && success.length > 0 ) {
          const payload = jwtDecode(success)
          setTokens(success)
          setJwt(getHeaderAuthJwt(success))
          setBuscaRealizada(false)       
          setResposta('')
          setSelectedRadioValue('') 
          getCargoData(getHeaderAuthJwt(success))
          getSetorData(getHeaderAuthJwt(success))
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
            <Text style={[styles.labelCadastro]}>
              Cargo desejado:
            </Text>

            <View style={[styles.selectCadastroView]}>
              <Picker
                style={[styles.selectCadastroPicker]}
                selectedValue={selectedCargo}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCargo(itemValue)
                }
              >
                
                { getItems(cargoData) }
                  
              </Picker>
            </View>

          </View>

          <View style={[styles.contentItem]}>
            <Text style={[styles.labelCadastro]}>
              Setor de solicitação:
            </Text>

            <View style={[styles.selectCadastroView]}>
              <Picker
                style={[styles.selectCadastroPicker]}
                selectedValue={selectedSetor}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedSetor(itemValue)
                }
              >
                { getItems(setorData) }
              </Picker>
            </View>
          </View>

          <View style={[styles.contentItem]}>
            <Text style={[styles.labelCadastro]}>
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
              onPress={() => localizar()}
              title="Localizar"
            />
          </View>
          <ActivityIndicator animating={ loading } />

          { buscaRealizada && resposta == null && (
            <View 
              style={[styles.boxLocalizar, {backgroundColor: themaColors[1]}]}>
              <View style={[styles.boxEncontradoHeader]}>
                <Text style={[styles.boxEncontradoHeaderTxt]}>OPS!</Text>
                
                <View style={[styles.btnCloseBoxContanier]}>
                  <TouchableOpacity
                  style={{height: 30}}
                    onPress={() => {
                      setBuscaRealizada(false)
                    }}
                  >
                    <Text style={[styles.btnCloseBoxTxt]}>&times;</Text>
                  </TouchableOpacity>
                </View>

              </View>             

              <View style={[styles.center, {flex: 1}]}>
                <Text style={[styles.respostaTxt]}>Usuário não localizado!</Text>
              </View>

            </View>            
          ) || buscaRealizada && (
            <View 
              style={
                selectedRadioValue == 0 ? 
                [styles.boxLocalizar, {backgroundColor: themaColors[11]}] : 
                selectedRadioValue == 1 ? 
                [styles.boxLocalizar, {backgroundColor: themaColors[12]}] : 
                [styles.boxLocalizar, {backgroundColor: themaColors[13]}]
                
              }>
              <View style={[styles.boxEncontradoHeader]}>
                <Text style={[styles.boxEncontradoHeaderTxt]}>ENCONTRAMOS!</Text>
                
                <View style={[styles.btnCloseBoxContanier]}>
                  <TouchableOpacity
                  style={{height: 30, }}
                    onPress={() => {
                      setBuscaRealizada(false)
                    }}
                  >
                    <Text style={[styles.btnCloseBoxTxt]}>&times;</Text>
                  </TouchableOpacity>
                </View>

              </View>             

              <View style={[styles.boxEncontrado, styles.center]}>
              <Text style={[styles.respostaTxt]}>{getNomeCargo()}</Text>
              </View>

              <Text style={[styles.respostaTxt, {marginTop: 10}]}>Chamado aberto!</Text>
              <Text style={[styles.respostaTxt]}>Aguardando resposta</Text>
            </View>         
          )}

        </View>
        
      </LinearGradient>
    </ScrollView>
  )
}

export default LocalizarPorUsuarioScreen