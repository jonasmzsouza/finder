import axios from "axios"

import { URL_LOCATOR } from "../../constants/Domain" 

/**
 * Localizar um usuário via API
 * @param {string} id 
 * @returns {Promise}
 */
export const getLocalizarPorUsuario = (id) => {
  return axios({
    method : 'get',
    url : URL_LOCATOR + id + '&localizacao=0&cargo=0'
  })
}