import React, {
  useEffect,
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

import styles, { linearGradienteColor } from '../../styles/Styles'

import { getSetores } from '../../services/SetorService';
import { postAmbiente, putAmbiente } from '../../services/AmbienteService';

const CadastroAmbienteScreen = (props) => {

  const [codigoDispositivo, setCodigoDispositivo] = useState('');
  const [nome, setNome] = useState('');
  const [setorData, setSetorData] = useState('');
  const [selectedSetor, setSelectedSetor] = useState(0);  
  const [nomeLocalizacao, setNomeLocalizacao] = useState('');
  const [andar, setAndar] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [numeroProximidade, setNumeroProximidade] = useState('');
  const { item, modoEditar } = props.route.params || '';

  const limparCampos = () => {
    setCodigoDispositivo('');
    setNome('');
    setSelectedSetor(0);
    setNomeLocalizacao('');
    setAndar('');
    setTamanho('');
    setNumeroProximidade('');
  }

  const validarDados = () => {
    const numReg = /[^0-9]/g;

    let erros = [];

    if (codigoDispositivo.trim().length == 0 || numReg.test(codigoDispositivo))
      erros.push('o código do dispositivo');

    if (nome.trim().length == 0)
      erros.push('o nome do ambiente');

    if (selectedSetor === 0 || selectedSetor === undefined)
      erros.push('o setor');

    if (nomeLocalizacao.trim().length == 0)
      erros.push('o nome da localização');

    if (andar.trim().length == 0 || numReg.test(andar))
      erros.push('o número do andar');

    if (tamanho.trim().length == 0 || numReg.test(tamanho))
      erros.push('o número do tamanho');

    if (numeroProximidade.trim().length == 0 || numReg.test(numeroProximidade))
      erros.push('o número da proximidade');

    if (erros.length > 0) {
      let mensagemErro = '';
      erros.forEach(element => {
        mensagemErro += '\n - ' + element
      });

      alert("Informe corretamente:" + mensagemErro);
      return false;
    }

    return true
  }

  const loadInputModoEditar = () => {
    if(modoEditar) {
      setNome(item.nome)
      setSelectedSetor(item.setor.id)
    }
  }

  const cadastrar = () => {
    if (validarDados()) {
      postAmbiente(codigoDispositivo, nome, selectedSetor, nomeLocalizacao, andar, tamanho, numeroProximidade)
      .then(() => {
        Alert.alert('Sucesso', 'Ambiente cadastrado com sucesso!')
        limparCampos()
      })
      .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o ambiente!'))
    }
  }

  const atualizar = () => {
    if(validarDados()) {
      putAmbiente(item.id, codigoDispositivo, nome, selectedSetor, nomeLocalizacao, andar, tamanho, numeroProximidade)
        .then(() => {
          Alert.alert('Sucesso', 'Ambiente atualizado com sucesso!')
          limparCampos()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o ambiente!'))
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

  const getSetorData = () => {
    setSetorData('')
    getSetores().then((response) => setSetorData(response.data))
    .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))                 
  }

  useEffect(() => {
    getSetorData()
    loadInputModoEditar()    
  }, [])  

  return (
    <ScrollView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>
        <View style={{ width: '90%' }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{ width: '45%' }}>
              <Text style={[styles.labelCadastro]}>
                Código do Dispositivo:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setCodigoDispositivo(txt)}
                style={[styles.input, styles.inputCadastro]}
                underlineColorAndroid='transparent'
                value={codigoDispositivo}
              />
            </View>

          </View>

          <Text style={[styles.labelCadastro]}>
            Nome do Ambiente:
          </Text>

          <TextInput
            onChangeText={(txt) => setNome(txt)}
            style={[styles.input, styles.inputCadastro]}
            underlineColorAndroid='transparent'
            value={nome}
          />

          <Text style={[styles.labelCadastro]}>
            Setor:
          </Text>

          <View style={[styles.selectCadastroView]}>
            <Picker
              style={[styles.selectCadastroPicker]}
              selectedValue={selectedSetor}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSetor(itemValue)
              }>
              
              { getItems(setorData) }
                
            </Picker>
          </View>

          <Text style={[styles.labelCadastro]}>
            Nome da Localização:
          </Text>

          <TextInput
            onChangeText={(txt) => setNomeLocalizacao(txt)}
            style={[styles.input, styles.inputCadastro]}
            underlineColorAndroid='transparent'
            value={nomeLocalizacao}
          />


          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '30%' }}>
              <Text style={[styles.labelCadastro]}>
                Andar:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setAndar(txt)}
                style={[styles.input, styles.inputCadastro]}
                underlineColorAndroid='transparent'
                value={andar}
              />
            </View>

            <View style={{ width: '30%' }}>
              <Text style={[styles.labelCadastro]}>
                Tamanho:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setTamanho(txt)}
                style={[styles.input, styles.inputCadastro]}
                underlineColorAndroid='transparent'
                value={tamanho}
              />
            </View>

            <View style={{ width: '30%' }}>
              <Text style={[styles.labelCadastro]}>
                Proximidade:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setNumeroProximidade(txt)}
                style={[styles.input, styles.inputCadastro]}
                underlineColorAndroid='transparent'
                value={numeroProximidade}
              />
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

export default CadastroAmbienteScreen