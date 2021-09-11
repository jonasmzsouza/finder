import React from 'react'

import {
  FlatList,
  SafeAreaView,
  Text,
  View
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import styles, { linearGradienteColor } from '../../assets/styles/styles'

const Listar = (props) => {

  const { screen, dados } = props.route.params || '';

  return (
    <SafeAreaView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>
        <FlatList
          style={{ width: '100%', bottom: '3%' }}
          data={dados}
          keyExtractor={(item) => item.codigo.toString()}
          renderItem={({ item }) => (

            <View style={[styles.celula]}>

              {screen === 'Dispositivo' && (
                <View>
                  <Text>Cód. Dispositivo: {item.codigo}</Text>
                  <Text>Cód. Usuário: {item.codUsuario}</Text>
                  <Text>Nome do Funcionário: {item.nomeFuncionario}</Text>
                  <Text>Setor: {item.setor}</Text>
                  <Text>Função: {item.funcao}</Text>
                </View>
              )}

              {screen === 'Ambiente' && (
                <View>
                  <Text>Cód. Ambiente: {item.codigo}</Text>
                  <Text>Nome do Ambiente: {item.nomeAmbiente}</Text>
                  <Text>Setor: {item.setor}</Text>
                  <Text>Localização: {item.localizacao}</Text>
                  <Text>Andar: {item.andar}</Text>
                  <Text>Tamanho: {item.tamanho}</Text>
                </View>
              )}

            </View>
          )} />

      </LinearGradient>
    </SafeAreaView>
  )
}

export default Listar