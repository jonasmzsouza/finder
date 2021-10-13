import React,{
  useEffect, 
  useState
} from 'react'

import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button';

import LinearGradient from 'react-native-linear-gradient';
import { deleteAmbiente, getAmbientes } from '../../services/AmbienteService';
import { deleteCargo, getCargos } from '../../services/CargoService';
import { deleteSetor, getSetores } from '../../services/SetorService';
import { deleteUsuario, getUsuarios } from '../../services/UsuarioService';

import styles, { linearGradienteColor, themaColors } from '../../styles/Styles'

const ListarItemCadastro = (props) => {

  const { screen, title } = props.route.params || '';

  const [itemsData, setItemsData] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getInititalData = () => {
    setItemsData('')
    setIsRefreshing(true)
    let itemAction

    if (screen === 'Usuario')
      itemAction = getUsuarios()
    
    else if (screen === 'Ambiente')
      itemAction = getAmbientes()
    
    if (screen === 'Cargo')
      itemAction = getCargos()
    
    if (screen === 'Setor')
      itemAction = getSetores()

    itemAction
    .then((response) => setItemsData(response.data))
    .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))
    .finally(() => setIsRefreshing(false))                 
  }

  useEffect(() => {
    getInititalData()
  }, [])

  const editarItem = (item) => {
      props.navigation.navigate(screen, {
        screen: screen,
        item: item,
        modoEditar: true
      }) 
  }

  const excluirItem = (id) => {
    Alert.alert(
      'Atenção',
      'Você realmente deseja excluir este ' + screen + ':',
      [
        {
          text : 'Sim',
          onPress : () => {
            let itemAction

            if (screen === 'Usuario')
              itemAction = deleteUsuario(id)
            
            if (screen === 'Ambiente')
              itemAction = deleteAmbiente(id)
            
            if (screen === 'Cargo')
              itemAction = deleteCargo(id)
            
            if (screen === 'Setor')
              itemAction = deleteSetor(id)             

            itemAction
            .then(() => {
              Alert.alert('Sucesso', screen + ' excluído com sucesso!')
              getInititalData()
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

            <View style={[styles.celula]}>

              <View style={{ justifyContent : 'center', width: '70%' }}>
                {screen === 'Usuario' && (
                  <View>
                    <Text>Id do Usuario: {item.id}</Text>
                    {/* <Text>Nro. Dispositivo: {item.nrDispositivo}</Text> */}
                    <Text>Nome do Usuário: {item.nome}</Text>
                    <Text>Cargo: {item.cargo.nome}</Text>
                    <Text>Setor: {item.setor.nome}</Text>
                  </View>
                )}

                {screen === 'Ambiente' && (
                  <View>
                    <Text>Id do Ambiente: {item.id}</Text>
                    <Text>Código do Dispositivo: {item.codigoDispositivo}</Text>
                    <Text>Nome do Ambiente: {item.nome}</Text>
                    <Text>Setor: {item.setor.nome}</Text>
                    <Text>Nome da Localização: {item.nomeLocalizacao}</Text>
                    <Text>Andar: {item.andar}</Text>
                    <Text>Tamanho: {item.tamanho}</Text>
                    <Text>Proximidade: {item.numeroProximidade}</Text>
                  </View>
                )}

                {screen === 'Cargo' && (
                  <View>
                    <Text>Id do Cargo: {item.id}</Text>
                    <Text>Nome do Cargo: {item.nome}</Text>
                  </View>
                )}

                {screen === 'Setor' && (
                  <View>
                    <Text>Id do Setor: {item.id}</Text>
                    <Text>Nome do Setor: {item.nome}</Text>
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
                  onPress={() => editarItem(item)}
                  title='Editar' />

                <Button
                  buttonStyle={[styles.btnCancelar ]}
                  icon={{
                    color : themaColors[2],
                    name : 'trash',
                    type : 'font-awesome-5'
                  }}
                  onPress={() => excluirItem(item.id)}
                  title='Excluir' />                  
              </View>              

            </View>
            
          )}
          refreshControl={
            <RefreshControl
            onRefresh={ () => getInititalData()}
            refreshing={ isRefreshing } 
            colors={ [ themaColors[0] ] } />
          }
         />

      </LinearGradient>
    </SafeAreaView>
  )
}

export default ListarItemCadastro