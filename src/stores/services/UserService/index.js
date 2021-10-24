import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain" 

const URL_USUARIO_API = URL_DOMAIN + '/usuario'

/**
 * Get all users via API
 * @param {string} jwt
 * @returns {Promise}
 */ 
export const getUsers = (jwt) => {
  return axios({
    url : URL_USUARIO_API,
    headers : {
      'Authorization' : jwt
    },    
  })
}

/**
 * Get a user via API
 * @param {string} jwt 
 * @param {string} id 
 * @returns {Promise}
 */
 export const getUser = (jwt, id) => {
  return axios({
    method : 'get',
    url : URL_USUARIO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    },    
  })
}

/**
 * Register a user via API
 * @param {string} jwt
 * @param {string} nome 
 * @param {int} idCargo 
 * @param {int} idSetor 
 * @returns {Promise}
 */
export const postUser = (jwt, nome, idCargo, idSetor) => {
  return axios({
    method : 'post',
    url : URL_USUARIO_API,
    headers : {
      'Authorization' : jwt
    },
    data : {
      nome,
      idCargo,
      idSetor
    }
  })
}

/**
 * Update a user via API
 * @param {string} jwt
 * @param {string} id 
 * @param {string} nome 
 * @param {int} idCargo 
 * @param {int} idSetor 
 * @returns {Promise}
 */
 export const putUser = (jwt, id, nome, idCargo, idSetor) => {
  return axios({
    method : 'put',
    url : URL_USUARIO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    },
    data : {
      nome,
      idCargo,
      idSetor
    }
  })
}

/**
 * Delete a user via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteUser = (jwt, id) => {
  return axios({
    method : 'delete',
    url : URL_USUARIO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }    
  })
}