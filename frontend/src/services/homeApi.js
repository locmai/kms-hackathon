// const fetch = require('node-fetch')
const PROTOCOL = 'http'
const HOST = '0.0.0.0'
const PORT = '8001'
//const URL = `${PROTOCOL}://${HOST}:${PORT}`
const URL = 'http://127.0.0.1:5000/api'
export const getAllQuestions = () => {
  return fetch(`${URL}/question`, {
    method: 'GET',
    // body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getQuestionById = async () => {
  let resp = {}
  try {
    const result = await fetch(`${URL}/question`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      }
    })
    resp = await result.json()
  } catch (err) {
    console.log(err)
  }
  return resp
}

// const sendInitialMessgae = async () => {
//   let resp = {}
//   try {
//     const result = await fetch(`${URL}/inital`, {
//       method: 'GET', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     resp = await result.json()
//   } catch (err) {
//     console.log(err)
//   }
//   return resp
// }

// const sendUserMessage = async msg => {
//   let resp = {}
//   try {
//     const result = await fetch(`${URL}/question`, {
//       method: 'POST', // or 'PUT'
//       body: JSON.stringify({
//         mesasge: msg
//       }), // data can be `string` or {object}!
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     resp = await result.json()
//   } catch (err) {
//     console.log(err)
//   }
//   return resp
// }
