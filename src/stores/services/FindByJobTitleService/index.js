import axios from "axios"

import { URL_LOCATOR } from "../../constants/Domain" 

/**
 * Find by a job title via API
 * @param {string} id 
 * @returns {Promise}
 */
export const getFindByJobTitle = (id) => {
  return axios({
    method : 'get',
    url : URL_LOCATOR + '0&localizacao=0&cargo=' + id,
  })
}