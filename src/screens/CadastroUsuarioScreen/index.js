import React, {
  useEffect,
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

import styles, { linearGradienteColor } from '../../styles/Styles'

import { getCargos } from '../../services/CargoService';
import { getSetores } from '../../services/SetorService';
import { postUsuario, putUsuario } from '../../services/UsuarioService';

const CadastroUsuarioScreen = (props) => {

  const [nome, setNome] = useState('');
  const [cargoData, setCargoData] = useState('');
  const [setorData, setSetorData] = useState('');
  const [selectedCargo, setSelectedCargo] = useState(0);
  const [selectedSetor, setSelectedSetor] = useState(0);
  const { item, modoEditar } = props.route.params || '';

  const limparCampos = () => {
    setNome('');
    setSelectedCargo(0);
    setSelectedSetor(0);
  }

  const validarDados = () => {

    let erros = [];
    
    if (nome.trim().length == 0)
      erros.push('o nome do usuário');

    if (selectedCargo === 0 || selectedCargo === undefined)
      erros.push('o cargo');

    if (selectedSetor === 0 || selectedSetor === undefined)
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

  const loadInputModoEditar = () => {
    if(modoEditar) {
      setNome(item.nome)
      setSelectedCargo(item.cargo.id)
      setSelectedSetor(item.setor.id)
    }
  }  

  const cadastrar = () => {
    if (validarDados()) {
      postUsuario(nome, selectedCargo, selectedSetor)
        .then(() => {
          Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!')
          limparCampos()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o usuário!'))
    }
  }

  const atualizar = () => {
    if(validarDados()) {
      putUsuario(item.id, nome, selectedCargo, selectedSetor)
        .then(() => {
          Alert.alert('Sucesso', 'Usuário atualizado com sucesso!')
          limparCampos()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o usuário!'))
    }
  }

  const getItems = (itemData) => {
    let items = []
    items.push(<Picker.Item key={0} label="Selecione..." value={0} />)
    for (let i=0; i<itemData.length; i++) {
      items.push(<Picker.Item key={itemData[i].id} label={itemData[i].nome} value={itemData[i].id} />)
    }
    return items
  }

  const getCargoData = () => {
    setCargoData('')
    getCargos().then((response) => setCargoData(response.data))
    .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  const getSetorData = () => {
    setSetorData('')
    getSetores().then((response) => setSetorData(response.data))
    .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                
  }

  useEffect(() => {
    getCargoData()
    getSetorData()
    loadInputModoEditar()
  }, [])

  return (
    <ScrollView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>

        <View style={{ width: '90%' }}>

          <View>
            <Text style={[styles.labelCadastro]}>
              Nome do Usuário:
            </Text>

            <TextInput
              onChangeText={(txt) => setNome(xt)}
              style={[styles.input, styles.inputCadastro]}
              underlineColorAndroid='transparent'
              value={nome}
            />
          </View>

          <View>
            <Text style={[styles.labelCadastro]}>
              Cargo:
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
              Setor:
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

export default CadastroUsuarioScreen