import {
  StyleSheet
} from 'react-native'
/*
themaColors[0] -> fundo de botões e header do app, textos da home e icone tab ativo
themaColors[1] -> fundo do botao home e dos inputs
themaColors[2] -> textos dos botões e do header
themaColors[3] -> fundo do botão voltar, 2ª e 3ª cor do linearGradient
themaColors[4] -> fundo da barra de status
themaColors[5] -> sombra dos botões home
themaColors[6] -> icone tab inativo
themaColors[7] -> 1ª cor do linearGradient
*/
export const themaColors = ['#345AA5', '#E9EEFB', '#FFF', '#174182', '#123469', '#000', 'gray', '#fafcff']

export const linearGradienteColor = [themaColors[7], themaColors[2], themaColors[2]]

export default StyleSheet.create({
  btn: {
    backgroundColor: themaColors[0],
    borderRadius: 30,
    height: 45,
    marginTop: 10,
  },
  btnAcessar: {
    width: '100%',
  },
  btnHome: {
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
  btnHomeL: {
    width: 250,
    height: 230,
    marginTop: 15
  },
  btnHomeM: {
    width: 115,
    height: 100,
  },
  btnHomeTxt: {
    color: themaColors[0],
    paddingTop: 15,
    fontWeight: 'bold',
  },
  btnHomeTxtL: {
    fontSize: 20,
  },
  btnHomeTxtM: {
    fontSize: 14,
  },
  btnHomeGroup: {
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
  btnVoltar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themaColors[3],
    width: 60,
    height: '100%',
  },
  btnVoltarTxt: {
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
  input: {
    color: themaColors[0]
  },
  inputCadastro: {
    height: 40,
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
  }
});