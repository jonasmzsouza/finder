import AsyncStorage from "@react-native-async-storage/async-storage";

export const insertObject = async (key, value, callback = null) => {
  try {
    const obj = JSON.stringify(value)
    await AsyncStorage.setItem(key, obj, callback)
  } catch (error) {
    throw new Error('Não foi possível inserir no banco de dados!')
  }
}

export const read = async (key, callback) => {
  try {
    await AsyncStorage.getItem(key, callback)
  } catch (error) {
    throw new Error('Não foi possível ler do banco de dados!')
  }
}

export const remove = async (key, callback) => {
  try {
    await AsyncStorage.removeItem(key, callback)
  } catch (error) {
    throw new Error('Não foi possível remover do banco de dados!')
  }
}

export const insertAuthenticationTokens = (value, callback = null) => {
  insertObject('authentication_tokens', value, callback)
}

export const readAuthenticationTokens = (callback = null) => {
  read('authentication_tokens', callback)
}

export const removeAuthenticationTokens = (callback = null) => {
  remove('authentication_tokens', callback)
}