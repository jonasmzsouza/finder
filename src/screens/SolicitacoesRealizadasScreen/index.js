import React, {
  useState
} from 'react'

import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'

import {
  Button,
} from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient';

import { useFocusEffect } from '@react-navigation/core';

import styles, { linearGradienteColor } from '../../styles/Styles'

const SolicitacoesRealizadasScreen = (props) => {

  useFocusEffect(
    React.useCallback(() => {
      Alert.alert('Atenção!', 'Função está em desenvolvimento. Experimente a seção de cadastro!')
      return () => {
      };
    }, [])
  );   

  return (
    <ScrollView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>
        <View>

          <Text>Em desenvolvimento...</Text>

        </View>
      </LinearGradient>
    </ScrollView>
  )
}

export default SolicitacoesRealizadasScreen