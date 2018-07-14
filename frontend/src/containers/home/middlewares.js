import {
  getAllQuestions,
} from '../actions'

// export function signIn(body, headers) {
//   return function (dispatch) {
//     dispatch(getAllQuestions(body, headers))
//     return fetch(Server.server() + 'api/users/signin', {
//       method: 'post',
//       body: JSON.stringify(body),
//       headers: headers,
//     })
//       .then(res => res.json())
//       .then((data) => {
//         console.log(data)
//         if (data.success === true) {
//           sessionStorage.setItem('token', data.token)
//           sessionStorage.setItem('email', data.email)
//           console.log('success signin')
//           dispatch(signInSuccessed(true, null))

//         }
//         else {
//           console.log('fail signin')
//           dispatch(signInFailed(false, data.msg))
//         }
//       })
//   }
// }
