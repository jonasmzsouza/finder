import React, {
  useState
} from 'react'

import {
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'

import {
  Button,
} from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient';

import { insertObject } from '../../../assets/data/Db'

import styles, { linearGradienteColor } from '../../../assets/styles/styles'


const Ambiente = (props) => {

  const [codAmbiente, setCodAmbiente] = useState('');
  const [nomeAmbiente, setNomeAmbiente] = useState('');
  const [setor, setSetor] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [andar, setAndar] = useState('');
  const [tamanho, setTamanho] = useState('');

  const limparCampos = () => {
    setCodAmbiente('');
    setNomeAmbiente('');
    setSetor('');
    setLocalizacao('');
    setAndar('');
    setTamanho('');
  }

  const validarDados = () => {
    const numReg = /[^0-9]/g;

    let erros = [];

    if (codAmbiente.trim().length == 0 || numReg.test(codAmbiente)) {
      erros.push('o código do ambiente');
    }
    if (nomeAmbiente.trim().length == 0) {
      erros.push('o nome do ambiente');
    }
    if (setor.trim().length == 0) {
      erros.push('o setor');
    }
    if (localizacao.trim().length == 0) {
      erros.push('a localização');
    }
    if (andar.trim().length == 0 || numReg.test(andar)) {
      erros.push('o andar');
    }
    if (tamanho.trim().length == 0 || numReg.test(tamanho)) {
      erros.push('o tamanho');
    }
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

  const cadastrar = () => {
    if (validarDados()) {
      let objAmbiente = {
        codigo: codAmbiente,
        nomeAmbiente: nomeAmbiente,
        setor: setor,
        localizacao: localizacao,
        andar: andar,
        tamanho: tamanho
      };

      let ambiente = "a." + codAmbiente

      insertObject(ambiente, objAmbiente, (error) => {
        if (error) {
          alert('Erro ao cadastrar o ambiente');
        } else {
          alert('Ambiente cadastrado com sucesso!');
          limparCampos()
        }
      });
    }
  }

  return (
    <ScrollView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>
        <View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '45%' }}>
              <Text style={[styles.labelCadastro]}>
                Cód. Ambiente:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setCodAmbiente(txt)}
                style={[styles.input, styles.inputCadastro]}
                underlineColorAndroid='transparent'
                value={codAmbiente}
              />
            </View>

            <View style={{ width: '45%' }}>
            </View>
          </View>

          <Text style={[styles.labelCadastro]}>
            Nome do Ambiente:
          </Text>

          <TextInput
            keyboardType="numeric"
            onChangeText={(txt) => setNomeAmbiente(txt)}
            style={[styles.input, styles.inputCadastro]}
            underlineColorAndroid='transparent'
            value={nomeAmbiente}
          />

          <Text style={[styles.labelCadastro]}>
            Setor:
          </Text>

          <TextInput
            onChangeText={(txt) => setSetor(txt)}
            style={[styles.input, styles.inputCadastro]}
            underlineColorAndroid='transparent'
            value={setor}
          />

          <Text style={[styles.labelCadastro]}>
            Localização:
          </Text>

          <TextInput
            onChangeText={(txt) => setLocalizacao(txt)}
            style={[styles.input, styles.inputCadastro]}
            underlineColorAndroid='transparent'
            value={localizacao}
          />


          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '45%' }}>
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

            <View style={{ width: '45%' }}>
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
          </View>

          <View>
            <Button
              buttonStyle={styles.btn}
              onPress={() => cadastrar()}
              title="Cadastrar"
            />
          </View>
          <View >
            <Button
              buttonStyle={styles.btn}
              onPress={() => {
                props.navigation.navigate('Gerenciar', {
                  screen: 'Ambiente',
                })
              }}
              title="Gerenciar"
            />
          </View>

        </View>
      </LinearGradient>
    </ScrollView>
  )
}

export default Ambiente