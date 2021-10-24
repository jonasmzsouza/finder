import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain" 

const URL_USUARIO_API = URL_DOMAIN + '/usuario'

/**
 * Lista todos usuários via API
 * @param {string} jwt
 * @returns {Promise}
 */ 
export const getUsuarios = (jwt) => {
  return axios({
    url : URL_USUARIO_API,
    headers : {
      'Authorization' : jwt
    },    
  })
}

/**
 * Lista um usuário via API
 * @param {string} jwt 
 * @param {string} id 
 * @returns {Promise}
 */
 export const getUsuario = (jwt, id) => {
  return axios({
    method : 'get',
    url : URL_USUARIO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    },    
  })
}

/**
 * Cadastra um novo usuário via API
 * @param {string} jwt
 * @param {string} nome 
 * @param {int} idCargo 
 * @param {int} idSetor 
 * @returns {Promise}
 */
export const postUsuario = (jwt, nome, idCargo, idSetor) => {
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
 * Atualiza um usuário via API
 * @param {string} jwt
 * @param {string} id 
 * @param {string} nome 
 * @param {int} idCargo 
 * @param {int} idSetor 
 * @returns {Promise}
 */
 export const putUsuario = (jwt, id, nome, idCargo, idSetor) => {
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
 * Exclui um usuário via API
 * @param {string} jwt
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteUsuario = (jwt, id) => {
  return axios({
    method : 'delete',
    url : URL_USUARIO_API + '/' + id,
    headers : {
      'Authorization' : jwt
    }    
  })
}