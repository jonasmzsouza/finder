import axios from "axios"

/**
 * API Documentation: 
 * Opção A: https://plufinderapi.azurewebsites.net/swagger-ui/
 * Opção B: https://plufinderapi.herokuapp.com/swagger-ui/
 */

const URL_SETOR_API = 'https://plufinderapi.herokuapp.com/setor'

const headers = new Headers()
    headers.append('Content-Type', 'application/json')

/**
 * Lista todos setores via API
 * @returns {Promise}
 */ 
export const getSetores = () => {
  return axios({
    url : URL_SETOR_API
  })
}

/**
 * Lista um setor via API
 * @param {string} id 
 * @returns {Promise}
 */
 export const getSetor = (id) => {
  return axios({
    method : 'get',
    url : URL_SETOR_API + '/' + id,
  })
}

/**
 * Cadastra um novo setor via API
 * @param {string} nome 
 * @returns {Promise}
 */
export const postSetor = (nome) => {
  return axios({
    method : 'post',
    url : URL_SETOR_API,
    headers : headers,
    data : {
      nome
    }
  })
}

/**
 * Atualiza um setor via API
 * @param {string} id 
 * @param {string} nome
 * @returns {Promise}
 */
 export const putSetor = (id, nome) => {
  return axios({
    method : 'put',
    url : URL_SETOR_API + '/' + id,
    headers : headers,
    data : {
      nome
    }
  })
}

/**
 * Exclui um setor via API
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteSetor = (id) => {
  return axios({
    method : 'delete',
    url : URL_SETOR_API + '/' + id,
  })
}