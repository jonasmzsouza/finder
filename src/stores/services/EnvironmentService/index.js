import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain" 

const URL_AMBIENTE_API = URL_DOMAIN + '/ambiente'

/**
 * Get all environments via API
 * @param {string} jwt
 * @returns {Promise}
 */    
export const getEnvironments = (jwt) => {
  return axios({
    url : URL_AMBIENTE_API,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Get an environment via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
 export const getEnvironment = (jwt, id) => {
  return axios({
    method : 'get',
    url : URL_AMBIENTE_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }    
  })
}

/**
 * Register an environment via API
 * @param {string} jwt
 * @param {int} codigoDispositivo 
 * @param {string} nome 
 * @param {int} codigoSetor 
 * @param {string} nomeLocalizacao 
 * @param {int} andar 
 * @param {int} tamanho 
 * @param {int} numeroProximidade 
 * @returns {Promise}
 */
export const postEnvironment = (jwt, codigoDispositivo, nome, codigoSetor, nomeLocalizacao, andar, tamanho, numeroProximidade) => {
  return axios({
    method : 'post',
    url : URL_AMBIENTE_API,
    headers : {
      'Authorization' : jwt
    },
    data : {
      codigoDispositivo,
      nome,
      codigoSetor,
      nomeLocalizacao,
      andar,
      tamanho,
      numeroProximidade
    }
  })
}

/**
 * 
 * Update an environment via API
 * @param {string} jwt
 * @param {string} id 
 * @param {int} codigoDispositivo 
 * @param {string} nome 
 * @param {int} codigoSetor 
 * @param {string} nomeLocalizacao 
 * @param {int} andar 
 * @param {int} tamanho 
 * @param {int} numeroProximidade 
 * @returns {Promise}
 */
export const putEnvironment = (jwt, id, codigoDispositivo, nome, codigoSetor, nomeLocalizacao, andar, tamanho, numeroProximidade) => {
  return axios({
    method : 'put',
    url : URL_AMBIENTE_API + '/' + id,
    headers : {
      'Authorization' : jwt
    },
    data : {
      codigoDispositivo,
      nome,
      codigoSetor,
      nomeLocalizacao,
      andar,
      tamanho,
      numeroProximidade
    }
  })
}

/**
 * Delete an environment via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteEnvironment = (jwt, id) => {
  return axios({
    method : 'delete',
    url : URL_AMBIENTE_API + '/' + id,
    headers : {
      'Authorization' : jwt
    },
  })
}