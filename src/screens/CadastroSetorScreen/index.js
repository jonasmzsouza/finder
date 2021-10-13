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

import { postSetor, putSetor } from '../../services/SetorService';

const CadastroSetorScreen = (props) => {

  const [nome, setNome] = useState('');
  const { item, modoEditar } = props.route.params || '';

  const limparCampos = () => {
    setNome('');
  }

  const validarDados = () => {

    let erros = [];
    
    if (nome.trim().length == 0)
      erros.push('o nome do setor');

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
      postSetor(nome)
        .then(() => {
          Alert.alert('Sucesso', 'Setor cadastrado com sucesso!')
          limparCampos()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o setor!'))
    }
  }

  const atualizar = () => {
    if(validarDados()) {
      putSetor(item.id, nome)
        .then(() => {
          Alert.alert('Sucesso', 'Setor atualizado com sucesso!')
          limparCampos()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o setor!'))
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
              Nome do Setor:
            </Text>

            <TextInput
              onChangeText={(txt) => setNome(txt)}
              style={[styles.input, styles.inputCadastro]}
              underlineColorAndroid='transparent'
              value={nome}
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

export default CadastroSetorScreen