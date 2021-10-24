import axios from "axios"

import { URL_LOCATOR } from "../../constants/Domain" 

/**
 * Find by a user via API
 * @param {string} id 
 * @returns {Promise}
 */
export const getFindByUser = (id) => {
  return axios({
    method : 'get',
    url : URL_LOCATOR + id + '&localizacao=0&cargo=0'
  })
}