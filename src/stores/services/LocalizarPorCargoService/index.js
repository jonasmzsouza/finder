import axios from "axios"

import { URL_LOCATOR } from "../../constants/Domain" 

/**
 * Localizar um usuário via API
 * @param {string} id 
 * @returns {Promise}
 */
export const getLocalizarPorCargo = (id) => {
  return axios({
    method : 'get',
    url : URL_LOCATOR + '0&localizacao=0&cargo=' + id,
  })
}