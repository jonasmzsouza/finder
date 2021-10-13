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

import {
  Button,
} from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient';

import styles, { linearGradienteColor } from '../../styles/Styles'

import { postCargo, putCargo } from '../../services/CargoService';

const CadastroCargoScreen = (props) => {

  const [nome, setNome] = useState('');
  const { item, modoEditar } = props.route.params || '';

  const limparCampos = () => {
    setNome('');
  }

  const validarDados = () => {

    let erros = [];
    
    if (nome.trim().length == 0)
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

  const loadInputModoEditar = () => {
    if(modoEditar) {
      setNome(item.nome)
    }
  }

  const cadastrar = () => {
    if (validarDados()) {
      postCargo(nome)
        .then(() => {
          Alert.alert('Sucesso', 'Cargo cadastrado com sucesso!')
          limparCampos()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o cargo!'))
    }
  }

  const atualizar = () => {
    if(validarDados()) {
      putCargo(item.id, nome)
        .then(() => {
          Alert.alert('Sucesso', 'Cargo atualizado com sucesso!')
          limparCampos()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o cargo!'))
    }
  }

  useEffect(() => {
    loadInputModoEditar()    
  }, [])    

  return (
    <ScrollView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>

        <View style={{ width: '90%' }}>

          <View>
            <Text style={[styles.labelCadastro]}>
              Nome do Cargo:
            </Text>

            <TextInput
              onChangeText={(txt) => setNome(modoEditar ? item.nome : txt)}
              style={[styles.input, styles.inputCadastro]}
              underlineColorAndroid='transparent'
              value={modoEditar ? item.nome : nome}
            />
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

export default CadastroCargoScreen