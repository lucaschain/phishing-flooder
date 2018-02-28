const cpf = require('gerador-validador-cpf')
const faker = require('faker')
const axios = require('axios')

const emptyArray = (length) => [...new Array(length)]

const randomInteger = () => parseInt(Math.random() * 10)

const fillWithIntegers = (list) => list.map(randomInteger)

const randomIntegerString = (length) => {
  return fillWithIntegers(emptyArray(length)).join('')
}

const randomPhoneNumber = () => faker.helpers.replaceSymbolWithNumber('##+#-####-####')

const totallyLegitHeaders = () => {
  return {
    'User-Agent': faker.internet.userAgent(),
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

function * totallyLegitRunData () {
  yield {
    usuario: faker.internet.userName().toLowerCase(),
    senha: faker.internet.password(),
    step: 'passo1'
  }

  yield {
    cpf: cpf.generate(),
    senha1: randomIntegerString(6),
    telefone: randomPhoneNumber(),
    step: 'passo2'
  }
}

const postOptions = () => {
  return {
    baseURL: 'http://atualizar-cadastro.info',
    headers: totallyLegitHeaders()
  }
}

const logRequestStart = (postData) => {
  console.log('Starting request...')
  console.log(JSON.stringify(postData))
}

const logRequestEnd = (response) => {
  console.log(`Done: ${response.status}`)
}

const requestForData = async (data) => {
  logRequestStart(data)
  const response = await axios.post('/Seguranca/', data, postOptions())
  logRequestEnd(response)
}

const singleRun = async () => {
  for (const postData of totallyLegitRunData()) {
    await requestForData(postData)
  }
}

(async function infiniteFlood () {
  let tries = 0
  while (true) {
    console.log(`session number ${++tries}`)
    await singleRun()
  }
})()
