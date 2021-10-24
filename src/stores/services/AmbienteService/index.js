import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain" 

const URL_AMBIENTE_API = URL_DOMAIN + '/ambiente'

/**
 * Lista todos ambientes via API
 * @param {string} jwt
 * @returns {Promise}
 */    
export const getAmbientes = (jwt) => {
  return axios({
    url : URL_AMBIENTE_API,
    headers : {
      'Authorization' : jwt
    }
  })
}

/**
 * Lista um ambiente via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
 export const getAmbiente = (jwt, id) => {
  return axios({
    method : 'get',
    url : URL_AMBIENTE_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }    
  })
}

/**
 * Cadastra um novo ambiente via API
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
export const postAmbiente = (jwt, codigoDispositivo, nome, codigoSetor, nomeLocalizacao, andar, tamanho, numeroProximidade) => {
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
 * Atualiza um ambiente via API
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
export const putAmbiente = (jwt, id, codigoDispositivo, nome, codigoSetor, nomeLocalizacao, andar, tamanho, numeroProximidade) => {
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
 * Exclui um ambiente via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteAmbiente = (jwt, id) => {
  return axios({
    method : 'delete',
    url : URL_AMBIENTE_API + '/' + id,
    headers : {
      'Authorization' : jwt
    },
  })
}