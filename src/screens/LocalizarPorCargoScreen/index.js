import React, {
  useEffect,
  useState
} from 'react'

import {
  Alert,
  ScrollView,
  Text,
  View,
} from 'react-native'

import { Button } from 'react-native-elements'

import { Picker } from '@react-native-picker/picker';

import LinearGradient from 'react-native-linear-gradient';

import RadioGroup from 'react-native-radio-buttons-group';

import styles, { linearGradienteColor, themaColors } from '../../styles/Styles'

import { getCargos } from '../../stores/services/CargoService';
import { getAmbientes } from '../../stores/services/AmbienteService';
import { getItems, radioButtonsData } from '../../stores/actions/Actions';

const LocalizarPorUsuarioScreen = (props) => {

  const [cargoData, setCargoData] = useState('');
  const [ambienteData, setAmbienteData] = useState('');
  const [selectedCargo, setSelectedCargo] = useState(0);
  const [selectedAmbiente, setSelectedAmbiente] = useState(0);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)
  const [selectedRadio, setSelectedRadio] = useState([]);

  const limparCampos = () => {
    setSelectedCargo(0);
    setSelectedAmbiente(0);
    setSelectedRadio([])
  }
  
  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
    radioButtons.forEach(choice => {
      if(choice.selected == true) {
        setSelectedRadio(choice)
      }
    });
  }
  
  const validarDados = () => {

    let erros = [];

    if (selectedCargo === 0 || selectedCargo === undefined)
      erros.push('o cargo');

    if (selectedAmbiente === 0 || selectedAmbiente === undefined)
      erros.push('o ambiente');      

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
  
  const localizar = () => {
    if (validarDados()) {
      Alert.alert('Atenção!', 'Função está em desenvolvimento. Experimente a seção de cadastro!')
    }
  }

  const getCargoData = () => {
    setCargoData('')
    getCargos().then((response) => setCargoData(response.data))
    .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  const getAmbienteData = () => {
    setAmbienteData('')
    getAmbientes().then((response) => setAmbienteData(response.data))
    .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  useEffect(() => {
    getCargoData()
    getAmbienteData()
  }, [])  

  return (
    <ScrollView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>

        <View style={{ width: '90%' }}>

          <View>
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

          <View>
            <Text style={[styles.labelCadastro]}>
              Ambiente de solicitação:
            </Text>

            <View style={[styles.selectCadastroView]}>
              <Picker
                style={[styles.selectCadastroPicker]}
                selectedValue={selectedAmbiente}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedAmbiente(itemValue)
                }
              >
                
                { getItems(ambienteData) }
                  
              </Picker>
            </View>

          </View>

          <View>
            <Text style={[styles.labelCadastro]}>
              Grau de urgência:
            </Text>

            <RadioGroup
              containerStyle={styles.containerRadioGroup}
              radioButtons={radioButtons} 
              onPress={onPressRadioButton} 
            />            
          </View>

          <View>
            <Button
              buttonStyle={styles.btn}
              onPress={() => localizar()}
              title="Localizar"
            />
          </View>

        </View>

      </LinearGradient>
    </ScrollView>
  )
}

export default LocalizarPorUsuarioScreen