import React,{
  useState
} from 'react'

import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View
} from 'react-native'

import { Button } from 'react-native-elements/dist/buttons/Button';

import { useFocusEffect } from '@react-navigation/core';

import LinearGradient from 'react-native-linear-gradient';
import { deleteEnvironment, getEnvironments } from '../../stores/services/EnvironmentService';
import { deleteJobTitle, getJobTitles } from '../../stores/services/JobTitleService';
import { deleteDepartment, getDepartments } from '../../stores/services/DepartmentService';
import { deleteUser, getUsers } from '../../stores/services/UserService';

import styles, { linearGradienteColor, themaColors } from '../../styles/Styles'
import { getHeaderAuthJwt } from '../../stores/actions/Actions';

import { readAuthenticationTokens } from '../../database/Db';

import jwtDecode from 'jwt-decode'

const ListRegistrationItem = (props) => {

  const { screen, title } = props.route.params || '';
  const [itemsData, setItemsData] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [tokens, setTokens] = useState({})
  const [jwt, setJwt] = useState({})

  const getInitialData = (jwt) => {
    setItemsData('')
    setIsRefreshing(true)
    let action

    if (screen === 'Usuario')
      action = getUsers(jwt)
    
    else if (screen === 'Ambiente')
      action = getEnvironments(jwt)
    
    if (screen === 'Cargo')
      action = getJobTitles(jwt)
    
    if (screen === 'Setor')
      action = getDepartments(jwt)

    action
      .then((response) => setItemsData(response.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))
      .finally(() => setIsRefreshing(false))                 
  }

  const editItem = (item) => {
      props.navigation.navigate(screen, {
        screen: screen,
        item: item,
        editMode: true
      }) 
  }

  const deleteItem = (item) => {
    Alert.alert(
      'Atenção',
      'Você realmente deseja excluir este ' + screen + ': ' + item.nome,
      [
        {
          text : 'Sim',
          onPress : () => {
            let action

            if (screen === 'Usuario')
              action = deleteUser(jwt, item.id)
            
            if (screen === 'Ambiente')
              action = deleteEnvironment(jwt, item.id)
            
            if (screen === 'Cargo')
              action = deleteJobTitle(jwt, item.id)
            
            if (screen === 'Setor')
              action = deleteDepartment(jwt, item.id)             

            action
              .then(() => {
                Alert.alert('Sucesso', screen + ' excluído com sucesso!')
                getInitialData(jwt)
              })
              .catch(() => Alert.alert('Erro', 'Não foi possível excluir o ' + screen + '!'))
            
          }
        },
        {
          text : 'Não'
        }
      ]
    )
  }

  useFocusEffect(
    React.useCallback(() => {
      readAuthenticationTokens((error, success) => {
        if ( !error && success && success.length > 0 ) {
          const payload = jwtDecode(success)
          setTokens(success)
          setJwt(getHeaderAuthJwt(success))
          getInitialData(getHeaderAuthJwt(success))
        }
      })
      return () => {
      };
    }, [])
  );  

  return (
    <SafeAreaView style={[styles.container]}>
      <LinearGradient colors={linearGradienteColor} style={styles.linearGradient}>

        { isRefreshing && (
          <Text style={[ styles.label ]}>
            Carregando dados... 
          </Text>
        )}

        { !isRefreshing && itemsData.length === 0 && (
          <Text style={[ styles.label ]}>
            Não há dados para serem exibidos!
          </Text>
        )}        

        <FlatList
          style={{ width: '100%', bottom: '3%' }}
          data={itemsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (

            <View style={[styles.cell]}>

              <View style={{ justifyContent : 'center', width: '70%' }}>
                {screen === 'Usuario' && (
                  <View>
                    <Text style={[styles.listLabel]}>Id do Usuario: {item.id}</Text>
                    {/* <Text style={[styles.listLabel]}>Nro. Dispositivo: {item.nrDispositivo}</Text> */}
                    <Text style={[styles.listLabel]}>Nome do Usuário: {item.nome}</Text>
                    <Text style={[styles.listLabel]}>Cargo: {item.cargo.nome}</Text>
                    <Text style={[styles.listLabel]}>Setor: {item.setor.nome}</Text>
                  </View>
                )}

                {screen === 'Ambiente' && (
                  <View>
                    <Text style={[styles.listLabel]}>Id do Ambiente: {item.id}</Text>
                    <Text style={[styles.listLabel]}>Código do Dispositivo: {item.codigoDispositivo}</Text>
                    <Text style={[styles.listLabel]}>Nome do Ambiente: {item.nome}</Text>
                    <Text style={[styles.listLabel]}>Setor: {item.setor.nome}</Text>
                    <Text style={[styles.listLabel]}>Nome da Localização: {item.nomeLocalizacao}</Text>
                    <Text style={[styles.listLabel]}>Andar: {item.andar}</Text>
                    <Text style={[styles.listLabel]}>Tamanho: {item.tamanho}</Text>
                    <Text style={[styles.listLabel]}>Proximidade: {item.numeroProximidade}</Text>
                  </View>
                )}

                {screen === 'Cargo' && (
                  <View>
                    <Text style={[styles.listLabel]}>Id do Cargo: {item.id}</Text>
                    <Text style={[styles.listLabel]}>Nome do Cargo: {item.nome}</Text>
                  </View>
                )}

                {screen === 'Setor' && (
                  <View>
                    <Text style={[styles.listLabel]}>Id do Setor: {item.id}</Text>
                    <Text style={[styles.listLabel]}>Nome do Setor: {item.nome}</Text>
                  </View>
                )}
              </View>

              <View style={[ styles.btnActionsGroup ]}>
                <Button
                  buttonStyle={[ styles.btn ]}
                  icon={{
                    color : themaColors[2],
                    name : 'edit',
                    type : 'font-awesome-5'
                  }}
                  onPress={() => editItem(item)}
                  title='Editar' />

                <Button
                  buttonStyle={[styles.btnCancel ]}
                  icon={{
                    color : themaColors[2],
                    name : 'trash',
                    type : 'font-awesome-5'
                  }}
                  onPress={() => deleteItem(item)}
                  title='Excluir' />                  
              </View>              

            </View>
            
          )}
          refreshControl={
            <RefreshControl
            onRefresh={ () => getInitialData(jwt)}
            refreshing={ isRefreshing } 
            colors={ [ themaColors[0] ] } />
          }
         />

      </LinearGradient>
    </SafeAreaView>
  )
}

export default ListRegistrationItem