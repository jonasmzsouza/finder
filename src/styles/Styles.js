import {
  StyleSheet
} from 'react-native'
/*
themaColors[0] -> fundo de botões e header do app, textos da home e icone tab ativo
themaColors[1] -> fundo do botao home e dos inputs
themaColors[2] -> textos dos botões e do header. 2ª cor do linearGradient.
themaColors[3] -> fundo do botão voltar. 
themaColors[4] -> fundo da barra de status
themaColors[5] -> sombra dos botões home
themaColors[6] -> icone tab inativo
themaColors[7] -> 1ª cor do linearGradient
themaColors[8] -> fundo do botão excluir item
*/
export const themaColors = [
  '#345AA5', 
  '#E9EEFB', 
  '#FFF', 
  '#174182', 
  '#123469', 
  '#000', 
  '#808080', 
  '#f0f8ff',
  '#F00',
  '#EEBE44',
  '#48B009',
  '#D2A1A1',
  '#FDDA82',
  '#A2D2A1'
]

export const linearGradienteColor = [themaColors[7], themaColors[2]]

export default StyleSheet.create({
  boxLocalizar: {
    position: 'absolute', 
    bottom : 0, 
    width: '100%', 
    height: 170,
    marginTop: 20,
    paddingVertical: 5,
    borderTopStartRadius: 30, 
    borderTopEndRadius: 30,
    alignItems: 'center',
  },
  boxEncontrado: {
    width: '80%',
    height: 80,
    marginTop: 5,
    padding: 10, 
    backgroundColor: '#FFF', 
    borderRadius: 10,
    shadowOffset: { width: 20, height: 20 },
    shadowColor: themaColors[5],
    shadowOpacity: 1,
    shadowRadius: 5,
    opacity: 1    
  },
  boxEncontradoHeader: {
    width: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  boxEncontradoHeaderTxt: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  btn: {
    backgroundColor: themaColors[0],
    borderRadius: 30,
    height: 45,
    marginTop: 10,
  },
  btnAcessar: {
    width: '100%',
  },
  btnActionsGroup: {
    width: '30%', 
    justifyContent : 'center'
  },
  btnCancelar:{
    backgroundColor: themaColors[8],
    borderRadius: 30,
    height: 45,
    marginTop: 10,
  },
  btnCloseBoxContanier: {
    position: 'absolute', 
    right: '5%'
  },
  btnCloseBoxTxt: {
    fontSize: 28, 
    lineHeight: 30
  },
  btnHomeScreen: {
    backgroundColor: themaColors[1],
    padding: 16,
    borderRadius: 5,
    elevation: 5,
    shadowOffset: { width: 20, height: 20 },
    shadowColor: themaColors[5],
    shadowOpacity: 1,
    shadowRadius: 5,
    opacity: 1
  },
  btnHomeScreenL: {
    width: 250,
    height: 230,
    marginTop: 15
  },
  btnHomeScreenM: {
    width: 115,
    height: 100,
  },
  btnHomeScreenTxt: {
    color: themaColors[0],
    paddingTop: 15,
    fontWeight: 'bold',
  },
  btnHomeScreenTxtL: {
    fontSize: 20,
  },
  btnHomeScreenTxtM: {
    fontSize: 14,
  },
  btnHomeScreenGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  btnSair: {
    fontSize: 40,
    color: themaColors[0],
    fontWeight: 'bold',
    width: 30,
    height: '100%',
    marginLeft: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themaColors[3],
    width: 60,
    height: '100%',
  },
  btnHeaderTxt: {
    color: themaColors[2],
    fontSize: 16,
    fontWeight: 'bold'
  },
  celula: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: themaColors[1],
    flexDirection: 'row'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    fontSize: 16,
    flex: 1,
    backgroundColor: themaColors[2]
  },
  containerRadioGroup: {
    width: '90%',
    alignItems: 'flex-start'
  },
  content: {
    flex: 1, 
    width: '100%'
  },
  contentItem:{
    paddingHorizontal : '5%'
  },
  input: {
    color: themaColors[0]
  },
  inputCadastro: {
    height: 45,
    backgroundColor: themaColors[1],
    borderRadius: 30,
    padding: 10,
    marginBottom: 5
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themaColors[0],
    textAlign: 'center',
    marginTop: 20,
  },
  labelCadastro: {
    fontSize: 14,
    fontWeight: 'bold',
    color: themaColors[0],
    margin: 5
  },
  labelRadioButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    paddingTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    backgroundColor: themaColors[1],
    width: '80%',
    height: 250,
    justifyContent: 'center',
    borderRadius: 10
  },
  respostaTxt: {
    fontWeight: 'bold'
  },
  selectCadastroView: {
    height: 45,
    borderRadius: 30,
    marginBottom: 5,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  selectCadastroPicker: {
    color: themaColors[0], 
    backgroundColor: themaColors[1]
  }  
});