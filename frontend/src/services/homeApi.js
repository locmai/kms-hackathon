const URL = 'http://192.168.33.70:5000/api'
export const getAllQuestions = () => {
  console.log("greeting")
  return fetch(`${URL}/question/greeting`, {
    method: 'GET',
    // body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const sendMessage = (body) => {
  console.log("send message", body)
  return fetch(`${URL}/question`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body), 
  })
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
