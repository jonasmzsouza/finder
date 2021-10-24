import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain"

const URL_CARGO_API = URL_DOMAIN + '/cargo'

/**
 * Get all job titles via API
 * @param {string} jwt
 * @returns {Promise}
 */ 
export const getJobTitles = (jwt) => {
  return axios({
    url : URL_CARGO_API,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Get a jog title via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
 export const getJobTitle = (jwt, id) => {
  return axios({
    method : 'get',
    url : URL_CARGO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Register a job title via API
 * @param {string} jwt
 * @param {string} nome 
 * @returns {Promise}
 */
export const postJobTitle = (jwt, nome) => {
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
 * Update a job title via API
 * @param {string} jwt
 * @param {string} id 
 * @param {string} nome
 * @returns {Promise}
 */
 export const putJobTitle = (jwt, id, nome) => {
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
 * Delete a job title via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteJobTitle = (jwt, id) => {
  return axios({
    method : 'delete',
    url : URL_CARGO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }    
  })
}