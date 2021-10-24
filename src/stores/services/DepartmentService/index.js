import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain" 

const URL_SETOR_API = URL_DOMAIN + '/setor'

/**
 * Get all departments via API
 * @param {string} jwt
 * @returns {Promise}
 */ 
export const getDepartments = (jwt) => {
  return axios({
    url : URL_SETOR_API,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Get a department via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
 export const getDepartment = (jwt, id) => {
  return axios({
    method : 'get',
    url : URL_SETOR_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Register a department via API
 * @param {string} jwt
 * @param {string} nome 
 * @returns {Promise}
 */
export const postDepartment = (jwt, nome) => {
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
 * Update a department via API
 * @param {string} jwt
 * @param {string} id 
 * @param {string} nome
 * @returns {Promise}
 */
 export const putDepartment = (jwt, id, nome) => {
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
 * Delete a department via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteDepartment = (jwt, id) => {
  return axios({
    method : 'delete',
    url : URL_SETOR_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }    
  })
}