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

import styles, { linearGradienteColor } from '../../styles/Styles'

const LocalizarPorCargoScreen = (props) => {

  return (
    <ScrollView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>
        <View>

          

        </View>
      </LinearGradient>
    </ScrollView>
  )
}

export default LocalizarPorCargoScreen