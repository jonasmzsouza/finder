import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain" 

const URL_SETOR_API = URL_DOMAIN + '/setor'

/**
 * Lista todos setores via API
 * @param {string} jwt
 * @returns {Promise}
 */ 
export const getSetores = (jwt) => {
  return axios({
    url : URL_SETOR_API,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Lista um setor via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
 export const getSetor = (jwt, id) => {
  return axios({
    method : 'get',
    url : URL_SETOR_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Cadastra um novo setor via API
 * @param {string} jwt
 * @param {string} nome 
 * @returns {Promise}
 */
export const postSetor = (jwt, nome) => {
  return axios({
    method : 'post',
    url : URL_SETOR_API,
    headers : {
      'Authorization' : jwt
    },
    data : {
      nome
    }
  })
}

/**
 * Atualiza um setor via API
 * @param {string} jwt
 * @param {string} id 
 * @param {string} nome
 * @returns {Promise}
 */
 export const putSetor = (jwt, id, nome) => {
  return axios({
    method : 'put',
    url : URL_SETOR_API + '/' + id,
    headers : {
      'Authorization' : jwt
    },
    data : {
      nome
    }
  })
}

/**
 * Exclui um setor via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteSetor = (jwt, id) => {
  return axios({
    method : 'delete',
    url : URL_SETOR_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }    
  })
}