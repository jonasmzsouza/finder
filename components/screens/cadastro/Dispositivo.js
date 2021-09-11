import React, {
  useState
} from 'react'

import {
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native'

import {
  Button,
} from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient';

import { insertObject } from '../../../assets/data/Db'

import styles, { linearGradienteColor } from '../../../assets/styles/styles'


const Dispositivo = (props) => {

  const [codDispositivo, setCodDispositivo] = useState('');
  const [codUsuario, setCodUsuario] = useState('');
  const [nomeFuncionario, setNomeFuncionario] = useState('');
  const [setor, setSetor] = useState('');
  const [funcao, setFuncao] = useState('');

  const limparCampos = () => {
    setCodDispositivo('');
    setCodUsuario('');
    setNomeFuncionario('');
    setSetor('');
    setFuncao('');
  }

  const validarDados = () => {
    const numReg = /[^0-9]/g;

    let erros = [];

    if (codDispositivo.trim().length == 0 || numReg.test(codDispositivo))
      erros.push('o código do dispositivo');

    if (codUsuario.trim().length == 0 || numReg.test(codUsuario))
      erros.push('o código do usuário');

    if (nomeFuncionario.trim().length == 0)
      erros.push('o nome do funcionario');

    if (setor.trim().length == 0)
      erros.push('o setor');

    if (funcao.trim().length == 0)
      erros.push('a função');

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
      let objDispositivo = {
        codigo: codDispositivo,
        codUsuario: codUsuario,
        nomeFuncionario: nomeFuncionario,
        setor: setor,
        funcao: funcao
      };

      let dispositivo = "d." + codDispositivo;

      insertObject(dispositivo, objDispositivo, (error) => {
        if (error) {
          alert('Erro ao cadastrar o dispositivo');
        } else {
          alert('Dispositivo cadastrado com sucesso!');
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
                Cód. Dispositivo:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setCodDispositivo(txt)}
                style={[styles.input, styles.inputCadastro]}
                underlineColorAndroid='transparent'
                value={codDispositivo}
              />
            </View>

            <View style={{ width: '45%' }}>
              <Text style={[styles.labelCadastro]}>
                Cód. Usuário:
              </Text>

              <TextInput
                keyboardType="numeric"
                onChangeText={(txt) => setCodUsuario(txt)}
                style={[styles.input, styles.inputCadastro]}
                underlineColorAndroid='transparent'
                value={codUsuario}
              />
            </View>
          </View>

          <View>
            <Text style={[styles.labelCadastro]}>
              Nome do Funcionário:
            </Text>

            <TextInput
              onChangeText={(txt) => setNomeFuncionario(txt)}
              style={[styles.input, styles.inputCadastro]}
              underlineColorAndroid='transparent'
              value={nomeFuncionario}
            />
          </View>

          <View>
            <Text style={[styles.labelCadastro]}>
              Setor:
            </Text>

            <TextInput
              onChangeText={(txt) => setSetor(txt)}
              style={[styles.input, styles.inputCadastro]}
              underlineColorAndroid='transparent'
              value={setor}
            />
          </View>

          <View>
            <Text style={[styles.labelCadastro]}>
              Função:
            </Text>

            <TextInput
              onChangeText={(txt) => setFuncao(txt)}
              style={[styles.input, styles.inputCadastro]}
              underlineColorAndroid='transparent'
              value={funcao}
            />
          </View>

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
                props.navigation.navigate('Gerenciar', {
                  screen: 'Dispositivo',
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

export default Dispositivo