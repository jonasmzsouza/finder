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

import { getCargos } from '../../stores/services/CargoService';
import { getSetores } from '../../stores/services/SetorService';
import { postUsuario, putUsuario } from '../../stores/services/UsuarioService';
import { getItems, getHeaderAuthJwt } from '../../stores/actions/Actions';

import { readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const CadastroUsuarioScreen = (props) => {

  const [nome, setNome] = useState('');
  const [cargoData, setCargoData] = useState('');
  const [setorData, setSetorData] = useState('');
  const [selectedCargo, setSelectedCargo] = useState(0);
  const [selectedSetor, setSelectedSetor] = useState(0);
  const { item, modoEditar } = props.route.params || '';
  const [tokens, setTokens] = useState({})
  const [jwt, setJwt] = useState({})
  
  const limparCampos = () => {
    setNome('');
    setSelectedCargo(0);
    setSelectedSetor(0);
  }

  const loadInputModoEditar = () => {
    if(modoEditar) {
      setNome(item.nome)
      setSelectedCargo(item.cargo.id)
      setSelectedSetor(item.setor.id)
    }
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

  const cadastrar = () => {
    if (validarDados()) {
      postUsuario(jwt, nome, selectedCargo, selectedSetor)
        .then(() => {
          Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!')
          limparCampos()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o usuário!'))
    }
  }

  const atualizar = () => {
    if(validarDados()) {
      putUsuario(jwt, item.id, nome, selectedCargo, selectedSetor)
        .then(() => {
          Alert.alert('Sucesso', 'Usuário atualizado com sucesso!')
          limparCampos()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o usuário!'))
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
          getCargoData(getHeaderAuthJwt(success))
          getSetorData(getHeaderAuthJwt(success))
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
              Nome do Usuário:
            </Text>

            <TextInput
              onChangeText={(txt) => setNome(txt)}
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