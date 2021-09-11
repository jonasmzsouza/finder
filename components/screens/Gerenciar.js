import React, {
  useState
} from 'react'

import {
  SafeAreaView,
  TextInput,
  View
} from 'react-native'

import {
  Button,
} from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient';

import {
  read,
  readAll,
  remove,
  clear
} from '../../assets/data/Db'

import styles, { linearGradienteColor } from '../../assets/styles/styles'

const Gerenciar = (props) => {

  const { screen } = props.route.params || '';
  const [id, setId] = useState('');

  let prefixo = screen == 'Ambiente' ? 'a' : screen == 'Dispositivo' ? 'd' : ''

  const validarEntrada = () => {
    const numReg = /[^0-9]/g;

    if (id.trim().length == 0 || numReg.test(id)) {
      alert("Infome um id de " + screen)
      return false;
    }

    return true
  }

  const buscar = () => {
    if (validarEntrada()) {
      read(prefixo + "." + id, (error, value) => {
        if (error) {
          alert(screen + ' não encontrado com o id: ' + id)
          setId('')
          return
        }

        let obj = JSON.parse(value)
        if (obj != null && id === obj.codigo) {
          setId('')
          alert(value)
        } else {
          alert(screen + ' não encontrado com o id: ' + id)
          setId('')
          return
        }
      })
    }
  }

  const remover = () => {
    if (validarEntrada()) {
      let idKey = prefixo + "." + id
      read(idKey, (error, value) => {
        if (error) {
          alert(screen + ' não encontrado com o id: ' + id)
          setId('')
          return
        }

        let obj = JSON.parse(value)
        if (obj != null && id === obj.codigo) {
          remove(idKey, (error) => {
            if (error) {
              alert(screen + ' não encontrado com o id: ' + id)
              return
            }
          })
          setId('')
          alert(screen + ' removido com sucesso!')
        } else {
          alert(screen + ' não encontrado com o id: ' + id)
          setId('')
          return
        }
      })
    }

  }

  let dados = []
  let aux = 0
  const listarTodos = () => {

    readAll((error, result) => {
      if (error) {
        alert('Não foi possível retornar todos os registros!')
        return
      }
      dados = []
      result.forEach((element) => {

        read(element, (error2, value) => {
          if (error2) {
            alert('Não foi possível encontrar o elemento ' + element)
            return
          }
          let prefixoDB = element.substr(0, 1)
          if (prefixo === prefixoDB) {
            let obj = JSON.parse(value)
            dados.push(obj)
          }
        })
      })
    })

    // Quando a função "listarTodos" é disparada pelo botão, 
    // por algum motivo um array vazio é retornado no primeiro clique.
    // Então se o async já conter dados cadastrados, o alert de "Não há dados para serem exibidos!" 
    // é exibido e isto não faz sentido... 
    // Então esta condição é para inibir o alert no primeiro clique.
    if (dados.length > 0 && aux == 1) {
      props.navigation.navigate('Listar', {
        screen: screen,
        dados: dados
      })
    } else if (aux == 0) {
      aux += 1
    } else {
      alert("Não há dados para serem exibidos!")
    }

  }

  return (
    <SafeAreaView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>
        <View>

          <TextInput
            keyboardType="numeric"
            onChangeText={(txt) => setId(txt)}
            placeholder="Informe um id"
            style={[styles.input, styles.inputCadastro, { textAlign: 'center' }]}
            underlineColorAndroid='transparent'
            value={id}
          />

          <Button
            buttonStyle={styles.btn}
            onPress={() => {
              buscar()
            }}
            title="Buscar Id"
          />

          <Button
            buttonStyle={styles.btn}
            onPress={() => {
              remover()
            }}
            title="Remover Id"
          />

          <Button
            buttonStyle={styles.btn}
            onPress={() => {
              let dados = listarTodos()

            }}
            title="Listar todos"
          />

          <Button
            buttonStyle={styles.btn}
            onPress={() => {
              clear((error) => {
                if (error) {
                  alert('Não foi possível limpar a base de dados')
                } else {
                  alert('Base de dados resetado com sucesso!')
                  dados = []
                }
              })
            }}
            title="Limpar base de dados"
          />

          <Button
            buttonStyle={styles.btn}
            onPress={() => props.navigation.goBack()}
            title="Voltar"
          />

        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Gerenciar