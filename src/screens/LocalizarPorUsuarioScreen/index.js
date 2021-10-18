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

import styles, { linearGradienteColor } from '../../styles/Styles'

import { getUsuarios } from '../../stores/services/UsuarioService';
import { getItems, radioButtonsData } from '../../stores/actions/Actions';

const LocalizarPorUsuarioScreen = (props) => {

  const [usuarioData, setUsuarioData] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState(0);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)
  const [selectedRadio, setSelectedRadio] = useState([]);

  const limparCampos = () => {
    setSelectedUsuario(0);
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

    if (selectedUsuario === 0 || selectedUsuario === undefined)
      erros.push('o usuário');

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

  const getUsuarioData = () => {
    setUsuarioData('')
    getUsuarios().then((response) => setUsuarioData(response.data))
    .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  useEffect(() => {
    getUsuarioData() 
  }, [])  

  return (
    <ScrollView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>

        <View style={{ width: '90%' }}>

          <View>
            <Text style={[styles.labelCadastro]}>
              Nome do Usuário:
            </Text>

            <View style={[styles.selectCadastroView]}>
              <Picker
                style={[styles.selectCadastroPicker]}
                selectedValue={selectedUsuario}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedUsuario(itemValue)
                }
              >
                
                { getItems(usuarioData) }
                  
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