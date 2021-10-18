import axios from "axios"

/**
 * API Documentation: 
 * Opção A: https://plufinderapi.azurewebsites.net/swagger-ui/
 * Opção B: https://plufinderapi.herokuapp.com/swagger-ui/
 */

const URL_AMBIENTE_API = 'https://plufinderapi.herokuapp.com/ambiente'

const headers = new Headers()
    headers.append('Content-Type', 'application/json')

/**
 * Lista todos ambientes via API
 * @returns {Promise}
 */    
export const getAmbientes = () => {
  return axios({
    url : URL_AMBIENTE_API
  })
}

/**
 * Lista um ambiente via API
 * @param {string} id 
 * @returns {Promise}
 */
 export const getAmbiente = (id) => {
  return axios({
    method : 'get',
    url : URL_AMBIENTE_API + '/' + id,
  })
}

/**
 * Cadastra um novo ambiente via API
 * @param {int} codigoDispositivo 
 * @param {string} nome 
 * @param {int} codigoSetor 
 * @param {string} nomeLocalizacao 
 * @param {int} andar 
 * @param {int} tamanho 
 * @param {int} numeroProximidade 
 * @returns {Promise}
 */
export const postAmbiente = (codigoDispositivo, nome, codigoSetor, nomeLocalizacao, andar, tamanho, numeroProximidade) => {
  return axios({
    method : 'post',
    url : URL_AMBIENTE_API,
    headers : headers,
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
export const putAmbiente = (id, codigoDispositivo, nome, codigoSetor, nomeLocalizacao, andar, tamanho, numeroProximidade) => {
  return axios({
    method : 'put',
    url : URL_AMBIENTE_API + '/' + id,
    headers : headers,
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
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteAmbiente = (id) => {
  return axios({
    method : 'delete',
    url : URL_AMBIENTE_API + '/' + id,
  })
}