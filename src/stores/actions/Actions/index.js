import React from 'react'

import { Picker } from "@react-native-picker/picker"

import styles, { themaColors } from '../../../styles/Styles'

export const getItems = (itemData) => {
  let items = []
  items.push(<Picker.Item key={0} label="Selecione..." value={0} />)
  for (let i=0; i<itemData.length; i++) {
    items.push(<Picker.Item key={itemData[i].id} label={itemData[i].nome} value={itemData[i].id} />)
  }
  return items
}

export const radioButtonsData = [{
    id: '1',
    label: 'Emergência extrema',
    value: 'emergenciaextrema',
    borderColor: themaColors[8],
    color: themaColors[8],
    labelStyle : [styles.labelRadioButton, {color: themaColors[8]}],
    selected: false
  }, {
    id: '2',
    label: 'Emergência',
    value: 'emergencia',
    borderColor: themaColors[9],
    color: themaColors[9],
    labelStyle : [styles.labelRadioButton, {color: themaColors[9]}],
    selected: false
  }, {
    id: '3',
    label: 'Chamado simples',
    value: 'chamadosimples',
    borderColor: themaColors[10],
    color: themaColors[10],
    labelStyle : [styles.labelRadioButton, {color: themaColors[10]}],
    selected: false
  }]
