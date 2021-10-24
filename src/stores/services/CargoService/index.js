import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain"

const URL_CARGO_API = URL_DOMAIN + '/cargo'

/**
 * Lista todos cargos via API
 * @param {string} jwt
 * @returns {Promise}
 */ 
export const getCargos = (jwt) => {
  return axios({
    url : URL_CARGO_API,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Lista um cargo via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
 export const getCargo = (jwt, id) => {
  return axios({
    method : 'get',
    url : URL_CARGO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Cadastra um novo cargo via API
 * @param {string} jwt
 * @param {string} nome 
 * @returns {Promise}
 */
export const postCargo = (jwt, nome) => {
  return axios({
    method : 'post',
    url : URL_CARGO_API,
    headers : {
      'Authorization' : jwt
    },
    data : {
      nome
    }
  })
}

/**
 * Atualiza um cargo via API
 * @param {string} jwt
 * @param {string} id 
 * @param {string} nome
 * @returns {Promise}
 */
 export const putCargo = (jwt, id, nome) => {
  return axios({
    method : 'put',
    url : URL_CARGO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    },
    data : {
      nome
    }
  })
}

/**
 * Exclui um cargo via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteCargo = (jwt, id) => {
  return axios({
    method : 'delete',
    url : URL_CARGO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }    
  })
}