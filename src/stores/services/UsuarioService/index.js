import axios from "axios"

/**
 * API Documentation: 
 * Opção A: https://plufinderapi.azurewebsites.net/swagger-ui/
 * Opção B: https://plufinderapi.herokuapp.com/swagger-ui/
 */

const URL_USUARIO_API = 'https://plufinderapi.herokuapp.com/usuario'

const headers = new Headers()
    headers.append('Content-Type', 'application/json')

/**
 * Lista todos usuários via API
 * @returns {Promise}
 */ 
export const getUsuarios = () => {
  return axios({
    url : URL_USUARIO_API
  })
}

/**
 * Lista um usuário via API
 * @param {string} id 
 * @returns {Promise}
 */
 export const getUsuario = (id) => {
  return axios({
    method : 'get',
    url : URL_USUARIO_API + '/' + id,
  })
}

/**
 * Cadastra um novo usuário via API
 * @param {string} nome 
 * @param {int} idCargo 
 * @param {int} idSetor 
 * @returns {Promise}
 */
export const postUsuario = (nome, idCargo, idSetor) => {
  return axios({
    method : 'post',
    url : URL_USUARIO_API,
    headers : headers,
    data : {
      nome,
      idCargo,
      idSetor
    }
  })
}

/**
 * Atualiza um usuário via API
 * @param {string} id 
 * @param {string} nome 
 * @param {int} idCargo 
 * @param {int} idSetor 
 * @returns {Promise}
 */
 export const putUsuario = (id, nome, idCargo, idSetor) => {
  return axios({
    method : 'put',
    url : URL_USUARIO_API + '/' + id,
    headers : headers,
    data : {
      nome,
      idCargo,
      idSetor
    }
  })
}

/**
 * Exclui um usuário via API
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteUsuario = (id) => {
  return axios({
    method : 'delete',
    url : URL_USUARIO_API + '/' + id,
  })
}