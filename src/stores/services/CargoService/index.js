import axios from "axios"

/**
 * API Documentation: 
 * Opção A: https://plufinderapi.azurewebsites.net/swagger-ui/
 * Opção B: https://plufinderapi.herokuapp.com/swagger-ui/
 */

const URL_CARGO_API = 'https://plufinderapi.herokuapp.com/cargo'

const headers = new Headers()
    headers.append('Content-Type', 'application/json')

/**
 * Lista todos cargos via API
 * @returns {Promise}
 */ 
export const getCargos = () => {
  return axios({
    url : URL_CARGO_API
  })
}

/**
 * Lista um cargo via API
 * @param {string} id 
 * @returns {Promise}
 */
 export const getCargo = (id) => {
  return axios({
    method : 'get',
    url : URL_CARGO_API + '/' + id,
  })
}

/**
 * Cadastra um novo cargo via API
 * @param {string} nome 
 * @returns {Promise}
 */
export const postCargo = (nome) => {
  return axios({
    method : 'post',
    url : URL_CARGO_API,
    headers : headers,
    data : {
      nome
    }
  })
}

/**
 * Atualiza um cargo via API
 * @param {string} id 
 * @param {string} nome
 * @returns {Promise}
 */
 export const putCargo = (id, nome) => {
  return axios({
    method : 'put',
    url : URL_CARGO_API + '/' + id,
    headers : headers,
    data : {
      nome
    }
  })
}

/**
 * Exclui um cargo via API
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteCargo = (id) => {
  return axios({
    method : 'delete',
    url : URL_CARGO_API + '/' + id,
  })
}