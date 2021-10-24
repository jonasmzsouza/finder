import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain" 

const URL_LOGIN_API = URL_DOMAIN + '/auth'

/**
 * Efetua login via API
 * @param {string} email 
 * @param {string} senha
 * @returns {Promise}
 */
 export const login = (email, senha) => {
  return axios({
    method : 'post',
    url : URL_LOGIN_API,
    data : { 
      username : email,
      password : senha 
    }
  })
}